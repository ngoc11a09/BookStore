import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { Request, Response } from "express";
import { bookSchema } from "../schemas/book.schema";
import { IBookDocument } from "../interfaces/book.interface";
import { bookService } from "../services/book.service";
import { BadRequestError, CustomError } from "@root/shared/utils/error-handler";
import { ObjectId } from "mongodb";
import { Util } from "@root/shared/utils/util";
import HTTP_STATUS from 'http-status-codes';

export class Create {
    @joiValidation(bookSchema)
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { code } = req.body
            const isBookExist: IBookDocument = await bookService.getBookByCode(code)

            if (isBookExist != null) {
                throw new BadRequestError('This code existed')
            }
            const bookId: ObjectId = new ObjectId()

            const book: IBookDocument = Create.prototype.bookData({ ...req.body }, bookId)

            try {
                bookService.addBook(book)
                res.status(HTTP_STATUS.CREATED).json({ message: 'Add a new book successfully', book: book });
            } catch (error) {
                throw new BadRequestError('Cannot add a new book')
            }
        } catch (error) {
            if (error instanceof CustomError)
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
        }
    }

    private bookData(data: IBookDocument, bookId: ObjectId): IBookDocument {
        const { code, title, publishCode, publishYear, author, quantity, price } = data;
        return {
            _id: bookId,
            code: code,
            title: title,
            publishCode: publishCode,
            publishYear: publishYear,
            author: Util.firstLetterUppercase(author),
            quantity: quantity,
            price: price
        } as IBookDocument
    }
}