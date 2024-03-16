import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import HTTP_STATUS from 'http-status-codes';
import { IAuthDocument, ISignUpData } from "@auth/interfaces/auth.interface";
import { authService } from "@auth/services/auth.service";
import { BadRequestError } from "@root/shared/utils/error-handler";
import { Util } from "@root/shared/utils/util";
import jwt from "jsonwebtoken";
import { config } from '@root/config';
import { IUserDocument } from "@user/interfaces/user.interface";
import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { signUpSchema } from "../schemas/signup.schema";
import { userService } from "@root/features/user/services/user.service";

export class SignUp {
    @joiValidation(signUpSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { username, password, email } = req.body
        const isUserExist: IUserDocument = await userService.getUserByUsernameEmail(username, email)
        if (isUserExist) {
            throw new BadRequestError('Invalid credentials') //chung chi
        }
        const userObjectId: ObjectId = new ObjectId()
        const uId = `${Util.randomInt(10)}`

        const user: IUserDocument = SignUp.prototype.userData({ ...req.body, uId }, userObjectId)
        const userJwt: string = authService.signToken({ username, password, email } as ISignUpData, userObjectId).accessToken
        // console.log(user);

        userService.addUserData(user)
        res.status(HTTP_STATUS.CREATED).json({ message: 'User registered successfully', user: user, accessToken: userJwt });
    }

    private userData(data: ISignUpData, userObjectId: ObjectId): IUserDocument {
        const { username, email, password, uId } = data
        return {
            _id: userObjectId,
            uId,
            username,
            email: Util.lowerCase(email),
            password,
        } as IUserDocument
    } // init user's data
}