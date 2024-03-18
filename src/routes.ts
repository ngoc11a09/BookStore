import { Application } from "express";
import { authRoutes } from '@auth/routes/auth.route';
import { authMiddleware } from "./shared/utils/auth-middleware";
import { currentUserRoutes } from "./features/auth/routes/current.route";
import { userRoutes } from "./features/user/routes/user.route";

const BASE_PATH = '/api';

export default (app: Application) => {
    const routes = () => {
        app.use(BASE_PATH, authRoutes.routes());
        app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes())
        app.use(BASE_PATH, authMiddleware.verifyUser, userRoutes.routes())
    }
    routes()
}