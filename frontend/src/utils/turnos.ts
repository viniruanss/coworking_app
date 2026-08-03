export const TURNOS = [
  { valor: "manha", label: "Manhã" },
  { valor: "tarde", label: "Tarde" },
  { valor: "noite", label: "Noite" },
];

export function labelDoTurno(valor: string): string {
  return TURNOS.find((t) => t.valor === valor)?.label ?? valor;
}