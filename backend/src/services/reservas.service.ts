import { PrismaClient, Reserva } from "@prisma/client";
import { enviarEmailConfirmacao } from "./email.service.js"; // ← NOVO IMPORT

const prisma = new PrismaClient();

export async function listarReservas(): Promise<Reserva[]> {
  return prisma.reserva.findMany();
}

export async function listarReservasDoUsuario(id_usuario: number): Promise<Reserva[]> {
  return prisma.reserva.findMany({ where: { id_usuario } });
}

export async function buscarReservaPorId(id: number): Promise<Reserva | null> {
  return prisma.reserva.findUnique({ where: { id } });
}

export async function criarReservaPendente(dados: {
  id_usuario: number;
  id_sala: number;
  dia: Date;
  turno: string;
}): Promise<Reserva> {
  const conflito = await prisma.reserva.findFirst({
    where: {
      id_sala: dados.id_sala,
      dia: dados.dia,
      turno: dados.turno,
      OR: [
        { status: "confirmada" },
        {
          status: "pendente",
          expira_em: { gt: new Date() },
        },
      ],
    },
  });

  if (conflito) {
    throw new Error("Sala já reservada nesse dia e turno");
  }

  const expira_em = new Date(Date.now() + 10 * 60 * 1000);

  return prisma.reserva.create({
    data: {
      id_usuario: dados.id_usuario,
      id_sala: dados.id_sala,
      dia: dados.dia,
      turno: dados.turno,
      status: "pendente",
      expira_em,
    },
  });
}

// ↓ SÓ ESSA FUNÇÃO MUDA DE VERDADE ↓
export async function atualizarStatusReserva(
  id: number,
  novoStatus: "confirmada" | "cancelada"
): Promise<Reserva> {
  const reserva = await prisma.reserva.update({
    where: { id },
    data: {
      status: novoStatus,
      expira_em: novoStatus === "confirmada" ? null : undefined,
    },
    include: { usuario: true, sala: true },
  });

  if (novoStatus === "confirmada") {
    try {
      await enviarEmailConfirmacao({
        emailDestino: reserva.usuario.email,
        nomeUsuario: reserva.usuario.nome,
        nomeSala: reserva.sala.nome,
        dia: reserva.dia.toISOString(),
        turno: reserva.turno,
      });
    } catch (error) {
      console.error("Falha ao enviar e-mail de confirmação:", error);
    }
  }

  return reserva;
}