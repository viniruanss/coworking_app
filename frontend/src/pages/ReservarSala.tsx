import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  criarReserva,
  atualizarStatusReserva,
  type Reserva,
} from "../services/reservaService";
import { useAuth } from "../context/useAuth";
import { useContagemRegressiva } from "../hooks/useContagemRegressiva";
import AnelProgresso from "../components/AnelProgresso";
import { TURNOS, labelDoTurno, hojeISO, turnoJaPassou } from "../utils/turnos";


const DEZ_MINUTOS_EM_SEGUNDOS = 600;

export default function ReservarSala() {
  const { salaId } = useParams<{ salaId: string }>();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [dia, setDia] = useState("");
  const [turno, setTurno] = useState("");
  const [reservaPendente, setReservaPendente] = useState<Reserva | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { minutos, segundos, expirado, segundosRestantes } = useContagemRegressiva(
    reservaPendente?.expira_em ?? null
  );

  if (!usuario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-papel">
        <p className="text-cinza-verde">Você precisa estar logado para reservar uma sala.</p>
      </div>
    );
  }

async function handleCriarReserva(event: FormEvent) {
  event.preventDefault();
  setErro("");

  if (turnoJaPassou(dia, turno)) {
    setErro("Esse dia ou turno já passou. Escolha outro horário.");
    return;
  }

  setCarregando(true);

    try {
      const reserva = await criarReserva({
        id_usuario: usuario!.id,
        id_sala: Number(salaId),
        dia,
        turno,
      });
      setReservaPendente(reserva);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErro("Essa sala já está reservada nesse dia e turno. Escolha outro horário.");
      } else {
        setErro("Não foi possível criar a reserva. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  async function handleConfirmar() {
    if (!reservaPendente) return;
    setCarregando(true);
    try {
      await atualizarStatusReserva(reservaPendente.id, "confirmada");
      navigate("/minhas-reservas");
    } catch (error) {
      console.error(error);
      setErro("Não foi possível confirmar a reserva.");
    } finally {
      setCarregando(false);
    }
  }
  async function handleCancelar() {
    if (!reservaPendente) return;
    setCarregando(true);
    try {
      await atualizarStatusReserva(reservaPendente.id, "cancelada");
      setReservaPendente(null);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  const percentual = (segundosRestantes / DEZ_MINUTOS_EM_SEGUNDOS) * 100;
  const labelTempo = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-papel px-6 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-carvao/10 bg-superficie p-8 shadow-sm">
        {!reservaPendente ? (
          <>
            <h1 className="mb-1 font-display text-3xl font-semibold text-carvao">
              Reservar sala
            </h1>
            <p className="mb-6 text-sm text-cinza-verde">
              Escolha o dia e o turno desejado
            </p>

            {erro && (
              <div className="mb-4 rounded-xl border border-terracota/20 bg-terracota/10 p-3 text-sm text-terracota">
                {erro}
              </div>
            )}

            <form onSubmit={handleCriarReserva} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-carvao">Dia</label>
                <input
                  type="date"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  min={hojeISO()}
                  required
                  className="w-full rounded-xl border border-carvao/15 bg-papel px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-carvao">Turno</label>
                <select
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                  required
                  className="w-full rounded-xl border border-carvao/15 bg-papel px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
                >
                  <option value="">Selecione um turno</option>
                  {TURNOS.map((t) => (
                    <option key={t.valor} value={t.valor}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-full bg-mostarda py-3 font-medium text-carvao transition hover:bg-mostarda/90 disabled:opacity-50"
              >
                {carregando ? "Verificando..." : "Continuar"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-1 font-display text-2xl font-semibold text-carvao">
              {expirado ? "Reserva expirada" : "Confirme sua reserva"}
            </h1>
            <p className="mb-6 text-sm text-cinza-verde">
              {expirado
                ? "O tempo para confirmar esgotou e a sala foi liberada."
                : "Você tem 10 minutos para confirmar antes que a sala seja liberada."}
            </p>

            <AnelProgresso
              percentual={expirado ? 0 : percentual}
              label={expirado ? "00:00" : labelTempo}
            />

            {erro && (
              <div className="mt-6 w-full rounded-xl border border-terracota/20 bg-terracota/10 p-3 text-sm text-terracota">
                {erro}
              </div>
            )}

            <div className="mt-6 w-full space-y-1 text-left text-sm text-cinza-verde">
              <p>
                <span className="text-carvao">Dia:</span> {reservaPendente.dia.slice(0, 10)}
              </p>
              <p>
                <span className="text-carvao">Turno:</span> {labelDoTurno(reservaPendente.turno)}
              </p>
            </div>

            {!expirado ? (
              <div className="mt-6 flex w-full gap-3">
                <button
                  onClick={handleConfirmar}
                  disabled={carregando}
                  className="flex-1 rounded-full bg-salvia py-2.5 font-medium text-papel transition hover:opacity-90 disabled:opacity-50"
                >
                  Confirmar
                </button>
                <button
                  onClick={handleCancelar}
                  disabled={carregando}
                  className="flex-1 rounded-full border border-carvao/15 py-2.5 font-medium text-carvao transition hover:bg-carvao/5 disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setReservaPendente(null)}
                className="mt-6 w-full rounded-full bg-mostarda py-2.5 font-medium text-carvao transition hover:bg-mostarda/90"
              >
                Tentar novamente
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}