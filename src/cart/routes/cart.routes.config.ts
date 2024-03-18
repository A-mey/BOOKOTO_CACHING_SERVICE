import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from 'express';
import { BodyValidationMiddleware } from "../../common/middleware/body.validation.middleware"
import { CartMiddleware } from "../middleware/session.middleware";
import { CartController } from "../controllers/cart.controller";

export class CartRoutes implements CommonRoutesConfig {
    private name = "SessionRoutes";
    app: express.Application;
    cartController: CartController;
    cartMiddleware: CartMiddleware;
    bodyValidationMiddleware: BodyValidationMiddleware;

    constructor(app: express.Application, sessionController: CartController, sessionMiddleware: CartMiddleware, bodyValidationMiddleware: BodyValidationMiddleware ) {
        this.app = app;
        this.cartController = sessionController;
        this.cartMiddleware = sessionMiddleware;
        this.bodyValidationMiddleware = bodyValidationMiddleware;
    }
    
    configureRoutes() {

        this.app.use(this.bodyValidationMiddleware.checkSchema);

        this.app.route('/cart')
            .get(
                this.cartController.addSession
            );
        this.app.route('/cart/:id')
            .get(
                this.cartController.addSession
            );
        this.app.route('/cart')
            .patch(
                this.cartMiddleware.validateSession,
                this.cartController.updateSession
            )
        this.app.route('/cart')
            .put(
                this.cartMiddleware.validateSession,
                this.cartController.addSession
            )
        return this.app;
    }

    getName(): string {
        return this.name;
    }
}