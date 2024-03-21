import { userService } from "@user/services/user.service";
import HTTP_STATUS from 'http-status-codes';
import { IUserDocument } from "../interfaces/user.interface";
import { Request, Response } from "express";

export class User {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users: IUserDocument[] = await userService.getAllUsers();
            res.status(HTTP_STATUS.OK).json(users)
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all users' })
        }
    }
}