import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { logar } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resultado = await login(email, senha);
      logar(resultado.token, resultado.usuario);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErro("E-mail ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Painel lateral de identidade */}
      <div className="hidden w-1/2 flex-col justify-between bg-carvao p-12 lg:flex">
        <span className="font-display text-2xl font-semibold text-papel">Hubin</span>
        <div>
          <p className="font-display text-4xl font-semibold leading-tight text-papel">
            Seu espaço,
            <br />
            no seu turno.
          </p>
          <p className="mt-4 max-w-sm text-cinza-verde">
            Reserve salas e cabines do coworking em segundos, com confirmação
            garantida e sem conflito de horário.
          </p>
        </div>
        <span className="text-sm text-cinza-verde">Hub + In</span>
      </div>

      {/* Formulário */}
      <div className="flex w-full flex-col items-center justify-center bg-papel px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="mb-1 font-display text-3xl font-semibold text-carvao">
            Bem-vindo de volta
          </h1>
          <p className="mb-8 text-sm text-cinza-verde">
            Entre para ver as salas disponíveis
          </p>

          {erro && (
            <div className="mb-4 rounded-xl border border-terracota/20 bg-terracota/10 p-3 text-sm text-terracota">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-carvao">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-carvao/15 bg-white px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
              />
            </div>

            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium text-carvao">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full rounded-xl border border-carvao/15 bg-white px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
              />
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-full bg-mostarda py-3 font-medium text-carvao transition hover:bg-mostarda/90 disabled:opacity-50"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cinza-verde">
            Não tem conta?{" "}
            <Link to="/cadastro" className="font-medium text-carvao hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}