import { PrismaClient, Sala, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarSalas(): Promise<Sala[]> {
  return prisma.sala.findMany();
}

export async function buscarSalaPorId(id: number): Promise<Sala | null> {
  return prisma.sala.findUnique({ where: { id } });
}

export async function criarSala(dados: Prisma.SalaCreateInput): Promise<Sala> {
  return prisma.sala.create({ data: dados });
}

export async function atualizarSala(id: number, dados: Prisma.SalaUpdateInput): Promise<Sala> {
  return prisma.sala.update({ where: { id }, data: dados });
}

export async function removerSala(id: number): Promise<void> {
  await prisma.sala.delete({ where: { id } });
}