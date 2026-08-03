import api from "./api";

export interface CadastroInput {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  cpf: string;
}

export async function cadastrar(dados: CadastroInput): Promise<void> {
  await api.post("/usuarios", dados);
}