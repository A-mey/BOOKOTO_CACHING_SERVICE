import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from 'express';
import { BodyValidationMiddleware } from "../../common/middleware/body.validation.middleware"
import { SessionMiddleware } from "../middleware/session.middleware";
import { SessionController } from "../controllers/session.controller";


export class SessionRoutes implements CommonRoutesConfig {
    private name = "SessionRoutes";
    app: express.Application;
    sessionController: SessionController;
    sessionMiddleware: SessionMiddleware;
    bodyValidationMiddleware: BodyValidationMiddleware;

    constructor(app: express.Application, sessionController: SessionController, sessionMiddleware: SessionMiddleware, bodyValidationMiddleware: BodyValidationMiddleware ) {
        this.app = app;
        this.sessionController = sessionController;
        this.sessionMiddleware = sessionMiddleware;
        this.bodyValidationMiddleware = bodyValidationMiddleware;
    }
    
    configureRoutes() {

        this.app.use(this.bodyValidationMiddleware.checkSchema);

        this.app.route('/session')
            .get(
                this.sessionController.addSession
            );
        this.app.route('/session')
            .patch(
                this.sessionMiddleware.validateSession,
                this.sessionController.updateSession
            )
        this.app.route('/session/data')
            .put(
                this.sessionMiddleware.validateSession,
                this.sessionController.addSession
            )
        return this.app;
    }

    getName(): string {
        return this.name;
    }
}