import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';
import { publisherService } from "../publisher.service";


export class Delete {
    public async deleteOne(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        try {
            await publisherService.deletePublisher(id)
            res.status(HTTP_STATUS.OK).json({ message: `Delete publisher with id ${id} successfully` })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: `Cannot delete publisher with id=${id}` })
        }
    }

    public async deleteAll(req: Request, res: Response): Promise<void> {
        try {
            const num = await publisherService.deleteAllPublishers()
            res.status(HTTP_STATUS.OK).json({ message: `Delete ${num} publisher${num < 2 ? '' : 's'} successfully` })
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "An error occurred while deleting all publisher" })
        }
    }
}