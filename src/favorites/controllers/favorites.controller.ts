import express from 'express';
import { FavoritesServices } from '../services/favorites.service';
import { createNewId } from '../../common/helpers/createId.helper';
import { Response } from '../../common/types/response.types';
import { getCurrentDateTime } from '../../common/helpers/currentDateTime.helper';
import { IFavoritesControllerInterface } from '../interfaces/IFavorites.controller.interface';
import { catchError } from '../../common/helpers/catch.helper';
import { LogService } from '../../common/services/logger/log.service';
import logFactoryService from '../../common/services/logger/log.factory.service';

export class FavoritesController implements IFavoritesControllerInterface {
    favoritesServices: FavoritesServices;
    logger: LogService;

    constructor(favoritesServices: FavoritesServices) {
        this.favoritesServices = favoritesServices
        this.logger = new LogService("SessionService");
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
            logger.info("sessionId", sessionId);
            logger.info("sessionData", sessionData);
            await this.favoritesServices.createSession(sessionId, sessionData);
            const response: Response = {success: true, code: 200, data: {message: "session created successfully", data: {TYPE: 0, sessionId: sessionId}}};
            res.status(response.code).json(response);
        } catch (error: unknown) {
            logger.error("error", await catchError(error));
            const response = {success: true, code: 500, data: {message: "Something went wrong"}};
            res.status(response.code).json(response);
        }
    }

    updateSession = async (req: express.Request, res: express.Response) => {
        const logger = await logFactoryService.getLog(this.logger, "addSession");
        try {  
            const sessionId = req.body.SESSIONID;
            const sessionData = req.body.SESSIONDATA;
            logger.info("sessionId", sessionId);
            logger.info("sessionData", sessionData);
            await this.favoritesServices.updateSession(sessionId, sessionData);
            const response = {success: true, code: 200, data: {message: "session updated successfully"}};
            res.status(response.code).json(response);
        } catch (error: unknown) {
            logger.error("error", await catchError(error));
            const response = {success: true, code: 500, data: {message: "Something went wrong"}};
            res.status(response.code).json(response);
        }
    }    
}