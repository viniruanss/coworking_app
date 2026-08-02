import { PrismaClient, Sala, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
export async function listarSalas() {
    return prisma.sala.findMany();
}
export async function buscarSalaPorId(id) {
    return prisma.sala.findUnique({ where: { id } });
}
export async function criarSala(dados) {
    return prisma.sala.create({ data: dados });
}
export async function atualizarSala(id, dados) {
    return prisma.sala.update({ where: { id }, data: dados });
}
export async function removerSala(id) {
    await prisma.sala.delete({ where: { id } });
}
//# sourceMappingURL=salas.service.js.map