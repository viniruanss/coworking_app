import api from "./api";

export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    e_admin: boolean;
  };
}

export async function login(email: string, senha: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", { email, senha });
  return response.data;
}