import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';
import { borrowService } from "../borrow.service";


export class Delete {
    public async deleteOne(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        try {
            await borrowService.deleteBorrow(id)
            res.status(HTTP_STATUS.OK).json({ message: `Delete borrow with id ${id} successfully` })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: `Cannot delete borrow with id=${id}` })
        }
    }

    public async deleteAll(req: Request, res: Response): Promise<void> {
        try {
            const num = await borrowService.deleteAllBorrows()
            res.status(HTTP_STATUS.OK).json({ message: `Delete ${num} borrow${num < 2 ? '' : 's'} successfully` })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "An error occurred while deleting all borrows" })
        }
    }
}