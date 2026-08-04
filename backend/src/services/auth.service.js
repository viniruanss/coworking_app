import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
export async function autenticar(email, senha) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
        throw new Error("Credenciais inválidas");
    }
    const senhaConfere = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaConfere) {
        throw new Error("Credenciais inválidas");
    }
    const token = jwt.sign({ id: usuario.id, e_admin: usuario.e_admin }, JWT_SECRET, { expiresIn: "8h" });
    return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, e_admin: usuario.e_admin } };
}
//# sourceMappingURL=auth.service.js.map