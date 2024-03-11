import express from 'express';
import { CommonRoutesConfig } from '../../../common.routes.config';
import { INotFoundControllerInterface } from "../interfaces/notFound.error.interface";


export class NotFoundRoutes implements CommonRoutesConfig {

    private name = "NotFound";
    notFoundController: INotFoundControllerInterface;
    app: express.Application;

    constructor(app: express.Application, notFoundController: INotFoundControllerInterface) {
        // super(app, 'NotFoundErrorRoutes');
        this.app = app;
        this.notFoundController = notFoundController;
    }

    configureRoutes() {
        this.app.route('/*')
            .all(
                this.notFoundController.notFoundResponse
            )
        
        return this.app;
    }

    getName(): string {
        return this.name;
    }
}