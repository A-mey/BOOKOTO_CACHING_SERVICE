import SessionDao from "../dao/session.dao";

class SessionService {
    createSession = async (sessionId: string, sessionData: object): Promise<unknown> => {
        const response = await SessionDao.insertSession(sessionId, sessionData);
        return response;
    }

    checkSession = async (sessionId: string) => {
        // let response = false
        const sessionExists = await SessionDao.checkSession(sessionId);
        // response = session? true : false;
        return sessionExists;
    }

    updateSession = async (sessionId: string, sessionData: object) => {
        const response = await SessionDao.updateSession(sessionId, sessionData);
        return response;
    }
}

export default new SessionService();