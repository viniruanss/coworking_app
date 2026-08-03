import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function RotaProtegida({
  children,
  apenasAdmin = false,
}: {
  children: ReactNode;
  apenasAdmin?: boolean;
}) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (apenasAdmin && !usuario.e_admin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}