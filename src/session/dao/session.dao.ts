import { catchError } from "../../common/helpers/catch.helper";
import Aero from "../../common/services/aerospike/operations.aerospike.services"
import { ISessionDaoInterface } from "../interfaces/ISession.dao.interface";

export class SessionDAO implements ISessionDaoInterface {

    private nameSpace: string = process.env.NAMESPACE!;
    private sessionSet: string = process.env.SESSION_SET!;

    insertSession = async (sessionId: string, sessionData: object) : Promise<void>  => {
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            await Aero.insert(key, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }
    }

    updateSession = async (sessionId: string, sessionData: object) : Promise<void>  => {
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            await Aero.update(key, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }
    }

    getSession = async (sessionId: string) => {
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            const primarySession = await Aero.read(key);
            console.log(primarySession, "primarySession");
            return primarySession;
        } catch (e: unknown) {
            throw new Error();
        }
    }

    checkSession = async (sessionId: string) => {
        let response = false;
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId);
            const sessionExists = await Aero.check(key);
            console.log(sessionExists, "sessionExists");
            response = sessionExists;
        } catch (e: unknown) {
            console.log(await catchError(e));
        }
        return response;
    }
}

export default new SessionDAO()