import express from 'express';
import SessionService from '../services/session.service';
import { Response } from '../../common/types/response.types';

// const log: debug.IDebugger = debug('app:users-controller');
class SessionMiddleware {
    validateSession = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const sessionId = req.body.SESSIONID;
        const sessionIdExists = await SessionService.checkSession(sessionId);
        if (sessionIdExists === true) {
            const response: Response = {success: true, code: 200, data: {message: "Session is valid", data: {sessionId: sessionId}}}
            res.status(response.code).json(response);
        } else {
            next();
        }
    }
}

export default new SessionMiddleware();