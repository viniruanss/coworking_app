import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service.js";
export async function login(req, res, next) {
    try {
        const { email, senha } = req.body;
        const resultado = await authService.autenticar(email, senha);
        res.status(200).json(resultado);
    }
    catch (error) {
        // Login mantém tratamento próprio: sempre 401, independente do motivo interno
        // (não repassamos pro middleware global pra não vazar detalhe de qual erro ocorreu)
        res.status(401).json({ erro: "Credenciais inválidas" });
    }
}
//# sourceMappingURL=auth.controller.js.map