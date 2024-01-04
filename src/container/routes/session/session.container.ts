import express from "express";
import { SessionRoutes } from "../../../session/routes/session.routes.config";
import { BodyValidationMiddleware } from "../../../common/middleware/body.validation.middleware";
import SessionSchema from "../../../session/schema/session.schema";
import { SessionService } from "../../../session/services/session.service";
import { SessionController } from "../../../session/controllers/session.controller";
import { SessionDAO } from "../../../session/dao/session.dao";
import { SessionMiddleware } from '../../../session/middleware/session.middleware';

export const sessionContainerService = (app: express.Application) => {
    const sessionDao = new SessionDAO();
    const sessionService = new SessionService(sessionDao);
    const sessionController = new SessionController(sessionService);
    const sessionMiddleware = new SessionMiddleware(sessionService);
    const bodyValidationMiddleware = new BodyValidationMiddleware(SessionSchema.schema);
    const sessionRoutes = new SessionRoutes(app, sessionController, sessionMiddleware, bodyValidationMiddleware);
    return sessionRoutes;
};