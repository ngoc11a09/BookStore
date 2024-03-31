import { joiValidation } from "@root/shared/decorators/joi-validation.decorator"
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from "express"
import { borrowSchema } from "../borrow.schema";
import { borrowService } from "../borrow.service";

export class Update {
    @joiValidation(borrowSchema)
    public async updateBorrow(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id
        try {
            await borrowService.updateBorrowInfo(id, req.body)
            res.status(HTTP_STATUS.OK).json({ message: "Updated successfully" })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot update borrow infomation' })
        }
    }
}