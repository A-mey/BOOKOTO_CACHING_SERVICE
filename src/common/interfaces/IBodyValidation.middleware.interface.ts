import { Request, Response, NextFunction } from "express";

export interface IBodyValidationMiddlewareInterface {
    checkSchema(req: Request, res: Response, next: NextFunction): Promise<void>;
}