import { Request, Response, NextFunction } from "express";
import * as usuariosService from "../services/usuarios.service.js";
import { criarUsuarioSchema } from "../schemas/usuarios.schema.js";
export async function index(req, res, next) {
    try {
        const usuarios = await usuariosService.listarUsuarios();
        res.status(200).json(usuarios);
    }
    catch (error) {
        next(error);
    }
}
export async function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuariosService.buscarUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.status(200).json(usuario);
    }
    catch (error) {
        next(error);
    }
}
export async function store(req, res, next) {
    try {
        const dadosValidados = criarUsuarioSchema.parse(req.body);
        const novoUsuario = await usuariosService.criarUsuario(dadosValidados);
        res.status(201).json(novoUsuario);
    }
    catch (error) {
        next(error);
    }
}
export async function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        await usuariosService.removerUsuario(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=usuarios.controller.js.map