import express from "express";
import { RecentRoutes } from "../../../recent/routes/recent.routes.config";
import { BodyValidationMiddleware } from "../../../common/middleware/body.validation.middleware";
import SessionSchema from "../../../session/schema/session.schema";
import { RecentService } from "../../../recent/services/recent.service";
import { RecentController } from "../../../recent/controllers/recent.controller";
import { RecentDAO } from "../../../recent/dao/recent.dao";

export const recentContainerService = (app: express.Application) => {
    const recentDao = new RecentDAO();
    const recentService = new RecentService(recentDao);
    const recentController = new RecentController(recentService);
    const bodyValidationMiddleware = new BodyValidationMiddleware(SessionSchema.schema);
    const recentRoutes = new RecentRoutes(app, recentController, bodyValidationMiddleware);
    return recentRoutes;
};