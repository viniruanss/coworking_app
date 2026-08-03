import { useEffect, useState, type FormEvent } from "react";
import {
  listarSalas,
  criarSala,
  atualizarSala,
  removerSala,
  type Sala,
  type SalaInput,
} from "../services/salaService";

const SALA_VAZIA: SalaInput = {
  nome: "",
  tipo: "sala",
  capacidade: 1,
  descricao: "",
  preco_locacao: 0,
};

export default function Admin() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [formulario, setFormulario] = useState<SalaInput>(SALA_VAZIA);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  async function carregarSalas() {
    setCarregando(true);
    try {
      const dados = await listarSalas();
      setSalas(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar as salas");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarSalas();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");

    try {
      if (editandoId !== null) {
        await atualizarSala(editandoId, formulario);
      } else {
        await criarSala(formulario);
      }
      setFormulario(SALA_VAZIA);
      setEditandoId(null);
      await carregarSalas();
    } catch (error) {
      console.error(error);
      setErro("Não foi possível salvar a sala. Verifique os dados.");
    }
  }

  function handleEditar(sala: Sala) {
    setFormulario({
      nome: sala.nome,
      tipo: sala.tipo,
      capacidade: sala.capacidade,
      descricao: sala.descricao ?? "",
      preco_locacao: Number(sala.preco_locacao),
    });
    setEditandoId(sala.id);
  }

  async function handleRemover(id: number) {
    if (!confirm("Tem certeza que deseja remover esta sala?")) return;
    try {
      await removerSala(id);
      await carregarSalas();
    } catch (error) {
      console.error(error);
      setErro("Não foi possível remover a sala");
    }
  }

  function cancelarEdicao() {
    setFormulario(SALA_VAZIA);
    setEditandoId(null);
  }

  const campoClasse =
    "w-full rounded-xl border border-carvao/15 bg-papel px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20";
  const labelClasse = "mb-1.5 block text-sm font-medium text-carvao";

  return (
    <div className="min-h-screen bg-papel px-6 py-8">
      <h1 className="mb-8 font-display text-3xl font-semibold text-carvao">
        Gerenciar salas
      </h1>

      {erro && (
        <div className="mb-4 rounded-xl border border-terracota/20 bg-terracota/10 p-3 text-sm text-terracota">
          {erro}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-10 grid grid-cols-1 gap-4 rounded-2xl border border-carvao/10 bg-superficie p-6 sm:grid-cols-2"
      >
        <div>
          <label className={labelClasse}>Nome</label>
          <input
            type="text"
            value={formulario.nome}
            onChange={(e) => setFormulario({ ...formulario, nome: e.target.value })}
            required
            className={campoClasse}
          />
        </div>

        <div>
          <label className={labelClasse}>Tipo</label>
          <select
            value={formulario.tipo}
            onChange={(e) => setFormulario({ ...formulario, tipo: e.target.value })}
            className={campoClasse}
          >
            <option value="sala">Sala</option>
            <option value="cabine">Cabine</option>
          </select>
        </div>

        <div>
          <label className={labelClasse}>Capacidade</label>
          <input
            type="number"
            min={1}
            value={formulario.capacidade}
            onChange={(e) =>
              setFormulario({ ...formulario, capacidade: Number(e.target.value) })
            }
            required
            className={campoClasse}
          />
        </div>

        <div>
          <label className={labelClasse}>Preço por turno (R$)</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={formulario.preco_locacao}
            onChange={(e) =>
              setFormulario({ ...formulario, preco_locacao: Number(e.target.value) })
            }
            required
            className={campoClasse}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClasse}>Descrição</label>
          <input
            type="text"
            value={formulario.descricao}
            onChange={(e) => setFormulario({ ...formulario, descricao: e.target.value })}
            className={campoClasse}
          />
        </div>

        <div className="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-mostarda px-6 py-2.5 font-medium text-carvao transition hover:bg-mostarda/90"
          >
            {editandoId !== null ? "Salvar alterações" : "Criar sala"}
          </button>
          {editandoId !== null && (
            <button
              type="button"
              onClick={cancelarEdicao}
              className="rounded-full border border-carvao/15 px-6 py-2.5 font-medium text-carvao transition hover:bg-carvao/5"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {carregando ? (
        <p className="text-cinza-verde">Carregando salas...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {salas.map((sala) => (
            <div
              key={sala.id}
              className="flex items-center justify-between rounded-2xl border border-carvao/10 bg-superficie p-5"
            >
              <div>
                <p className="font-display text-lg font-semibold text-carvao">
                  {sala.nome}
                </p>
                <p className="text-sm text-cinza-verde">
                  {sala.tipo === "cabine" ? "Cabine" : "Sala"} · {sala.capacidade} pessoa(s) ·{" "}
                  <span className="font-mono">
                    R$ {Number(sala.preco_locacao).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditar(sala)}
                  className="rounded-full border border-mostarda/30 px-4 py-1.5 text-sm font-medium text-mostarda hover:bg-mostarda/10"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleRemover(sala.id)}
                  className="rounded-full border border-terracota/20 px-4 py-1.5 text-sm font-medium text-terracota hover:bg-terracota/10"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}