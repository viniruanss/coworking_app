import { Request, Response, NextFunction } from "express";
import * as salasService from "../services/salas.service.js";
import { criarSalaSchema, atualizarSalaSchema } from "../schemas/salas.schema.js";

export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    const salas = await salasService.listarSalas();
    res.status(200).json(salas);
  } catch (error) {
    next(error);
  }
}

export async function show(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const sala = await salasService.buscarSalaPorId(id);
    if (!sala) {
      return res.status(404).json({ erro: "Sala não encontrada" });
    }
    res.status(200).json(sala);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const dadosValidados = criarSalaSchema.parse(req.body);
    const novaSala = await salasService.criarSala({
      ...dadosValidados,
      descricao: dadosValidados.descricao ?? null,
    });
    res.status(201).json(novaSala);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const dadosValidados = atualizarSalaSchema.parse(req.body);
    const salaAtualizada = await salasService.atualizarSala(id, {
      ...dadosValidados,
      descricao: dadosValidados.descricao ?? undefined,
    });
    res.status(200).json(salaAtualizada);
  } catch (error) {
    next(error);
  }
}

export async function destroy(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    await salasService.removerSala(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}