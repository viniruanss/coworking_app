import { useEffect, useState } from "react";

export function useContagemRegressiva(expiraEm: string | null) {
  const [segundosRestantes, setSegundosRestantes] = useState<number>(0);

  useEffect(() => {
    if (!expiraEm) return;

    function calcular() {
      const restante = Math.max(
        0,
        Math.floor((new Date(expiraEm as string).getTime() - Date.now()) / 1000)
      );
      setSegundosRestantes(restante);
    }

    calcular();
    const intervalo = setInterval(calcular, 1000);
    return () => clearInterval(intervalo);
  }, [expiraEm]);

  const minutos = Math.floor(segundosRestantes / 60);
  const segundos = segundosRestantes % 60;
  const expirado = segundosRestantes <= 0;

  return { segundosRestantes, minutos, segundos, expirado };
}