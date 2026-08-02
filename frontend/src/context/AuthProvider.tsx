import { useState, type ReactNode } from "react";
import { AuthContext, type Usuario } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  function logar(novoToken: string, novoUsuario: Usuario) {
    localStorage.setItem("token", novoToken);
    localStorage.setItem("usuario", JSON.stringify(novoUsuario));
    setToken(novoToken);
    setUsuario(novoUsuario);
  }

  function deslogar() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, token, logar, deslogar }}>
      {children}
    </AuthContext.Provider>
  );
}