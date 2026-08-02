import { z } from "zod";
export declare const criarSalaSchema: z.ZodObject<{
    nome: z.ZodString;
    tipo: z.ZodDefault<z.ZodEnum<{
        cabine: "cabine";
        sala: "sala";
    }>>;
    capacidade: z.ZodNumber;
    descricao: z.ZodOptional<z.ZodString>;
    preco_locacao: z.ZodNumber;
}, z.core.$strip>;
export declare const atualizarSalaSchema: z.ZodObject<{
    nome: z.ZodOptional<z.ZodString>;
    tipo: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        cabine: "cabine";
        sala: "sala";
    }>>>;
    capacidade: z.ZodOptional<z.ZodNumber>;
    descricao: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    preco_locacao: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CriarSalaInput = z.infer<typeof criarSalaSchema>;
//# sourceMappingURL=salas.schema.d.ts.map