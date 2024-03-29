import { Request, Response } from "express";
import { bookService } from "../services/book.service";
import HTTP_STATUS from 'http-status-codes';

export class Get {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const books = await bookService.getAll();
            res.status(HTTP_STATUS.OK).json(books);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all books' })
        }
    }
    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const book = await bookService.getBookById(req.params.id);
            res.status(HTTP_STATUS.OK).json(book);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all books' })
        }
    }
}