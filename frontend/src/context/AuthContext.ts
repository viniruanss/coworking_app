import { createContext } from "react";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  e_admin: boolean;
}

export interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  logar: (token: string, usuario: Usuario) => void;
  deslogar: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);