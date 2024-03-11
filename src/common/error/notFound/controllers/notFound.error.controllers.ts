import { Response } from "../../../types/response.types";
import express from 'express';
import { INotFoundControllerInterface } from '../interfaces/notFound.error.interface';

export class NotFoundController implements INotFoundControllerInterface {
    httpStatus = 404;

    notFoundResponse = async (req: express.Request, res: express.Response) => {
        const response: Response = {
            success: false,
            code: this.httpStatus,
            data: {
                message: "Path not found"
            }
        };
        res.status(this.httpStatus).json(response);
    }
}