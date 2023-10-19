import { CommonRoutesConfig } from "../../common/common.routes.config";
import SessionController from '../controllers/session.controller';
import express from 'express';


export class SessionRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }
    
    configureRoutes() {

        this.app.route('/addSession')
            .post(
                SessionController.addSession
            );
        this.app.route('/updateSession')
            .post(
                SessionController.updateSession
            )
        return this.app;
    }
    
}