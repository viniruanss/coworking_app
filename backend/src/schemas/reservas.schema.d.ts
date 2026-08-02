import { z } from "zod";
export declare const criarReservaSchema: z.ZodObject<{
    id_usuario: z.ZodNumber;
    id_sala: z.ZodNumber;
    dia: z.ZodCoercedDate<unknown>;
    turno: z.ZodString;
}, z.core.$strip>;
export declare const atualizarStatusReservaSchema: z.ZodObject<{
    status: z.ZodEnum<{
        cancelada: "cancelada";
        confirmada: "confirmada";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=reservas.schema.d.ts.map