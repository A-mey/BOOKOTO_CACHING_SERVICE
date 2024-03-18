import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from 'express';
import { BodyValidationMiddleware } from "../../common/middleware/body.validation.middleware"
import { WishlistMiddleware } from "../middleware/favorites.middleware";
import { WishlistController } from "../controllers/favorites.controller";


export class FavoritesRoutes implements CommonRoutesConfig {
    private name = "SessionRoutes";
    app: express.Application;
    wishlistController: WishlistController;
    wishlistMiddleware: WishlistMiddleware;
    bodyValidationMiddleware: BodyValidationMiddleware;

    constructor(app: express.Application, wishlistController: WishlistController, wishlistMiddleware: WishlistMiddleware, bodyValidationMiddleware: BodyValidationMiddleware ) {
        this.app = app;
        this.wishlistController = wishlistController;
        this.wishlistMiddleware = wishlistMiddleware;
        this.bodyValidationMiddleware = bodyValidationMiddleware;
    }
    
    configureRoutes() {

        this.app.use(this.bodyValidationMiddleware.checkSchema);

        this.app.route('/session')
            .get(
                this.wishlistController.addSession
            );
        this.app.route('/session')
            .patch(
                this.wishlistMiddleware.validateSession,
                this.wishlistController.updateSession
            )
        this.app.route('/session/data')
            .put(
                this.wishlistMiddleware.validateSession,
                this.wishlistController.addSession
            )
        return this.app;
    }

    getName(): string {
        return this.name;
    }
}