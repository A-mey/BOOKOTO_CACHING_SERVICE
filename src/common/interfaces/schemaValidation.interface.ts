import { Request, Response, NextFunction } from "express";

export interface CommonSchemaValidator{
    checkSchema(req: Request, res: Response, next: NextFunction): Promise<void>;
}