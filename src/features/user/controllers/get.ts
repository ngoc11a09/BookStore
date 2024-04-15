import HTTP_STATUS from 'http-status-codes';
import { IUserDocument } from "@user/interfaces/user.interface";
import { Request, Response } from "express";
import { userService } from '@user/services/user.service';

export class Get {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users: IUserDocument[] = await userService.getAll();
            res.status(HTTP_STATUS.OK).json(users)
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all' })
        }
    }
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: IUserDocument[] = await userService.getAllUsers();
            res.status(HTTP_STATUS.OK).json(users)
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all users' })
        }
    }
    public async getAllAdmins(req: Request, res: Response): Promise<void> {
        try {
            const users: IUserDocument[] = await userService.getAllAdmins();
            res.status(HTTP_STATUS.OK).json(users)
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all admins' })
        }
    }
    public async getUser(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id
        try {
            const user: IUserDocument = await userService.getUserById(id);
            res.status(HTTP_STATUS.OK).json({ message: `Get user with id = ${id} successfully`, user })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: `Cannot get user with id=${id}` })
        }
    }
}