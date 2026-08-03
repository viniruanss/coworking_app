import api from "./api";

export interface Reserva {
  id: number;
  id_usuario: number;
  id_sala: number;
  dia: string;
  turno: string;
  status: "pendente" | "confirmada" | "cancelada";
  expira_em: string | null;
}

export interface CriarReservaInput {
  id_usuario: number;
  id_sala: number;
  dia: string;
  turno: string;
}

export async function criarReserva(dados: CriarReservaInput): Promise<Reserva> {
  const response = await api.post<Reserva>("/reservas", dados);
  return response.data;
}

export async function atualizarStatusReserva(
  id: number,
  status: "confirmada" | "cancelada"
): Promise<Reserva> {
  const response = await api.patch<Reserva>(`/reservas/${id}`, { status });
  return response.data;
}

export async function listarMinhasReservas(): Promise<Reserva[]> {
  const response = await api.get<Reserva[]>("/reservas/minhas");
  return response.data;
}