import { NextFunction, Request, Response } from "express";
import { CustomError, NotAuthorizedError, NotPermissionError } from "./error-handler";
import jwt from 'jsonwebtoken'
import { config } from '@root/config'
import { AuthPayload } from "@root/features/auth/interfaces/auth.interface";
import HTTP_STATUS from 'http-status-codes';


export default class PermissionMiddleware {
    public verifyRole(req: Request, res: Response, next: NextFunction): void {
        try {
            const rolehHeader = req.header('Authorization')
            const token = rolehHeader && rolehHeader.split(' ')[1]

            if (!token)
                throw new NotAuthorizedError('Token is not available. Please login again.')

            try {
                const payload: AuthPayload = jwt.verify(token, config.JWT_ACCESS_TOKEN!) as AuthPayload
                if (payload.role === 'user') throw new NotPermissionError('You have no permission.')
            } catch (error) {
                if (error instanceof CustomError) res.status(HTTP_STATUS.FORBIDDEN).json({ message: error.message })
            }
            next()
        } catch (error) {
            if (error instanceof CustomError) res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: error.message })
        }
    }
}

export const permissionMiddleware: PermissionMiddleware = new PermissionMiddleware()