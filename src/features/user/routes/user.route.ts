import { authMiddleware } from "@root/shared/utils/auth-middleware";
import express, { Router } from "express";
import { Get } from "@root/features/user/controllers/get";
import { permissionMiddleware } from "@root/shared/utils/permission-middleware";
import { Update } from "@user/controllers/update";
import { Delete } from "@user/controllers/delete";
import { Create } from "@user/controllers/create";

class UserRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.patch('/:id', authMiddleware.verifyUser, authMiddleware.checkAuthentication, Update.prototype.updateInfo)
        this.router.post('/add', Create.prototype.create)
        this.router.get('/', Get.prototype.getAll)
        this.router.get('/user', Get.prototype.getAllUsers)
        this.router.get('/admin', Get.prototype.getAllAdmins)
        this.router.get('/:id', authMiddleware.verifyUser, authMiddleware.checkAuthentication, Get.prototype.getUser)
        this.router.delete('/:id', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Delete.prototype.deleteUser);
        this.router.delete('/', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Delete.prototype.deleteAllUsers);
        return this.router
    }
}

export const userRoutes: UserRoutes = new UserRoutes()