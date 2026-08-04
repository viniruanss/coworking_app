import { z } from "zod";

export const criarUsuarioSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  telefone: z.string().optional(),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos numéricos"),
});

export type CriarUsuarioInput = z.infer<typeof criarUsuarioSchema>;