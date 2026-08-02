import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import salasRoutes from "./routes/salas.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { tratadorDeErros } from "./middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger.js";
// ...

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/salas", salasRoutes);
app.use("/reservas", reservasRoutes);
app.use("/auth", authRoutes);
app.use(tratadorDeErros); // sempre a última linha antes do app.listen
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Servidor rodando" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});