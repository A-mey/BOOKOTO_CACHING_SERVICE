import express from "express";
import { NotFoundController } from '../../../common/error/notFound/controllers/notFound.error.controllers';
import { NotFoundRoutes } from "../../../common/error/notFound/routes/notFound.error.routes.config";

export const recentContainerService = (app: express.Application) => {
    const notFoundController = new NotFoundController();
    const notFoundRoutes = new NotFoundRoutes(app, notFoundController);
    return notFoundRoutes;
};