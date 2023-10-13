import { CommonRoutesConfig } from "../../common/common.routes.config";
import SessionController from '../controllers/session.controller';
import LoginMiddleware from '../middleware/login.middleware';
import LoginValidationMiddleware from "../middleware/validation.middleware"
import express from 'express';


export class LoginRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {

        this.app.use('/createNewSession')
            .post(
                SessionController.addSession
            )
        return this.app;
    }
}