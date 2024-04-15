import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';
import { publisherService } from "../publisher.service";

export class Get {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const publishers = await publisherService.getAll();
            res.status(HTTP_STATUS.OK).json(publishers);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all publishers' })
        }
    }

    public async getOneByCode(req: Request, res: Response): Promise<void> {
        try {
            const publisher = await publisherService.getPublisherByCode(req.body.code);
            res.status(HTTP_STATUS.OK).json({ message: 'Get publisher successfully', publisher: publisher });
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot get a publisher' })
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const publisher = await publisherService.getPublisherById(req.params.id);
            res.status(HTTP_STATUS.OK).json({ message: 'Get publisher successfully', publisher: publisher });
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot get a publisher' })
        }
    }
}