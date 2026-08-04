export const TURNOS = [
  { valor: "manha", label: "Manhã", fimHora: 12 },
  { valor: "tarde", label: "Tarde", fimHora: 18 },
  { valor: "noite", label: "Noite", fimHora: 23 },
];

export function labelDoTurno(valor: string): string {
  return TURNOS.find((t) => t.valor === valor)?.label ?? valor;
}

export function hojeISO(): string {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export function turnoJaPassou(diaSelecionado: string, turnoValor: string): boolean {
  const hoje = hojeISO();
  if (diaSelecionado < hoje) return true;
  if (diaSelecionado > hoje) return false;

  const turno = TURNOS.find((t) => t.valor === turnoValor);
  if (!turno) return false;
  return new Date().getHours() >= turno.fimHora;
}