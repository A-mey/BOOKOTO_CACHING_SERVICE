import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from 'express';
import { BodyValidationMiddleware } from "../../common/middleware/body.validation.middleware"
import { RecentController } from "../controllers/recent.controller";


export class RecentRoutes implements CommonRoutesConfig {
    private name = "RecentRoutes";
    app: express.Application;
    recentController: RecentController;
    bodyValidationMiddleware: BodyValidationMiddleware;

    constructor(app: express.Application, recentController: RecentController, bodyValidationMiddleware: BodyValidationMiddleware ) {
        this.app = app;
        this.recentController = recentController;
        this.bodyValidationMiddleware = bodyValidationMiddleware;
    }
    
    configureRoutes() {

        this.app.use(this.bodyValidationMiddleware.checkSchema);

        this.app.route('/recent/:id')
            .get(
                this.recentController.addSession
            );
        this.app.route('/recent')
            .put(
                this.recentController.updateSession
            )
        this.app.route('/recent')
            .delete(
                this.recentController.addSession
            )
        return this.app;
    }

    getName(): string {
        return this.name;
    }
}