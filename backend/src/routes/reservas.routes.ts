import { Router } from "express";
import * as reservasController from "../controllers/reservas.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", reservasController.index);
router.get("/minhas", autenticarToken, reservasController.minhas);
router.get("/:id", reservasController.show);
router.post("/", autenticarToken, reservasController.store);
router.patch("/:id", autenticarToken, reservasController.patch);
router.delete("/:id", autenticarToken, reservasController.destroy);

export default router;