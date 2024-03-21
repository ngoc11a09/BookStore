import { authMiddleware } from "@root/shared/utils/auth-middleware";
import express, { Router } from "express";
import { Book } from "@book/controllers/book.controller";
import { permissionMiddleware } from "@root/shared/utils/permission-middleware";

class BookRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.post('/addbook', authMiddleware.verifyUser, authMiddleware.checkAuthentication, permissionMiddleware.verifyRole, Book.prototype.create)
        // this.router.post('/addbook', Book.prototype.create)
        this.router.get('/', Book.prototype.getAll)

        return this.router
    }
}

export const bookRoute: BookRoutes = new BookRoutes()