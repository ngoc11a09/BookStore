import mongoose from "mongoose";
import { BorrowModel } from "@borrow/borrow.model";
import { IBorrowDocument } from "@borrow/borrow.interface";
import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { borrowSchema } from "./borrow.schema";

class BorrowService {
    public async addBorrow(data: IBorrowDocument): Promise<void> {
        await BorrowModel.create(data)
    }
    public async getBorrowByUserCode(code: string): Promise<IBorrowDocument> {
        return (await BorrowModel.findOne({ userCode: code }).exec()) as IBorrowDocument
    }
    public async getBorrowByCode(code: string): Promise<IBorrowDocument> {
        return (await BorrowModel.findOne({ code: code }).exec()) as IBorrowDocument
    }

    public async getBorrowById(id: string): Promise<IBorrowDocument> {
        return (await BorrowModel.findById(id).exec()) as IBorrowDocument
    }

    public async getBorrowByBorrowedDate(day: Date): Promise<IBorrowDocument> {
        return (await BorrowModel.findOne({ borrowedDate: day }).exec()) as IBorrowDocument
    }

    public async getBorrowByReturnDate(day: Date): Promise<IBorrowDocument> {
        return (await BorrowModel.findOne({ returnDate: day }).exec()) as IBorrowDocument
    }

    @joiValidation(borrowSchema)
    public async updateBorrowInfo(id: string, info: IBorrowDocument): Promise<void> {
        const _id = new mongoose.Types.ObjectId(id)
        await BorrowModel.findByIdAndUpdate(_id, {
            code: info['code'],
            userCode: info['userCode'],
            bookCode: info['bookCode'],
            borrowedDate: info['borrowedDate'],
            returnDate: info['returnDate'],
        }).exec()
    }

    public async getAll(): Promise<IBorrowDocument[]> {
        return await BorrowModel.find({}) as IBorrowDocument[]
    }
    public async deleteBorrow(id: string): Promise<void> {
        const _id = new mongoose.Types.ObjectId(id)
        await BorrowModel.deleteOne({ _id }).exec()
    }

    public async deleteAllBorrows(): Promise<number> {
        const res = await BorrowModel.deleteMany().exec()

        return res.deletedCount
    }
}

export const borrowService: BorrowService = new BorrowService()