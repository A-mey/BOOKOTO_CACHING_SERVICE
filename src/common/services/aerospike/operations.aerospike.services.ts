import { catchError } from "../../helpers/catch.helper";
import logFactoryService from "../logger/log.factory.service";
import { LogService } from "../logger/log.service";
import { AerospikeService } from "./aerospike.service";
import { Key } from "aerospike";

class AeroOperation extends AerospikeService {
    logger: LogService;

    constructor() { 
        super();
        this.logger = new LogService("AeroOperation");

    }

    insert = async (key: Key, bins: object): Promise<void> => {
        const logger = await logFactoryService.getLog(this.logger, "insert");
        try {
            await this.client.put(key, bins);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message)
        }
    }

    update = async (key: Key, bins: object): Promise<void> => {
        const logger = await logFactoryService.getLog(this.logger, "update");
        try {
            await this.client!.put(key, bins);
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message)
        }
    }

    read = async (key: Key, binData?: Array<string>): Promise<object> => {
        const logger = await logFactoryService.getLog(this.logger, "read");
        try {
            let record;
            if (binData && binData.length) {
                record = await this.client!.select(key, binData);
            } else {
                record = await this.client!.get(key);
            }
            if (!record || !record .bins) {
                throw new Error();
            }
            const response = record.bins;
            return response;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message)
        }
    }

    getKey = async (nameSpace: string, set: string, primaryKey: string | number) => {
        const logger = await logFactoryService.getLog(this.logger, "getKey");
        try {
            const key = new Key(nameSpace, set, primaryKey);
            logger.info("key", key);
            if (!key) {
                throw new Error("no key found");
            }
            return key;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message)
        }
    }

    check = async (key: Key): Promise<boolean> => {
        const logger = await logFactoryService.getLog(this.logger, "getKey");
        try {
            const doesKeyExists = this.client?.exists(key);
            logger.info("doesKeyExists", doesKeyExists);
            if (doesKeyExists !== true || doesKeyExists !== false) {
                throw new Error("exists error");
            }
            return doesKeyExists;
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            logger.error("error", errorMsg);
            throw new Error(errorMsg.message)
        }
    }

}

export default new AeroOperation()