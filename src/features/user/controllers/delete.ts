import { Request, Response } from "express";
import { userService } from "@user/services/user.service";
import HTTP_STATUS from 'http-status-codes';


export class Delete {
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        try {
            await userService.deleteUserById(id)
            res.status(HTTP_STATUS.OK).json({ message: `Delete user with id ${id} successfully` })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: `Cannot delete user with id=${id}` })
        }
    }

    public async deleteAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const num = await userService.deleteAllUsers()
            res.status(HTTP_STATUS.OK).json({ message: `Delete ${num} user${num < 2 ? '' : 's'} successfully` })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "An error occurred while deleting all users" })
        }
    }
}