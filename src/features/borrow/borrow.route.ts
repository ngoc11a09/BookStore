import { authMiddleware } from "@root/shared/utils/auth-middleware";
import { permissionMiddleware } from "@root/shared/utils/permission-middleware";
import express, { Router } from "express";
import { Create } from "@borrow/controllers/create";
import { Get } from "@borrow/controllers/get";
import { Delete } from "@borrow/controllers/delete";
import { Update } from "@borrow/controllers/update";

class BorrowRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.post('/add', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Create.prototype.create)
        this.router.get('/', Get.prototype.getAll)
        this.router.get('/:id', Get.prototype.getOne)
        this.router.patch('/:id', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Update.prototype.updateBorrow)
        this.router.delete('/:id', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Delete.prototype.deleteOne)
        this.router.delete('/', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Delete.prototype.deleteAll)

        return this.router
    }
}

export const borrowRoute: BorrowRoutes = new BorrowRoutes()