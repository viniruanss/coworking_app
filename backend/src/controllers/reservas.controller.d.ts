import { Request, Response, NextFunction } from "express";
export declare function index(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function show(req: Request<{
    id: string;
}>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function minhas(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function store(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function patch(req: Request<{
    id: string;
}>, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=reservas.controller.d.ts.map