import { catchError } from "../../common/helpers/catch.helper";
import Aero from "../../common/services/aerospike/operations.aerospike.services"

class SessionDAO {

    private nameSpace: string = process.env.NAMESPACE!;
    private sessionSet: string = process.env.SESSION_SET!;

    insertSession = async (sessionId: string, sessionData: object) : Promise<boolean>  => {
        let response = false;
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            await Aero.insert(key, sessionData);
            response = true;
        } catch (e: unknown) {
            console.log(await catchError(e))
        }
        return response;
    }

    updateSession = async (sessionId: string, sessionData: object) : Promise<boolean>  => {
        let response = false;
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            await Aero.update(key, sessionData);
            response = true;
        } catch (e: unknown) {
            console.log("updateSession", await catchError(e))
        }
        return response;   
    }

    getSession = async (sessionId: string) => {
        let response;
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            const primarySession = await Aero.read(key);
            console.log(primarySession, "primarySession");
            // response = sessionDetails? sessionDetails: response;
            response = primarySession;
        } catch (e: unknown) {
            console.log(await catchError(e));
        }
        return response;
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