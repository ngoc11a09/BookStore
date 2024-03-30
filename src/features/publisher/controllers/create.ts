import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { publisherSchema } from "@publisher/publisher.schema";
import { Request, Response } from "express";
import { IPublisherDocument } from "@publisher/publisher.interface";
import HTTP_STATUS from 'http-status-codes';
import { publisherService } from "@publisher/publisher.service";
import { BadRequestError, CustomError } from "@root/shared/utils/error-handler";
import { ObjectId } from "mongodb";

export class Create {
    @joiValidation(publisherSchema)
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { code } = req.body
            const isPublisherExist: IPublisherDocument = await publisherService.getPublisherByCode(code)
            if (isPublisherExist) throw new BadRequestError('This code existed')

            const publisherId: ObjectId = new ObjectId()
            const publisher: IPublisherDocument = Create.prototype.publisherData({ ...req.body }, publisherId)

            try {
                publisherService.addPublisher(publisher)
                res.status(HTTP_STATUS.OK).json({ message: 'Add a publisher successfully' })
            } catch (error) {
                throw new BadRequestError('Cannot add a new publisher')
            }
        } catch (error) {
            if (error instanceof CustomError)
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })

        }
    }

    private publisherData(data: IPublisherDocument, bookId: ObjectId): IPublisherDocument {
        const { code, name, address } = data;
        return {
            _id: bookId,
            code: code,
            name: name,
            address: address,
        } as IPublisherDocument
    }
}