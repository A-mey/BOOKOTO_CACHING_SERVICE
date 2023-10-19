import { AerospikeService } from "./aerospike.service";
import Aerospike, { Key, policy } from "aerospike";

class AeroOperation extends AerospikeService{

    constructor() { 
        super();
    }

    insert = async (key: Key, bins: object): Promise<void> => {
        await this.client!.put(key, bins);
    }

    update = async (key: Key, bins: object): Promise<void> => {
        // policy.exists = Aerospike.policy.exists.UPDATE;
        await this.client!.put(key, bins);
    }

    read = async (key: Key, binData?: Array<string>): Promise<object> => {
        let response;
        let record;
        if (binData && binData.length) {
            record = await this.client!.select(key, binData);
        }
        else {
            record = await this.client!.get(key);
        }
        if (record && record.bins) {
            response = record.bins;
        }
        return response;
    }

    getKey = async (nameSpace: string, set: string, primaryKey: string | number) => {
        return new Key(nameSpace, set, primaryKey);
    }

}

export default new AeroOperation()