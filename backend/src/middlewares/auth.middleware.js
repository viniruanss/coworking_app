import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export function autenticarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }
    const [, token] = authHeader.split(" "); // separa "Bearer" do token em si
    if (!token) {
        return res.status(401).json({ erro: "Token mal formatado" });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.usuario = payload;
        next();
    }
    catch (error) {
        return res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}
//# sourceMappingURL=auth.middleware.js.map