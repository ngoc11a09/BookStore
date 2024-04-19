import { Application } from "express";
import { authRoutes } from '@auth/routes/auth.route';
import { authMiddleware } from "./shared/utils/auth-middleware";
import { currentUserRoutes } from "./features/auth/routes/current.route";
import { userRoutes } from "./features/user/routes/user.route";
import { bookRoute } from "./features/book/routes/book.route";
import { publisherRoute } from "./features/publisher/publisher.route";
import { borrowRoute } from "./features/borrow/borrow.route";

const BASE_PATH = '/api';

export default (app: Application) => {
    const routes = () => {
        app.use(BASE_PATH, authRoutes.routes());
        app.use(`${BASE_PATH}/books`, bookRoute.routes());
        app.use(`${BASE_PATH}/currentusers`, authMiddleware.verifyUser, currentUserRoutes.routes())
        app.use(`${BASE_PATH}/users`, authMiddleware.verifyUser, userRoutes.routes())
        app.use(`${BASE_PATH}/publishers`, publisherRoute.routes())
        app.use(`${BASE_PATH}/borrows`, authMiddleware.verifyUser, borrowRoute.routes())
    }
    routes()
}