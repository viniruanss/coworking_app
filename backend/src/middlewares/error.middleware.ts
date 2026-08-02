import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export function tratadorDeErros(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  if (error instanceof z.ZodError) {
    return res.status(400).json({ erro: "Dados inválidos", detalhes: error.issues });
  }

  if (error instanceof Error && error.message === "Sala já reservada nesse dia e turno") {
    return res.status(409).json({ erro: error.message });
  }

  return res.status(500).json({ erro: "Erro interno do servidor" });
}