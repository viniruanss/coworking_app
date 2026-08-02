import { Sala, Prisma } from "@prisma/client";
export declare function listarSalas(): Promise<Sala[]>;
export declare function buscarSalaPorId(id: number): Promise<Sala | null>;
export declare function criarSala(dados: Prisma.SalaCreateInput): Promise<Sala>;
export declare function atualizarSala(id: number, dados: Prisma.SalaUpdateInput): Promise<Sala>;
export declare function removerSala(id: number): Promise<void>;
//# sourceMappingURL=salas.service.d.ts.map