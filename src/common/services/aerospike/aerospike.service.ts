import Aerospike, {Key, exp} from 'aerospike';
import { catchError } from '../../helpers/catch.helper';


class AerospikeService {
    private config = {
        hosts: 'localhost:3000',
    };
    client: import("client");
    // client: any;

    constructor() {
        this.client = Aerospike.client(this.config);
    }

    connect = async () => {
        // this.client.connect((err: unknown) => {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log("connected");
        // })
        await this.client.connect();
        // Aerospike.connect(this.config)
    }

    insert = async () => {
        try{
            const key = new Key('test', 'demo', 'mykey3');
            await this.client.put(key, { a: 'abc', b: 47 });
            // this.client.put(key, { a: 'abc', b: 42 }, (error: unknown) => {
            //     if (error) throw error
            // })
        } catch(e) {
            console.log(await catchError(e));
        }
        
    }

    read = async () => {
        const key = new Key('test', 'demo', 'mykey1');
        console.log((await this.client.get(key)).bins);
    }
}

export default new AerospikeService()