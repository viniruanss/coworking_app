import { PrismaClient, Usuario } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Tipo auxiliar: Usuario sem o campo senha_hash, pra nunca vazar isso nas respostas
type UsuarioSemSenha = Omit<Usuario, "senha_hash">;

export async function listarUsuarios(): Promise<UsuarioSemSenha[]> {
  return prisma.usuario.findMany({
    omit: { senha_hash: true },
  });
}

export async function buscarUsuarioPorId(id: number): Promise<UsuarioSemSenha | null> {
  return prisma.usuario.findUnique({
    where: { id },
    omit: { senha_hash: true },
  });
}

export async function criarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  cpf: string;
}): Promise<UsuarioSemSenha> {
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

export async function removerUsuario(id: number): Promise<void> {
  await prisma.usuario.delete({ where: { id } });
}