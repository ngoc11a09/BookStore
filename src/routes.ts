import { Application } from "express";
import { authRoutes } from '@auth/routes/auth.route';
import { authMiddleware } from "./shared/utils/auth-middleware";
import { currentUserRoutes } from "./features/auth/routes/current.route";
import { userRoutes } from "./features/user/routes/user.route";
import { bookRoute } from "./features/book/routes/book.route";
import { publisherRoute } from "./features/publisher/publisher.route";

const BASE_PATH = '/api';

export default (app: Application) => {
    const routes = () => {
        app.use(BASE_PATH, authRoutes.routes());
        app.use(`${BASE_PATH}/book`, bookRoute.routes());
        app.use(`${BASE_PATH}/currentuser`, authMiddleware.verifyUser, currentUserRoutes.routes())
        app.use(`${BASE_PATH}/user`, authMiddleware.verifyUser, userRoutes.routes())
        app.use(`${BASE_PATH}/publisher`, authMiddleware.verifyUser, publisherRoute.routes())
    }
    routes()
}