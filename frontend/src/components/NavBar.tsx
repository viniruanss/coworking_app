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
    <nav className="flex items-center justify-between border-b border-carvao/10 bg-papel px-6 py-4">
      <Link to="/" className="font-display text-2xl font-semibold text-carvao">
        Hubin
      </Link>

      <div className="flex items-center gap-4">
        {usuario ? (
          <>
            <span className="font-body text-sm text-cinza-verde">
              Olá, {usuario.nome}!
            </span>
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

            {/* Botão de tema, aqui entre os links e o botão de Sair */}
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
            {/* Também disponível para quem não está logado */}
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