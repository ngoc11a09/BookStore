import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { signInSchema } from "../schemas/signin.schema";
import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { BadRequestError, CustomError } from "@root/shared/utils/error-handler";
import { IUserDocument } from "@root/features/user/interfaces/user.interface";
import { userService } from "@user/services/user.service";
import HTTP_STATUS from 'http-status-codes';
import { ObjectId } from "mongodb";

export class SignIn {
    @joiValidation(signInSchema)
    public async read(req: Request, res: Response): Promise<void> {
        try {

            const { username, password } = req.body
            const existingUser: IUserDocument = await userService.getUserByUsername(username)

            if (!existingUser) throw new BadRequestError('Invalid credentials') //chung chi

            const passwordMatch: boolean = await existingUser.comparePassword(password)
            if (!passwordMatch) throw new BadRequestError('Invalid credentials')

            const token = authService.signToken(existingUser, existingUser._id as ObjectId)
            await authService.updateRefreshToken(existingUser._id as ObjectId, token.refreshToken)

            res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', token: token })
        } catch (error) {
            // console.log(error);
            if (error instanceof CustomError)
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
        }
    }
}