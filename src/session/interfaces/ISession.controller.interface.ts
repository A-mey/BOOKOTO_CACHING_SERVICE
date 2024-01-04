import express, { Request } from 'express';
export interface ISessionControllerInterface {
    addSession (req: express.Request, res: express.Response) : Promise<void>
    updateSession (req: express.Request, res: express.Response) : Promise<void>
}