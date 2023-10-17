import express from 'express';


class SessionController {
    constructor() {}
    addSession = async (req: express.Request, res: express.Response) => {
        // return sessionService.createSession(req);
        res.status(200).send("done")
    }

    // checkSession = async (req: express.Request, res: express.Response) => {

    // }
}

export default new SessionController();