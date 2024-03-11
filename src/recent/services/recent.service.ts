import { catchError } from "../../common/helpers/catch.helper";
import logFactoryService from "../../common/services/logger/log.factory.service";
import { LogService } from "../../common/services/logger/log.service";
import { RecentDAO } from "../dao/recent.dao";
import { IRecentServiceInterface } from "../interfaces/IRecent.service.interface";
import { user } from "../types/user.session.type";

export class RecentService implements IRecentServiceInterface {
    recentDao: RecentDAO;
    logger: LogService;

    constructor (recentDao: RecentDAO) {
        this.recentDao = recentDao;
        this.logger = new LogService("RecentService");
    }

    createSession = async (sessionId: string, sessionData: object): Promise<void> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            await this.recentDao.insertSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }
    }

    checkSession = async (sessionId: string) : Promise<boolean> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            const sessionExists = await this.recentDao.checkSession(sessionId);
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
            await this.recentDao.updateSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }        
    }

    getSessionData = async (sessionId: string) : Promise<object> => {
        const logger = await logFactoryService.getLog(this.logger, "createSession");
        try {
            const sessionData = await this.recentDao.getSession(sessionId);
            logger.info("sessionData", sessionData);
            return sessionData;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message);
        }   
    }
}