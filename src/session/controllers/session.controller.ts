import express from 'express';
import sessionService from '../services/session.service';


class SessionController {
    constructor() {}
    addSession = async (req: express.Request, res: express.Response) => {
        return sessionService.createSession(req);

        res.status(200).json()
    }

    checkSession = async (req: express.Request, res: express.Response) => {

    }
}

export default new SessionController();