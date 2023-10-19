import { CommonRoutesConfig } from "../../common/common.routes.config";
import SessionController from '../controllers/session.controller';
import express from 'express';
import SessionValidationMiddleware from "../middleware/validation.middleware"
import sessionMiddleware from "../middleware/session.middleware";
import sessionController from "../controllers/session.controller";


export class SessionRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }
    
    configureRoutes() {

        // this.app.use(SessionValidationMiddleware.checkSchema);

        this.app.route('/addSession')
            .get(
                SessionController.addSession
            );
        this.app.route('/updateSession')
            .post(
                SessionValidationMiddleware.checkSchema,
                SessionController.updateSession
            )
        this.app.route('/validateSession')
            .post(
                SessionValidationMiddleware.checkSchema,
                sessionMiddleware.validateSession,
                sessionController.addSession
            )
        return this.app;
    }
}