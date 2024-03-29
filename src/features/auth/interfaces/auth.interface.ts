import { ObjectId } from "mongodb"

declare global {
    namespace Express {
        interface Request {
            currentUser: AuthPayload
        }
    }
}

export interface AuthPayload {
    userId: string,
    email: string,
    userName: string,
    role: string,
}
export interface ISignUpData {
    _id: ObjectId
    uId: string
    email: string
    username: string
    password: string,
}
