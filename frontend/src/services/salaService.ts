import api from "./api";

export interface Sala {
  id: number;
  nome: string;
  tipo: string;
  capacidade: number;
  descricao: string | null;
  preco_locacao: string;
}

export interface SalaInput {
  nome: string;
  tipo: string;
  capacidade: number;
  descricao?: string;
  preco_locacao: number;
}

export async function listarSalas(): Promise<Sala[]> {
  const response = await api.get<Sala[]>("/salas");
  return response.data;
}

export async function criarSala(dados: SalaInput): Promise<Sala> {
  const response = await api.post<Sala>("/salas", dados);
  return response.data;
}

export async function atualizarSala(id: number, dados: Partial<SalaInput>): Promise<Sala> {
  const response = await api.put<Sala>(`/salas/${id}`, dados);
  return response.data;
}

export async function removerSala(id: number): Promise<void> {
  await api.delete(`/salas/${id}`);
}