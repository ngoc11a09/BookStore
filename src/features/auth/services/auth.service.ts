import jwt from "jsonwebtoken";
import { config } from "@root/config";
import { ObjectId } from "mongodb";
import { IUserDocument } from "@root/features/user/interfaces/user.interface";
import { UserModel } from "@root/features/user/models/user.schema";

class AuthService {
    public async updatePasswordToken(userId: string | ObjectId, token: string, tokenExpiration: number): Promise<void> {
        await UserModel.updateOne(
            { _id: userId },
            {
                passwordResetExpires: tokenExpiration,
                passwordResetToken: token
            }
        )
    }

    public async updateRefreshToken(userId: string | ObjectId, refreshToken: string) {
        await UserModel.updateOne(
            { _id: userId },
            {
                refreshToken: refreshToken
            }
        )
    }

    public signToken(data: IUserDocument, userObjectId: ObjectId): { accessToken: string, refreshToken: string } {
        const accessToken = jwt.sign({
            userId: userObjectId,
            uId: data.uId,
            email: data.email,
            username: data.username,
        },
            config.JWT_ACCESS_TOKEN!,
            {
                expiresIn: "5m"
            }
        )
        const refreshToken = jwt.sign({
            userId: userObjectId,
            uId: data.uId,
            email: data.email,
            username: data.username,
        },
            config.JWT_REFRESH_TOKEN!,
            {
                expiresIn: "1h"
            }
        )
        return { accessToken, refreshToken }
    } // generate token
}

export const authService: AuthService = new AuthService();