import { PrismaClient, Usuario } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
export async function listarUsuarios() {
    return prisma.usuario.findMany({
        omit: { senha_hash: true },
    });
}
export async function buscarUsuarioPorId(id) {
    return prisma.usuario.findUnique({
        where: { id },
        omit: { senha_hash: true },
    });
}
export async function criarUsuario(dados) {
    const senha_hash = await bcrypt.hash(dados.senha, 10);
    return prisma.usuario.create({
        data: {
            nome: dados.nome,
            email: dados.email,
            senha_hash,
            telefone: dados.telefone,
            cpf: dados.cpf,
        },
        omit: { senha_hash: true },
    });
}
export async function removerUsuario(id) {
    await prisma.usuario.delete({ where: { id } });
}
//# sourceMappingURL=usuarios.service.js.map