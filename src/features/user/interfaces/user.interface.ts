import mongoose, { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUserDocument extends Document {
    _id: string | ObjectId
    authId: string | ObjectId
    username?: string
    password?: string
    email?: string
    uId?: string
    borrowed: number
    location: string
    createdAt: Date
    updatedAt: Date
}