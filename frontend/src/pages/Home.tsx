import { useEffect, useState } from "react";
import { listarSalas, type Sala } from "../services/salaService";
import { Link } from "react-router-dom";

export default function Home() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarSalas() {
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

    carregarSalas();
  }, []);

  if (carregando) {
    return <p className="p-6 text-center text-gray-600">Carregando salas...</p>;
  }

  if (erro) {
    return <p className="p-6 text-center text-red-600">{erro}</p>;
  }

 return (
  <div className="min-h-screen bg-papel px-6 py-8">
    <h1 className="mb-8 font-display text-3xl font-semibold text-carvao">
      Salas disponíveis
    </h1>

    {salas.length === 0 ? (
      <p className="text-cinza-verde">Nenhuma sala cadastrada ainda.</p>
    ) : (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {salas.map((sala) => (
          <div
            key={sala.id}
            className="rounded-3xl border border-carvao/10 bg-superficie p-6 shadow-sm transition hover:shadow-md"          >
            <h2 className="font-display text-xl font-semibold text-carvao">
              {sala.nome}
            </h2>
            <p className="mt-1 text-sm text-cinza-verde">
              Capacidade: até {sala.capacidade} pessoas
            </p>
            {sala.descricao && (
              <p className="mt-2 text-sm text-carvao/70">{sala.descricao}</p>
            )}
            <p className="mt-4 font-mono text-lg font-medium text-carvao">
              R$ {Number(sala.preco_locacao).toFixed(2)}
              <span className="text-sm font-normal text-cinza-verde">/turno</span>
            </p>
            <Link
              to={`/reservar/${sala.id}`}
              className="mt-4 block rounded-full bg-mostarda py-2.5 text-center text-sm font-medium text-carvao hover:bg-mostarda/90"
            >
              Reservar
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
)};