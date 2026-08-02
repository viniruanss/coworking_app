import { z } from "zod";

export const criarSalaSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  tipo: z.enum(["sala", "cabine"]).default("sala"),
  capacidade: z.number().int().positive("Capacidade deve ser um número positivo"),
  descricao: z.string().optional(),
  preco_locacao: z.number().positive("Preço deve ser positivo"),
});

export const atualizarSalaSchema = criarSalaSchema.partial();

export type CriarSalaInput = z.infer<typeof criarSalaSchema>;