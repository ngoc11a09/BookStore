import { Model, Schema, model } from "mongoose";
import { IBorrowDocument } from "./borrow.interface";

const borrowSchema: Schema = new Schema({
    userCode: { type: String, default: '' },
    adminCode: { type: String, default: '' },
    bookCode: { type: String, default: '' },
    borrowedDay: { type: Date, default: new Date(Date.now()) },
    returnDay: { type: Date, default: new Date(Date.now()) },
}, {
    timestamps: true,
})

const BorrowModel: Model<IBorrowDocument> = model<IBorrowDocument>('Borrow', borrowSchema, 'Borrow')
export { BorrowModel }