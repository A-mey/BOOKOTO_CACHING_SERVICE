import Aerospike from 'aerospike';


class AerospikeService {
    private config = {
        hosts: 'localhost:3000',
    };

    constructor() {}

    connect() {
        Aerospike.connect(this.config)
    }
}

export default new AerospikeService()