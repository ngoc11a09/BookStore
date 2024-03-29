import { authMiddleware } from "@root/shared/utils/auth-middleware";
import express, { Router } from "express";
import { Create } from "@root/features/book/controllers/create";
import { permissionMiddleware } from "@root/shared/utils/permission-middleware";
import { Get } from "@book/controllers/get";
import { Update } from "../controllers/update";

class BookRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.post('/add', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Create.prototype.create)
        this.router.get('/', Get.prototype.getAll)
        this.router.put('/update/:id', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Update.prototype.updateBook)


        return this.router
    }
}

export const bookRoute: BookRoutes = new BookRoutes()