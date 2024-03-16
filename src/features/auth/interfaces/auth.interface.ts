import { ObjectId } from "mongodb"
import { Document } from "mongoose"

declare global {
    namespace Express {
        interface Request {
            currentUser: AuthPayload
        }
    }
}

export interface AuthPayload {
    userId: string,
    uId: string,
    email: string,
    userName: string,
    iat?: number
}

export interface IAuthDocument extends Document {
    _id: string | ObjectId
    uId: string
    username: string
    password?: string
    email: string
    createdAt: Date
    updatedAt: Date
    passwordResetToken?: string
    passwordResetExpires?: number | string
    comparePassword(password: string): Promise<boolean>
    hashPassword(password: string): Promise<string>
    refreshToken: string | null
}

export interface ISignUpData {
    _id: ObjectId
    uId: string
    email: string
    username: string
    password: string,
}
