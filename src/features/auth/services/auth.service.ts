import { IAuthDocument, ISignUpData } from "@auth/interfaces/auth.interface";
import { AuthModel } from "@auth/models/auth.schema";
import { Util } from "@root/shared/utils/util";
import jwt from "jsonwebtoken";
import { config } from "@root/config";
import { ObjectId } from "mongodb";

class AuthService {
    public async createAuthUser(data: IAuthDocument): Promise<void> {
        await AuthModel.create(data)
    }

    public async updatePasswordToken(authId: string, token: string, tokenExpiration: number): Promise<void> {
        await AuthModel.updateOne(
            { _id: authId },
            {
                passwordResetExpires: tokenExpiration,
                passwordResetToken: token
            }
        )
    }

    public async getUserByUsernameEmail(username: string, email: string): Promise<IAuthDocument> {
        const query = {
            $or: [{ username: username }, { email: Util.lowerCase(email) }]
        }
        const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument
        return user
    }

    public async getAuthUserByUsername(username: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({ username: username }).exec()) as IAuthDocument
        return user
    }

    public async getAuthUserByEmail(email: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({ email: Util.lowerCase(email) }).exec()) as IAuthDocument
        return user
    }

    public async getAuthUserByPasswordToken(token: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        }).exec()) as IAuthDocument;
        return user;
    }

    public async updateRefreshToken(authId: string, refreshToken: string) {
        await AuthModel.updateOne(
            { _id: authId },
            {
                refreshToken: refreshToken
            }
        )
    }

    public signToken(data: ISignUpData, userObjectId: ObjectId): { accessToken: string, refreshToken: string } {
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