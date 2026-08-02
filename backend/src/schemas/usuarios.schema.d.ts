import { z } from "zod";
export declare const criarUsuarioSchema: z.ZodObject<{
    nome: z.ZodString;
    email: z.ZodString;
    senha: z.ZodString;
    telefone: z.ZodOptional<z.ZodString>;
    cpf: z.ZodString;
}, z.core.$strip>;
export type CriarUsuarioInput = z.infer<typeof criarUsuarioSchema>;
//# sourceMappingURL=usuarios.schema.d.ts.map