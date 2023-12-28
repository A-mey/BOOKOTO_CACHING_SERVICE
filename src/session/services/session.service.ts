import { catchError } from "../../common/helpers/catch.helper";
import SessionDao from "../dao/session.dao";
import { SessionServiceInterface } from "../interfaces/session.service.interface";
import { user } from "../types/user.session.type";

class SessionService implements SessionServiceInterface {
    createSession = async (sessionId: string, sessionData: object): Promise<void> => {
        try {
            await SessionDao.insertSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }
    }

    checkSession = async (sessionId: string) : Promise<boolean> => {
        try {
            const sessionExists = await SessionDao.checkSession(sessionId);
            return sessionExists;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }  
        
    }

    updateSession = async (sessionId: string, sessionData: user) : Promise<void> => {
        try {
            sessionData.ISLOGGEDIN = 1;
            await SessionDao.updateSession(sessionId, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }        
    }

    getSessionData = async (sessionId: string) : Promise<object> => {
        const response = await SessionDao.getSession(sessionId);
        return response;
    }
}

export default new SessionService();