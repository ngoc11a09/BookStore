import { ObjectId } from "mongodb";

export interface IBorrowDocument extends Document {
    _id: string | ObjectId
    code: string
    userCode: string | ObjectId
    bookCode: string | ObjectId
    borrowedDate: Date
    returnDate: Date
}