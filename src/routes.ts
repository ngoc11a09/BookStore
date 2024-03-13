import { Application } from "express";
import {authRoutes} from '@auth/routes/auth.route';

const BASE_PATH = '/api';

export default (app: Application)=>{
    const routes = () => {
        app.use(BASE_PATH, authRoutes.routes());

    }
    routes()
}