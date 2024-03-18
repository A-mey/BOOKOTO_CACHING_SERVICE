import { catchError } from "../../common/helpers/catch.helper";
import logFactoryService from "../../common/services/logger/log.factory.service";
import { LogService } from "../../common/services/logger/log.service";
import { WishlistDao } from "../dao/wishlist.dao";
import { IWishlistServiceInterface } from "../interfaces/Iwishlist.service.interface";
import { user } from "../types/user.session.type";

export class WishlistServices implements IWishlistServiceInterface {
    wishlistDao: WishlistDao;
    logger: LogService;

    constructor (wishlistDao: WishlistDao) {
        this.wishlistDao = wishlistDao;
        this.logger = new LogService("SessionService");
    }

    createSession = async (sessionId: string, sessionData: object): Promise<void> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            await this.wishlistDao.insertSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }
    }

    checkSession = async (sessionId: string) : Promise<boolean> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            const sessionExists = await this.wishlistDao.checkSession(sessionId);
            return sessionExists;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }  
        
    }

    updateSession = async (sessionId: string, sessionData: user) : Promise<void> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            await this.wishlistDao.updateSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }        
    }

    getSessionData = async (sessionId: string) : Promise<object> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            const sessionData = await this.wishlistDao.getSession(sessionId);
            logger.info("sessionData", sessionData);
            return sessionData;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }   
    }
}
