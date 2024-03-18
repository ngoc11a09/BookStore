import { authMiddleware } from "@root/shared/utils/auth-middleware";
import express, { Router } from "express";
// import { Get } from "../controllers/get-profile";

class UserRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        // this.router.get('/user/all/:page', authMiddleware.checkAuthentication, Get.prototype.all)

        return this.router
    }
}

export const userRoutes: UserRoutes = new UserRoutes