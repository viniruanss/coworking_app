import { Request, Response, NextFunction } from "express";
interface PayloadToken {
    id: number;
    e_admin: boolean;
}
declare global {
    namespace Express {
        interface Request {
            usuario?: PayloadToken;
        }
    }
}
export declare function autenticarToken(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map