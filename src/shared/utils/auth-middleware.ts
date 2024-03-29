import { NextFunction, Request, Response } from "express";
import { CustomError, NotAuthorizedError } from "./error-handler";
import jwt from 'jsonwebtoken'
import Logger from "bunyan";
import { config } from '@root/config'
import { AuthPayload } from "@root/features/auth/interfaces/auth.interface";
import HTTP_STATUS from 'http-status-codes';


const log: Logger = config.createLogger('AuthMiddleware')

export default class AuthMiddleware {
    public verifyUser(req: Request, res: Response, next: NextFunction): void {
        try {
            const authHeader = req.header('Authorization')

            const token = authHeader && authHeader.split(' ')[1]

            if (!token)
                throw new NotAuthorizedError('Token is not available. Please login again.')

            try {
                const payload: AuthPayload = jwt.verify(token, config.JWT_REFRESH_TOKEN!) as AuthPayload
                req.currentUser = payload
            } catch (error) {
                if (error instanceof CustomError) res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
            }
            next()
        } catch (error) {
            if (error instanceof CustomError) res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: error.message })
        }
    }

    public checkAuthentication(req: Request, res: Response, next: NextFunction): void {
        if (!req.currentUser) {
            throw new NotAuthorizedError('Authentication is require to access this route.')
        }
        next()
    }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware()