import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Entrar</h1>

        {erro && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
            {erro}
          </div>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}