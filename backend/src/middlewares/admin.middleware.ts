import { Request, Response, NextFunction } from "express";

export function verificarAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.usuario) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  if (!req.usuario.e_admin) {
    return res.status(403).json({ erro: "Acesso restrito a administradores" });
  }

  next();
}