import express from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import { sessionContainerService } from "./session/session.container";

export const containerService = (routes: Array<CommonRoutesConfig>, app: express.Application) : Array<CommonRoutesConfig> => {
    const sessionRoutes = sessionContainerService(app);
    routes.push(sessionRoutes);
    return routes;
};