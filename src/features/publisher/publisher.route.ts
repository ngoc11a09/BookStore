import { authMiddleware } from "@root/shared/utils/auth-middleware";
import { permissionMiddleware } from "@root/shared/utils/permission-middleware";
import express, { Router } from "express";
import { Create } from "@publisher/controllers/create";

class PublisherRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.post('/add', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Create.prototype.create)

        return this.router
    }
}

export const publisherRoute: PublisherRoutes = new PublisherRoutes()