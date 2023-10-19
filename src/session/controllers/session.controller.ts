import express from 'express';
import SessionService from '../services/session.service';
import { createNewId } from '../../common/helpers/createId.helper';
import { Response } from '../../common/types/response.types';

class SessionController {

    constructor() {}
    
    addSession = async (req: express.Request, res: express.Response) => {
        const sessionId = await createNewId();
        const sessionData = req.body.SESSIONDATA;
        const createSessionResponse = await SessionService.createSession(sessionId, sessionData);
        let response: Response;
        if (createSessionResponse) {
            response = {success: true, code: 200, data: {message: "session created successfully", data: {SESSIONID: sessionId}}};
        } else {
            response = {success: false, code: 500, data: {message: "something went wrong"}};
        }
        res.status(response.code).json(response);
    }

    updateSession = async (req: express.Request, res: express.Response) => {
        const sessionId = req.body.SESSIONID;
        const sessionData = req.body.SESSIONDATA;
        const doesSessionExist = await SessionService.checkSession(sessionId); 
        let response: Response;
        response = {success: true, code: 200, data: {message: "session updated successfully"}};
        if (doesSessionExist) {
            const updateSession = await SessionService.updateSession(sessionId, sessionData);
            if (!updateSession) {
                response = {success: false, code: 500, data: {message: "something went wrong"}};
            }
            // response = {success: true, code: 200, data: {message: "session updated successfully"}};
        } else {
            const newSessionId = await createNewId();
            const newSessionResponse = await SessionService.createSession(newSessionId, sessionData);
            if (!newSessionResponse) {
                response = {success: false, code: 500, data: {message: "something went wrong"}};
            }
        }
        res.status(response.code).json(response);
    }
}

export default new SessionController();