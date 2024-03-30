import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';
import { publisherService } from "../publisher.service";

export class Get {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const books = await publisherService.getAll();
            res.status(HTTP_STATUS.OK).json(books);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all publishers' })
        }
    }
    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const book = await publisherService.getPublisherById(req.params.id);
            res.status(HTTP_STATUS.OK).json(book);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot get a publisher' })
        }
    }
}