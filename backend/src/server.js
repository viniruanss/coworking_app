import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de health check — confirma que o servidor está de pé
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Servidor rodando" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});