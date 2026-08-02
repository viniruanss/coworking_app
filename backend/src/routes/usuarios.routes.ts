import { Router } from "express";
import * as usuariosController from "../controllers/usuarios.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js";
import { verificarAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", autenticarToken, verificarAdmin, usuariosController.index);
router.get("/:id", autenticarToken, verificarAdmin, usuariosController.show);
router.post("/", usuariosController.store); // cadastro continua público
router.delete("/:id", autenticarToken, verificarAdmin, usuariosController.destroy);

export default router;