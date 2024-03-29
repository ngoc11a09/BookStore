import express, { Router } from "express";
import { SignUp } from "@auth/controllers/signup.controller";
import { SignIn } from "../controllers/signin.controller";
class AuthRoutes {
    private router: Router

    constructor() {
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.post('/signup', SignUp.prototype.create)
        this.router.post('/signin', SignIn.prototype.read)

        return this.router
    }
}

export const authRoutes: AuthRoutes = new AuthRoutes()