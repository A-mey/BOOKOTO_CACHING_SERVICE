import express from 'express';
export interface ICartControllerInterface {
    addSession (req: express.Request, res: express.Response) : Promise<void>
    updateSession (req: express.Request, res: express.Response) : Promise<void>
}