import express, { NextFunction } from "express";
import SessionSchema from "../schema/session.schema";
// import validateSchemaServices from "../../common/services/validateSchema.services";
import ValidateSchema from "../../common/services/schema/validate.schema"
import compileSchema from "../../common/services/schema/compile.schema";
import { CommonSchemaValidator } from "../../common/interfaces/schemaValidation.interface";
import { Response } from '../../common/types/response.types';
import { errorMessageObject } from '../../common/types/errorMsgObject.types';

class SessionValidationMiddleware implements CommonSchemaValidator{
    
    checkSchema = async (req: express.Request, res: express.Response, next: NextFunction) => {
        const origin: (keyof typeof SessionSchema.schema) = req.originalUrl.replace("/", "") as (keyof typeof SessionSchema.schema);
        const schema = SessionSchema.schema[origin];
        const validateSchemaFn = await compileSchema.compile(schema)
        const errorRes: errorMessageObject =  await ValidateSchema.validateSchema(req.body, validateSchemaFn);
        if (errorRes.isValid) {
            next();
          } else {
            const response: Response = {success: false, code: 400, data: {message: errorRes.errorMsg}}
            res.status(400).json(response);
        }
    }
}

export default new SessionValidationMiddleware()