import { authMiddleware } from "@root/shared/utils/auth-middleware";
import express, { Router } from "express";
import { Get } from "@root/features/user/controllers/get";
import { permissionMiddleware } from "@root/shared/utils/permission-middleware";
import { Info } from "@user/controllers/info";
import { Delete } from "@user/controllers/delete";

class UserRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.post('/:id', Info.prototype.updateInfo)
        this.router.get('/', Get.prototype.getAll)
        this.router.get('/:id', authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Get.prototype.getUser)
        this.router.delete('/:id', authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Delete.prototype.deleteUser);
        this.router.delete('/', authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Delete.prototype.deleteAllUsers);
        return this.router
    }
}

export const userRoutes: UserRoutes = new UserRoutes()