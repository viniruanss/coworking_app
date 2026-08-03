import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cadastrar } from "../services/usuarioService";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await cadastrar({ nome, email, senha, telefone: telefone || undefined, cpf });
      setSucesso(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível criar a conta. Verifique os dados e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-carvao p-12 lg:flex">
        <span className="font-display text-2xl font-semibold text-papel">Hubin</span>
        <div>
          <p className="font-display text-4xl font-semibold leading-tight text-papel">
            Faça parte
            <br />
            do espaço.
          </p>
          <p className="mt-4 max-w-sm text-cinza-verde">
            Crie sua conta e comece a reservar salas e cabines em poucos cliques.
          </p>
        </div>
        <span className="text-sm text-cinza-verde">Hub + In</span>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-papel px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="mb-1 font-display text-3xl font-semibold text-carvao">
            Criar conta
          </h1>
          <p className="mb-8 text-sm text-cinza-verde">Leva menos de um minuto</p>

          {erro && (
            <div className="mb-4 rounded-xl border border-terracota/20 bg-terracota/10 p-3 text-sm text-terracota">
              {erro}
            </div>
          )}

          {sucesso && (
            <div className="mb-4 rounded-xl border border-salvia/20 bg-salvia/10 p-3 text-sm text-salvia">
              Conta criada com sucesso! Redirecionando para o login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-carvao">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full rounded-xl border border-carvao/15 bg-white px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-carvao">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-carvao/15 bg-white px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-carvao">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl border border-carvao/15 bg-white px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-carvao">CPF</label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                  maxLength={11}
                  placeholder="Só números"
                  className="w-full rounded-xl border border-carvao/15 bg-white px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-carvao">
                  Telefone
                </label>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Opcional"
                  className="w-full rounded-xl border border-carvao/15 bg-white px-4 py-2.5 text-carvao outline-none transition focus:border-mostarda focus:ring-2 focus:ring-mostarda/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-full bg-mostarda py-3 font-medium text-carvao transition hover:bg-mostarda/90 disabled:opacity-50"
            >
              {carregando ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cinza-verde">
            Já tem conta?{" "}
            <Link to="/login" className="font-medium text-carvao hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}