import express, { NextFunction } from "express";
import ValidateSchema from "../services/schema/validate.schema"
import compileSchema from "../services/schema/compile.schema";
import { IBodyValidationMiddlewareInterface } from "../interfaces/IBodyValidation.middleware.interface";
import { Response } from '../types/response.types';
import { errorMessageObject } from '../types/errorMsgObject.types';

export class BodyValidationMiddleware implements IBodyValidationMiddlewareInterface {
    private schema: object;

    constructor(schema: object) {
        this.schema = schema;
    }
    
    checkSchema = async (req: express.Request, res: express.Response, next: NextFunction) => {
        const origin: (keyof typeof this.schema) = req.originalUrl.replace("/", "") as (keyof typeof this.schema);
        const schema = this.schema[origin];
        const validateSchemaFn = await compileSchema.compile(schema);
        const errorRes: errorMessageObject =  await ValidateSchema.validateSchema(req.body, validateSchemaFn);
        if (errorRes.isValid) {
            next();
        } else {
            const response: Response = {success: false, code: 400, data: {message: errorRes.errorMsg}};
            res.status(400).json(response);
        }
        
    }
}