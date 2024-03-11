import express from "express";

export interface INotFoundControllerInterface {
    notFoundResponse (req: express.Request, res: express.Response) : Promise<void>
}