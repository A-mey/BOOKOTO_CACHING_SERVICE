import SessionDao from "../dao/session.dao";

class SessionService {
    createSession = async (sessionId: string, sessionData: object): Promise<unknown> => {
        const response = await SessionDao.insertSession(sessionId, sessionData);
        return response;
    }

    getSession = async (sessionId: string) => {
        const response = await SessionDao.getSession(sessionId);
        return response;
    }

    updateSession = async (sessionId: string, sessionData: object) => {
        const response = await SessionDao.updateSession(sessionId, sessionData);
        return response;
    }
}

export default new SessionService();