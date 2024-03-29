import { IUserDocument } from "@root/features/user/interfaces/user.interface";
import { userService } from "@root/features/user/services/user.service";
import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';


export class CurrentUser {
    public async read(req: Request, res: Response): Promise<void> {
        let isUser = false
        let token = null
        let user = null
        const existingUser: IUserDocument = (await userService.getUserById(`${req.currentUser!.userId}`))

        if (existingUser) {
            isUser = true
            user = existingUser
            token = existingUser.refreshToken
        }
        res.status(HTTP_STATUS.OK).json({ token, isUser, user })
    }
}