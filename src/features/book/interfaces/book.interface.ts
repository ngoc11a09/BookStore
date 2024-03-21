import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface IBookDocument extends Document {
    _id: string | ObjectId;
    code: string;
    title: string;
    price: number;
    quantity: number;
    publishYear: number;
    publishCode: string;
    author: string;
    createdAt: Date
    updatedAt: Date
}