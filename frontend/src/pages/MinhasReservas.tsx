import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarMinhasReservas, atualizarStatusReserva, type Reserva } from "../services/reservaService";
import { listarSalas, type Sala } from "../services/salaService";
import { labelDoTurno } from "../utils/turnos";

const STATUS_LABEL: Record<Reserva["status"], string> = {
  pendente: "Pendente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
};

const STATUS_ESTILO: Record<Reserva["status"], string> = {
  pendente: "bg-mostarda/15 text-mostarda",
  confirmada: "bg-salvia/15 text-salvia",
  cancelada: "bg-carvao/10 text-cinza-verde",
};

export default function MinhasReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarDados() {
    setCarregando(true);
    try {
      const [reservasData, salasData] = await Promise.all([
        listarMinhasReservas(),
        listarSalas(),
      ]);
      setReservas(reservasData);
      setSalas(salasData);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar suas reservas");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarDados();
  }, []);

  function salaDaReserva(id_sala: number): Sala | undefined {
    return salas.find((s) => s.id === id_sala);
  }

  async function handleCancelar(id: number) {
    try {
      await atualizarStatusReserva(id, "cancelada");
      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "cancelada" } : r))
      );
    } catch (error) {
      console.error(error);
      setErro("Não foi possível cancelar a reserva");
    }
  }

  return (
    <div className="min-h-screen bg-papel px-6 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-carvao">
          Minhas reservas
        </h1>
        <Link
          to="/"
          className="rounded-full bg-mostarda px-4 py-2 text-sm font-medium text-carvao hover:bg-mostarda/90"
        >
          Fazer reserva
        </Link>
      </div>

      {erro && (
        <div className="mb-4 rounded-xl border border-terracota/20 bg-terracota/10 p-3 text-sm text-terracota">
          {erro}
        </div>
      )}

      {carregando ? (
        <p className="text-cinza-verde">Carregando reservas...</p>
      ) : reservas.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-carvao/15 p-10 text-center">
          <p className="text-cinza-verde">Você ainda não fez nenhuma reserva.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reservas.map((reserva) => {
            const sala = salaDaReserva(reserva.id_sala);
            return (
              <div
                key={reserva.id}
                className="flex items-center justify-between rounded-2xl border border-carvao/10 bg-superficie p-5"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-carvao">
                    {sala ? sala.nome : `Sala #${reserva.id_sala}`}
                  </p>
                  <p className="text-sm text-cinza-verde">
                    {reserva.dia.slice(0, 10)} · {labelDoTurno(reserva.turno)}
                  </p>
                  {sala && (
                    <p className="mt-1 font-mono text-sm text-cinza-verde">
                      Até {sala.capacidade} pessoa(s) · R${" "}
                      {Number(sala.preco_locacao).toFixed(2)}
                    </p>
                  )}
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${STATUS_ESTILO[reserva.status]}`}
                  >
                    {STATUS_LABEL[reserva.status]}
                  </span>
                </div>

                {reserva.status !== "cancelada" && (
                  <button
                    onClick={() => handleCancelar(reserva.id)}
                    className="rounded-full border border-terracota/20 px-4 py-1.5 text-sm font-medium text-terracota hover:bg-terracota/10"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}