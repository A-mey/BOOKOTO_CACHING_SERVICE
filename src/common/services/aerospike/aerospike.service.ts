import Aerospike from 'aerospike';

export class AerospikeService {

    private config: {hosts: string} = {
        hosts: 'localhost:3000',
    };

    client: import("client") | undefined;

    constructor() {
        this.connectAerospike();
    }

    connectAerospike = async () => {
        this.client = await Aerospike.connect(this.config);
    }
}