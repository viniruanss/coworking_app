import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useTema } from "../hooks/useTema";

export default function NavBar() {
  const { usuario, deslogar } = useAuth();
  const navigate = useNavigate();
  const { escuro, alternar } = useTema();

  function handleLogout() {
    deslogar();
    navigate("/login");
  }

  return (
    <nav className="flex flex-col gap-2 border-b border-carvao/10 bg-papel px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <Link to="/" className="font-display text-2xl font-semibold text-carvao">
          Hubin
        </Link>
        {usuario && (
          <span className="text-sm text-cinza-verde">Olá, {usuario.nome}!</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {usuario ? (
          <>
            {usuario.e_admin && (
              <Link
                to="/admin"
                className="rounded-full border border-carvao/15 px-4 py-1.5 text-sm font-medium text-carvao hover:bg-carvao/5"
              >
                Admin
              </Link>
            )}
            <Link
              to="/minhas-reservas"
              className="rounded-full border border-carvao/15 px-4 py-1.5 text-sm font-medium text-carvao hover:bg-carvao/5"
            >
              Minhas reservas
            </Link>
            <button
              onClick={alternar}
              aria-label="Alternar tema"
              className="rounded-full border border-carvao/15 p-2 text-carvao hover:bg-carvao/5"
            >
              {escuro ? "☀️" : "🌙"}
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full bg-carvao px-4 py-1.5 text-sm font-medium text-papel hover:bg-carvao/90"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <button
              onClick={alternar}
              aria-label="Alternar tema"
              className="rounded-full border border-carvao/15 p-2 text-carvao hover:bg-carvao/5"
            >
              {escuro ? "☀️" : "🌙"}
            </button>
            <Link
              to="/login"
              className="rounded-full bg-mostarda px-4 py-1.5 text-sm font-medium text-carvao hover:bg-mostarda/90"
            >
              Entrar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}