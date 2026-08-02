import { z } from "zod";
export const criarReservaSchema = z.object({
    id_usuario: z.number().int().positive(),
    id_sala: z.number().int().positive(),
    dia: z.coerce.date(),
    turno: z.string().min(1, "Turno é obrigatório"),
});
export const atualizarStatusReservaSchema = z.object({
    status: z.enum(["confirmada", "cancelada"]),
});
//# sourceMappingURL=reservas.schema.js.map