export const TURNOS = [
  { valor: "manha", label: "Manhã", fimHora: 12 },
  { valor: "tarde", label: "Tarde", fimHora: 18 },
  { valor: "noite", label: "Noite", fimHora: 23 },
];

export function labelDoTurno(valor: string): string {
  return TURNOS.find((t) => t.valor === valor)?.label ?? valor;
}

export function hojeISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function turnoJaPassou(diaSelecionado: string, turnoValor: string): boolean {
  const hoje = hojeISO();
  if (diaSelecionado < hoje) return true; // dia no passado
  if (diaSelecionado > hoje) return false; // dia futuro, turno não importa

  // é hoje: compara a hora atual com o fim do turno
  const turno = TURNOS.find((t) => t.valor === turnoValor);
  if (!turno) return false;
  return new Date().getHours() >= turno.fimHora;
}