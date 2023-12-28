import { CommonRoutesConfig } from "../../common/common.routes.config";
import SessionController from '../controllers/session.controller';
import express from 'express';
import SessionValidationMiddleware from "../middleware/validation.middleware"
import sessionMiddleware from "../middleware/session.middleware";
import sessionController from "../controllers/session.controller";


export class SessionRoutes implements CommonRoutesConfig {
    private name = "SessionRoutes";
    app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }
    
    configureRoutes() {

        this.app.use(SessionValidationMiddleware.checkSchema);

        this.app.route('/addSession')
            .get(
                SessionController.addSession
            );
        this.app.route('/updateSession')
            .post(
                sessionMiddleware.validateSession,
                SessionController.updateSession
            )
        this.app.route('/getSessionData')
            .post(
                sessionMiddleware.validateSession,
                sessionController.addSession
            )
        return this.app;
    }

    getName(): string {
        return this.name;
    }
}