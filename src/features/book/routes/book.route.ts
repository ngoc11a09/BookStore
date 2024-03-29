import { authMiddleware } from "@root/shared/utils/auth-middleware";
import express, { Router } from "express";
import { Create } from "@root/features/book/controllers/create";
import { permissionMiddleware } from "@root/shared/utils/permission-middleware";
import { Get } from "@book/controllers/get";

class BookRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.post('/addbook', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Create.prototype.create)
        this.router.get('/', Get.prototype.getAll)

        return this.router
    }
}

export const bookRoute: BookRoutes = new BookRoutes()