import { authMiddleware } from "@root/shared/utils/auth-middleware";
import express, { Router } from "express";
import { User } from "@user/controllers/user.controller";

class UserRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.get('/', User.prototype.getAll)

        return this.router
    }
}

export const userRoutes: UserRoutes = new UserRoutes()