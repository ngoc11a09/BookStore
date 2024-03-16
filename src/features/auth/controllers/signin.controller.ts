import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { signInSchema } from "../schemas/signin.schema";
import { Request, Response } from "express";
import { IAuthDocument } from "../interfaces/auth.interface";
import { authService } from "../services/auth.service";
import { BadRequestError } from "@root/shared/utils/error-handler";
import { IUserDocument } from "@root/features/user/interfaces/user.interface";
import { userService } from "@root/features/user/services/user.service";
import HTTP_STATUS from 'http-status-codes';
import { ObjectId } from "mongodb";

export class SignIn {
    @joiValidation(signInSchema)
    public async read(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body
        const existingUser: IAuthDocument = await authService.getAuthUserByUsername(username)
        // console.log(existingUser);

        if (!existingUser) throw new BadRequestError('Invalid credentials') //chung chi

        const passwordMatch: boolean = await existingUser.comparePassword(password)
        if (!passwordMatch) throw new BadRequestError('Invalid credentials')

        const user: IUserDocument = await userService.getUserByAuthId(`${existingUser._id}`)
        console.log('user ', user);

        const token = authService.signToken(existingUser, user._id as ObjectId)
        authService.updateRefreshToken(req.body, token.refreshToken)

        const userDocument: IUserDocument = {
            ...user,
            authId: existingUser!._id,
            username: existingUser!.username,
            email: existingUser!.email,
            uId: existingUser!.uId,
            createdAt: existingUser!.createdAt,
            updatedAt: existingUser!.updatedAt,
            refreshToken: existingUser!.refreshToken
        } as IUserDocument
        res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', userDocument, token: token })
    }
}