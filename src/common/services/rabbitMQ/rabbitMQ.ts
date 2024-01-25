import amqp from "amqplib";
import { catchError } from "../../helpers/catch.helper";

export class RabbitMQ {
    public connection: amqp.Connection | undefined;
    public channel: amqp.Channel | undefined;
    public queue: string = "";

    constructor(queue: string) {
        this.queue = queue;
        (async() => {
            await this.createChannel();
            await this.createQueue(this.queue);
        });
    }

    createChannel = async () => {
        this.connection = await amqp.connect("amqp://localhost:5672");
        if (!this.connection) {
            throw new Error("Queue connection error");
        }
        this.channel = await this.connection.createChannel();
        if (!this.channel) {
            throw new Error("Queue connection error");
        }
    };

    createQueue = async (queue: string) => {
        try {
            if (!this.channel) {
                throw new Error("Queue connection error");
            }
            await this.channel.assertQueue(queue, { durable: false });
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }
    };

    send = async (message: string) => {
        try {
            if (!this.channel) {
                throw new Error("Queue connection error");
            }
            if (!this.queue) {
                throw new Error("No queue selected");
            }
            this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }
    };

    getMessage = async (queue: string) => {
        try {
            await this.channel.consume(
                queue,
                (message: {content: unknown}) => {
                  if (message && message.content) {
                    console.log(
                      " [x] Received '%s'",
                      JSON.parse(message.content.toString())
                    );
                  }
                },
                { noAck: true }
              );
        } catch (error: unknown) {
            const errorMsg = await catchError(error);
            throw new Error(errorMsg);
        }
    }


}
