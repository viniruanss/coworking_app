import { Usuario } from "@prisma/client";
type UsuarioSemSenha = Omit<Usuario, "senha_hash">;
export declare function listarUsuarios(): Promise<UsuarioSemSenha[]>;
export declare function buscarUsuarioPorId(id: number): Promise<UsuarioSemSenha | null>;
export declare function criarUsuario(dados: {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    cpf: string;
}): Promise<UsuarioSemSenha>;
export declare function removerUsuario(id: number): Promise<void>;
export {};
//# sourceMappingURL=usuarios.service.d.ts.map