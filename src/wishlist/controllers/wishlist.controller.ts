import express from 'express';
import { WishlistServices } from '../services/session.service';
import { createNewId } from '../../common/helpers/createId.helper';
import { Response } from '../../common/types/response.types';
import { getCurrentDateTime } from '../../common/helpers/currentDateTime.helper';
import { IWishlistControllerInterface } from '../interfaces/IWishlist.controller.interface';
import { catchError } from '../../common/helpers/catch.helper';
import { LogService } from '../../common/services/logger/log.service';
import logFactoryService from '../../common/services/logger/log.factory.service';

export class WishlistController implements IWishlistControllerInterface {
    wishlistServices: WishlistServices;
    logger: LogService;

    constructor(wishlistServices: WishlistServices) {
        this.wishlistServices = wishlistServices
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
            await this.wishlistServices.createSession(sessionId, sessionData);
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
            await this.wishlistServices.updateSession(sessionId, sessionData);
            const response = {success: true, code: 200, data: {message: "session updated successfully"}};
            res.status(response.code).json(response);
        } catch (error: unknown) {
            logger.error("error", await catchError(error));
            const response = {success: true, code: 500, data: {message: "Something went wrong"}};
            res.status(response.code).json(response);
        }
    }    
}