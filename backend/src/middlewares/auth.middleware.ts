import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface PayloadToken {
  id: number;
  e_admin: boolean;
}

// Estende o tipo Request do Express pra aceitar req.usuario
declare global {
  namespace Express {
    interface Request {
      usuario?: PayloadToken;
    }
  }
}

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" "); // separa "Bearer" do token em si

  if (!token) {
    return res.status(401).json({ erro: "Token mal formatado" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as PayloadToken;
    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}