export declare function autenticar(email: string, senha: string): Promise<{
    token: string;
    usuario: {
        id: number;
        nome: string;
        email: string;
        e_admin: boolean;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map