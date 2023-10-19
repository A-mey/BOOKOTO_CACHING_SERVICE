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
            console.log(await catchError)
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
            console.log(await catchError)
        }
        return response;   
    }

    getSession = async (sessionId: string) => {
        let response;
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            const sessionDetails = await Aero.read(key, ['pk']);
            response = sessionDetails? sessionDetails: response;
        } catch (e: unknown) {
            console.log(await catchError);
        }
        return response;
    }
}

export default new SessionDAO()