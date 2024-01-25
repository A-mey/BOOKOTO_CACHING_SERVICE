import express from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import { sessionContainerService } from "./session/session.container";
import { recentContainerService } from './recent/recent.container';

export const containerService = (routes: Array<CommonRoutesConfig>, app: express.Application) : Array<CommonRoutesConfig> => {
    const sessionRoutes = sessionContainerService(app);
    routes.push(sessionRoutes);
    
    const recentRoutes = recentContainerService(app);
    routes.push(recentRoutes);

    return routes;
};