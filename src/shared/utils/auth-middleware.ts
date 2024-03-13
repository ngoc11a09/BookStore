import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "./error-handler";
import jwt from 'jsonwebtoken'
import Logger from "bunyan";
import {config} from '@root/config'
import { AuthPayload } from "@root/features/auth/interfaces/auth.interface";

const log: Logger = config.createLogger('AuthMiddleware')

export default class AuthMiddleware {
    public verifyUser(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        if (!token)
            throw new NotAuthorizedError('Token is not available. Please login again.')

        try {
            const payload: AuthPayload = jwt.verify(token, config.JWT_TOKEN!) as AuthPayload
            req.currentUser = payload
        } catch(error){
            log.error('Verification failed')
        }
        next()
    }
}