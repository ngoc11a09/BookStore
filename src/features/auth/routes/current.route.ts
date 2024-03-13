import express, { Router } from "express";

class CurrentUserRoute {
    private router: Router
    constructor(){
        this.router = express.Router()
    }

    public routes(): Router {
        this.router.get('/currentuser',)

        return this.router
    }
}