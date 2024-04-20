import jwt from "jsonwebtoken";
import { config } from "@root/config";
import { ObjectId } from "mongodb";
import { IUserDocument } from "@root/features/user/interfaces/user.interface";
import { UserModel } from "@root/features/user/models/user.schema";
import mongoose from "mongoose";

class AuthService {
    public async updateRefreshToken(_id: ObjectId, refreshToken: string) {
        await UserModel.findByIdAndUpdate(_id,
            {
                refreshToken: refreshToken
            }
        ).exec()
    }

    public signToken(data: IUserDocument, userObjectId: ObjectId): { accessToken: string, refreshToken: string } {
        const accessToken = jwt.sign({
            _id: userObjectId,
            role: data.role,
            email: data.email,
            username: data.username,
        },
            config.JWT_ACCESS_TOKEN!,
            {
                expiresIn: config.ACCESS_TOKEN_EXPIRESIN
            }
        )
        const refreshToken = jwt.sign({
            _id: userObjectId,
            role: data.role,
            email: data.email,
            username: data.username,
        },
            config.JWT_REFRESH_TOKEN!,
            {
                expiresIn: config.REFRESH_TOKEN_EXPIRESIN
            }
        )
        return { accessToken: accessToken, refreshToken: refreshToken }
    } // generate token
}

export const authService: AuthService = new AuthService();