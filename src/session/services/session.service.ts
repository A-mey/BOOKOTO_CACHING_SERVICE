import { catchError } from "../../common/helpers/catch.helper";
import { SessionDAO } from "../dao/session.dao";
import { ISessionServiceInterface } from "../interfaces/ISession.service.interface";
import { user } from "../types/user.session.type";

export class SessionService implements ISessionServiceInterface {
    sessionDao: SessionDAO;

    constructor (sessionDao: SessionDAO) {
        this.sessionDao = sessionDao;
    }

    createSession = async (sessionId: string, sessionData: object): Promise<void> => {
        try {
            await this.sessionDao.insertSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }
    }

    checkSession = async (sessionId: string) : Promise<boolean> => {
        try {
            const sessionExists = await this.sessionDao.checkSession(sessionId);
            return sessionExists;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }  
        
    }

    updateSession = async (sessionId: string, sessionData: user) : Promise<void> => {
        try {
            sessionData.ISLOGGEDIN = 1;
            await this.sessionDao.updateSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }        
    }

    getSessionData = async (sessionId: string) : Promise<object> => {
        const response = await this.sessionDao.getSession(sessionId);
        return response;
    }
}