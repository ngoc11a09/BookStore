import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';
import { bookService } from "../services/book.service";


export class Delete {
    public async deleteBook(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        try {
            await bookService.deleteBook(id)
            res.status(HTTP_STATUS.OK).json({ message: `Delete book with id ${id} successfully` })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: `Cannot delete book with id=${id}` })
        }
    }

    public async deleteAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const num = await bookService.deleteAllBooks()
            res.status(HTTP_STATUS.OK).json({ message: `Delete ${num} book${num < 2 ? '' : 's'} successfully` })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "An error occurred while deleting all books" })
        }
    }
}