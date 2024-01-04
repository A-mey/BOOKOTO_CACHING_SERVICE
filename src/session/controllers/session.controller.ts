import express from 'express';
import { SessionService } from '../services/session.service';
import { createNewId } from '../../common/helpers/createId.helper';
import { Response } from '../../common/types/response.types';
import { getCurrentDateTime } from '../../common/helpers/currentDateTime.helper';
import { ISessionControllerInterface } from '../interfaces/ISession.controller.interface';
import { catchError } from '../../common/helpers/catch.helper';

export class SessionController implements ISessionControllerInterface {
    sessionService: SessionService;

    constructor(sessionService: SessionService) {
        this.sessionService = sessionService
    }
    
    addSession = async (_req: express.Request, res: express.Response) => {
        try {
            const sessionId = await createNewId();
            const sessionData = {
                time: await getCurrentDateTime(),
                SESSIONID: sessionId,
                ISLOGGEDIN: 0
            }
            console.log(sessionData, "sessionData");
            await this.sessionService.createSession(sessionId, sessionData);
            const response: Response = {success: true, code: 200, data: {message: "session created successfully", data: {TYPE: 0, sessionId: sessionId}}};
            res.status(response.code).json(response);
        } catch (error: unknown) {
            console.log(await catchError(error));
            const response = {success: true, code: 500, data: {message: "Something went wrong"}};
            res.status(response.code).json(response);
        }   
    }

    updateSession = async (req: express.Request, res: express.Response) => {
        try {  
            const sessionId = req.body.SESSIONID;
            const sessionData = req.body.SESSIONDATA;
            await this.sessionService.updateSession(sessionId, sessionData);
            const response = {success: true, code: 200, data: {message: "session updated successfully"}};
            res.status(response.code).json(response);
        } catch (error: unknown) {
            console.log(await catchError(error));
            const response = {success: true, code: 500, data: {message: "Something went wrong"}};
            res.status(response.code).json(response);
        }
    }    
}

// export default new SessionController();