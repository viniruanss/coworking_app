import { Reserva } from "@prisma/client";
export declare function listarReservas(): Promise<Reserva[]>;
export declare function listarReservasDoUsuario(id_usuario: number): Promise<Reserva[]>;
export declare function buscarReservaPorId(id: number): Promise<Reserva | null>;
export declare function criarReservaPendente(dados: {
    id_usuario: number;
    id_sala: number;
    dia: Date;
    turno: string;
}): Promise<Reserva>;
export declare function atualizarStatusReserva(id: number, novoStatus: "confirmada" | "cancelada"): Promise<Reserva>;
//# sourceMappingURL=reservas.service.d.ts.map