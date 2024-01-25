import express from 'express';
import { RecentService } from '../services/recent.service';
import { createNewId } from '../../common/helpers/createId.helper';
import { Response } from '../../common/types/response.types';
import { getCurrentDateTime } from '../../common/helpers/currentDateTime.helper';
import { IRecentControllerInterface } from '../interfaces/IRecent.controller.interface';
import { catchError } from '../../common/helpers/catch.helper';
import { LogService } from '../../common/services/logger/log.service';
import logFactoryService from '../../common/services/logger/log.factory.service';

export class RecentController implements IRecentControllerInterface {
    recentService: RecentService;
    logger: LogService;

    constructor(recentService: RecentService) {
        this.recentService = recentService
        this.logger = new LogService("RecentService");
    }
    
    addSession = async (_req: express.Request, res: express.Response) => {
        const logger = await logFactoryService.getLog(this.logger, "addSession");
        try {
            const sessionId = await createNewId();
            const sessionData = {
                time: await getCurrentDateTime(),
                SESSIONID: sessionId,
                ISLOGGEDIN: 0
            }
            logger.log("sessionId", sessionId);
            logger.log("sessionData", sessionData);
            await this.recentService.createSession(sessionId, sessionData);
            const response: Response = {success: true, code: 200, data: {message: "session created successfully", data: {TYPE: 0, sessionId: sessionId}}};
            res.status(response.code).json(response);
        } catch (error: unknown) {
            logger.log("error", await catchError(error));
            const response = {success: true, code: 500, data: {message: "Something went wrong"}};
            res.status(response.code).json(response);
        }   
    }

    updateSession = async (req: express.Request, res: express.Response) => {
        const logger = await logFactoryService.getLog(this.logger, "addSession");
        try {  
            const sessionId = req.body.SESSIONID;
            const sessionData = req.body.SESSIONDATA;
            logger.log("sessionId", sessionId);
            logger.log("sessionData", sessionData);
            await this.recentService.updateSession(sessionId, sessionData);
            const response = {success: true, code: 200, data: {message: "session updated successfully"}};
            res.status(response.code).json(response);
        } catch (error: unknown) {
            logger.log("error", await catchError(error));
            const response = {success: true, code: 500, data: {message: "Something went wrong"}};
            res.status(response.code).json(response);
        }
    }    
}