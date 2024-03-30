import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface IPublisherDocument extends Document {
    _id: string | ObjectId
    code: string
    name: string
    address: string
    createdAt: Date
    updatedAt: Date
}