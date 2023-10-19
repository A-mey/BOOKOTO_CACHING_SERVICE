import Aerospike from 'aerospike';

export class AerospikeService {

    private config: {hosts: string} = {
        hosts: 'localhost:3000',
    };

    client: import("client");

    constructor() {
        this.client = Aerospike.client(this.config);
    }
}