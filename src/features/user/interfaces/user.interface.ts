import mongoose, { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUserDocument extends Document {
    _id: string | ObjectId
    username?: string
    password?: string
    email?: string
    uId?: string
    borrowed: number
    address: string
    createdAt: Date
    updatedAt: Date
    name: string
    lastName: string
    birthday: Date
    sex: '0' | '1' | 'unknow'
    phone: string,
    passwordResetToken?: string
    passwordResetExpires?: number | string
    comparePassword(password: string): Promise<boolean>
    hashPassword(password: string): Promise<string>
    refreshToken: string | null
}

export interface IBasicInfo {
    name: string
    lastName: string
    birthday: Date
    sex: '0' | '1' | 'unknow'
    phone: string
    address: string
}