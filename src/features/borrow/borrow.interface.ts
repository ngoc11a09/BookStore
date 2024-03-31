import { ObjectId } from "mongodb";

export interface IBorrowDocument extends Document {
    _id: string | ObjectId
    userCode: string | ObjectId
    adminCode: string | ObjectId
    bookCode: string | ObjectId
    borrowedDay: Date
    returnDay: Date
}