import { joiValidation } from '@root/shared/decorators/joi-validation.decorator';
import HTTP_STATUS from 'http-status-codes';
import { borrowSchema } from '@borrow/borrow.schema';
import { ObjectId } from 'mongodb';
import { IBorrowDocument } from '@borrow/borrow.interface';
import { borrowService } from '@borrow/borrow.service';
import { Request, Response } from 'express';
import { BadRequestError, CustomError } from '@root/shared/utils/error-handler';

export class Create {
    @joiValidation(borrowSchema)
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const borrowId: ObjectId = new ObjectId()

            const borrow: IBorrowDocument = Create.prototype.borrowData({ ...req.body }, borrowId)

            try {
                borrowService.addBorrow(borrow)
                res.status(HTTP_STATUS.CREATED).json({ message: 'Add new borrow successfully', borrow: borrow });
            } catch (error) {
                throw new BadRequestError('Cannot add a new borrow')
            }
        } catch (error) {
            if (error instanceof CustomError)
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
        }
    }

    private borrowData(data: IBorrowDocument, borrowId: ObjectId): IBorrowDocument {
        const { userCode, adminCode, borrowedDay, returnDay } = data;
        return {
            _id: borrowId,
            userCode: userCode,
            adminCode: adminCode,
            borrowedDay: borrowedDay,
            returnDay: returnDay
        } as IBorrowDocument
    }
}