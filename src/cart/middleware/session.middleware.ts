import express from 'express';
import { SessionService } from '../services/cart.service';
import { Response } from '../../common/types/response.types';

// const log: debug.IDebugger = debug('app:users-controller');
export class CartMiddleware {
    sessionService: SessionService;

    constructor (sessionService: SessionService) {
        this.sessionService = sessionService;
    }

    validateSession = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const sessionId = req.body.SESSIONID;
        const sessionIdExists = await this.sessionService.checkSession(sessionId);
        if (req.originalUrl === "/validateSession") {
            if (sessionIdExists === true) {
                const sessionData = await this.sessionService.getSessionData(sessionId);
                const response: Response = {success: true, code: 200, data: {message: "Session is valid", data: {TYPE: 1, sessionId: sessionId, sessionData: sessionData}}};
                res.status(response.code).json(response);
            } else {
                next();
            }
        } else if (req.originalUrl === "/updateSession") {
            if (sessionIdExists === false) {
                const response: Response = {success: false, code: 500, data: {message: "Something went wrong", data: {sessionId: sessionId}}}
                res.status(response.code).json(response);
            } else {
                next();
            }
        }
        
    }
}

// export default new SessionMiddleware();