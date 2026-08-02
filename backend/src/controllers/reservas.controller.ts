import { Request, Response, NextFunction } from "express";
import * as reservasService from "../services/reservas.service.js";
import { criarReservaSchema, atualizarStatusReservaSchema } from "../schemas/reservas.schema.js";

export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    const reservas = await reservasService.listarReservas();
    res.status(200).json(reservas);
  } catch (error) {
    next(error);
  }
}

export async function show(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const reserva = await reservasService.buscarReservaPorId(id);
    if (!reserva) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }
    res.status(200).json(reserva);
  } catch (error) {
    next(error);
  }
}

export async function minhas(req: Request, res: Response, next: NextFunction) {
  try {
    const id_usuario = req.usuario!.id;
    const reservas = await reservasService.listarReservasDoUsuario(id_usuario);
    res.status(200).json(reservas);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const dadosValidados = criarReservaSchema.parse(req.body);
    const novaReserva = await reservasService.criarReservaPendente(dadosValidados);
    res.status(201).json(novaReserva);
  } catch (error) {
    next(error);
  }
}

export async function patch(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const { status } = atualizarStatusReservaSchema.parse(req.body);
    const reservaAtualizada = await reservasService.atualizarStatusReserva(id, status);
    res.status(200).json(reservaAtualizada);
  } catch (error) {
    next(error);
  }
}