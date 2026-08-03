import { useEffect, useState } from "react";

export function useTema() {
  const [escuro, setEscuro] = useState<boolean>(() => {
    const salvo = localStorage.getItem("tema");
    if (salvo) return salvo === "escuro";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", escuro);
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
  }, [escuro]);

  return { escuro, alternar: () => setEscuro((prev) => !prev) };
}