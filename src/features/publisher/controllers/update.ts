import { joiValidation } from "@root/shared/decorators/joi-validation.decorator"
import HTTP_STATUS from 'http-status-codes'
import { publisherSchema } from "../publisher.schema"
import { Request, Response } from "express"
import { IPublisherDocument } from "../publisher.interface"
import { publisherService } from "../publisher.service"
import { BadRequestError, CustomError } from "@root/shared/utils/error-handler"

export class Update {
    @joiValidation(publisherSchema)
    public async updatePublisher(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id
        try {
            const isExist: IPublisherDocument = await publisherService.getPublisherByCode(req.body.code)
            if (isExist) throw new BadRequestError('Publisher\'s code is used')

            await publisherService.updatePublisher(id, req.body)
            res.status(HTTP_STATUS.OK).json({ message: "Updated successfully" })
        } catch (error) {
            if (error instanceof CustomError)
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
        }
    }
}