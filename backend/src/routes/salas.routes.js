import { Router } from "express";
import * as salasController from "../controllers/salas.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js";
import { verificarAdmin } from "../middlewares/admin.middleware.js";
const router = Router();
router.get("/", salasController.index);
router.get("/:id", salasController.show);
router.post("/", autenticarToken, verificarAdmin, salasController.store);
router.put("/:id", autenticarToken, verificarAdmin, salasController.update);
router.delete("/:id", autenticarToken, verificarAdmin, salasController.destroy);
export default router;
//# sourceMappingURL=salas.routes.js.map