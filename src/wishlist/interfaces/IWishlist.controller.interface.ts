import express from 'express';
export interface IWishlistControllerInterface {
    addSession (req: express.Request, res: express.Response) : Promise<void>
    updateSession (req: express.Request, res: express.Response) : Promise<void>
}