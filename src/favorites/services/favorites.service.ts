import { catchError } from "../../common/helpers/catch.helper";
import logFactoryService from "../../common/services/logger/log.factory.service";
import { LogService } from "../../common/services/logger/log.service";
import { FavoritesDao } from "../dao/favorites.dao";
import { IFavoritesServiceInterface } from "../interfaces/IFavorites.service.interface";
import { user } from "../types/user.session.type";

export class FavoritesServices implements IFavoritesServiceInterface {
    favoritesDao: FavoritesDao;
    logger: LogService;

    constructor (favoritesDao: FavoritesDao) {
        this.favoritesDao = favoritesDao;
        this.logger = new LogService("SessionService");
    }

    createSession = async (sessionId: string, sessionData: object): Promise<void> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            await this.favoritesDao.insertSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }
    }

    checkSession = async (sessionId: string) : Promise<boolean> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            const sessionExists = await this.favoritesDao.checkSession(sessionId);
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
            await this.favoritesDao.updateSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }        
    }

    getSessionData = async (sessionId: string) : Promise<object> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            const sessionData = await this.favoritesDao.getSession(sessionId);
            logger.info("sessionData", sessionData);
            return sessionData;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }
    }
}
