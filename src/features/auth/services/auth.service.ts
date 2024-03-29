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
            userId: userObjectId,
            role: data.role,
            email: data.email,
            username: data.username,
        },
            config.JWT_ACCESS_TOKEN!,
            {
                expiresIn: "1h"
            }
        )
        const refreshToken = jwt.sign({
            userId: userObjectId,
            role: data.role,
            email: data.email,
            username: data.username,
        },
            config.JWT_REFRESH_TOKEN!,
            {
                expiresIn: "24h"
            }
        )
        return { accessToken: accessToken, refreshToken: refreshToken }
    } // generate token
}

export const authService: AuthService = new AuthService();