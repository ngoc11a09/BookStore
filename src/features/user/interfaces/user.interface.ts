import { Document } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUserDocument extends Document {
    _id: string | ObjectId
    username: string
    password: string
    email: string
    uId: string
    role: 'user' | 'admin'
    borrowed: number
    address: string
    createdAt: Date
    updatedAt: Date
    name: string
    lastName: string
    birthday: Date
    gender: '0' | '1' | 'unknow'
    phone: string,
    position: string,
    comparePassword(password: string): Promise<boolean>
    hashPassword(password: string): Promise<string>
    refreshToken: string | null
}

export interface IBasicInfo {
    name: string
    lastName: string
    birthday: Date
    gender: '0' | '1' | 'unknow'
    phone: string
    address: string
    position: string
    role: 'user' | 'admin'
}
