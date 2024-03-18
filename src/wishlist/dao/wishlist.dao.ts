import { catchError } from "../../common/helpers/catch.helper";
import Aero from "../../common/services/aerospike/operations.aerospike.services"
import logFactoryService from "../../common/services/logger/log.factory.service";
import { LogService } from "../../common/services/logger/log.service";
import { IWishlistDaoInterface } from "../interfaces/Iwishlist.dao.interface";

export class WishlistDao implements IWishlistDaoInterface {

    private nameSpace: string = process.env.NAMESPACE!;
    private sessionSet: string = process.env.SESSION_SET!;
    logger: LogService;

    constructor () {
        this.logger = new LogService("SessionDAO");
    }

    insertSession = async (sessionId: string, sessionData: object) : Promise<void>  => {
        const logger = await logFactoryService.getLog(this.logger, "insertSession");
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            await Aero.insert(key, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg)
            throw new Error(errorMsg.message);
        }
    }

    updateSession = async (sessionId: string, sessionData: object) : Promise<void>  => {
        const logger = await logFactoryService.getLog(this.logger, "updateSession");
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            await Aero.update(key, sessionData);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg)
            throw new Error(errorMsg.message);
        }
    }

    getSession = async (sessionId: string) : Promise<object> => {
        const logger = await logFactoryService.getLog(this.logger, "getSession");
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId)
            const primarySession = await Aero.read(key);
            logger.info("primarySession", primarySession);
            return primarySession;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg)
            throw new Error(errorMsg.message);
        }
    }

    checkSession = async (sessionId: string) : Promise<boolean> => {
        const logger = await logFactoryService.getLog(this.logger, "checkSession");
        try {
            const key = await Aero.getKey(this.nameSpace, this.sessionSet, sessionId);
            const doesSessionExist = await Aero.check(key);
            logger.info("sessionExists", doesSessionExist);
            return doesSessionExist;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg)
            throw new Error(errorMsg.message);
        }
    }
}