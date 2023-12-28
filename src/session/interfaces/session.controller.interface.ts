import express, { Request } from 'express';
export interface SessionControllerInterface {
    addSession (req: express.Request, res: express.Response) : Promise<void>
    updateSession (req: express.Request, res: express.Response) : Promise<void>
}