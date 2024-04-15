import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { Request, Response } from "express";
import { bookSchema } from "@book/schemas/book.schema";
import HTTP_STATUS from 'http-status-codes';
import { IBookDocument } from "../interfaces/book.interface";
import { bookService } from "../services/book.service";
import { BadRequestError, CustomError } from "@root/shared/utils/error-handler";
import mongoose from "mongoose";

export class Update {
    @joiValidation(bookSchema)
    public async updateBook(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id
        try {
            const isBookExist: IBookDocument = await bookService.getBookByCode(req.body.code)

            if (isBookExist && !(new mongoose.Types.ObjectId(id).equals(isBookExist._id))) throw new BadRequestError('Book\'s code is used')

            await bookService.updateBookInfo(id, req.body)
            res.status(HTTP_STATUS.OK).json({ message: "Updated successfully" })
        } catch (error) {
            if (error instanceof CustomError)
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
        }
    }
}