import { authMiddleware } from "@root/shared/utils/auth-middleware";
import express, { Router } from "express";
import { CurrentUser } from "../controllers/current-user.controller";

class CurrentUserRoutes {
    private router: Router
    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.get('/', authMiddleware.checkAuthentication, CurrentUser.prototype.read)

        return this.router
    }
}
export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();