import express, { Router } from "express";
import { SignUp } from "@auth/controllers/signup.controller";

class AuthRoutes {
    private router: Router

    constructor(){
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.post('/signup', SignUp.prototype.create)
        // this.router.post('/signin', SignIn.read)
        // this.router.post('/forget-password', Password.create)
        // this.router.post('/reset-password/:token', Password.update)

        return this.router
    }

    public signoutRoute(): Router {
        // this.router.get('/signout',SignOut.prototype.update)

        return this.router
    }
}

export const authRoutes: AuthRoutes = new AuthRoutes()