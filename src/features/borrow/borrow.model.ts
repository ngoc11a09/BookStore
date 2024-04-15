import { Model, Schema, model } from "mongoose";
import { IBorrowDocument } from "./borrow.interface";

const borrowSchema: Schema = new Schema({
    code: { type: String, default: '' },
    userCode: { type: String, default: '' },
    bookCode: { type: String, default: '' },
    borrowedDate: { type: Date, default: new Date(Date.now()) },
    returnDate: { type: Date, default: new Date(Date.now()) },
}, {
    timestamps: true,
})

const BorrowModel: Model<IBorrowDocument> = model<IBorrowDocument>('Borrow', borrowSchema, 'Borrow')
export { BorrowModel }