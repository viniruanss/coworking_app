export default function AnelProgresso({
  percentual,
  label,
}: {
  percentual: number; // 0 a 100
  label: string;
}) {
  const raio = 70;
  const circunferencia = 2 * Math.PI * raio;
  const offset = circunferencia - (percentual / 100) * circunferencia;

  const cor = percentual > 30 ? "var(--color-mostarda)" : "var(--color-terracota)";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle
          cx="90"
          cy="90"
          r={raio}
          fill="none"
          stroke="var(--color-carvao)"
          strokeOpacity="0.08"
          strokeWidth="10"
        />
        <circle
          cx="90"
          cy="90"
          r={raio}
          fill="none"
          stroke={cor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s ease" }}
        />
      </svg>
      <span className="absolute font-mono text-2xl font-medium text-carvao">
        {label}
      </span>
    </div>
  );
}