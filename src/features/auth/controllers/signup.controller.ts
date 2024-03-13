import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import HTTP_STATUS from 'http-status-codes';
import { IAuthDocument, ISignUpData } from "@auth/interfaces/auth.interface";
import { authService } from "@auth/services/auth.service";
import { BadRequestError } from "@root/shared/utils/error-handler";
import { Util } from "@root/shared/utils/util";
import  jwt from "jsonwebtoken";
import { config } from '@root/config';
import { IUserDocument } from "@user/interfaces/user.interface";
import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { signUpSchema } from "../schemas/signup.schema";

export class SignUp {
    @joiValidation(signUpSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { username, password, email} = req.body
        const isUserExist: IAuthDocument = await authService.getUserByUsernameEmail(username,email)
        if (isUserExist) {
            throw new BadRequestError('Invalid credentials')
        }
        const authObjectId: ObjectId = new ObjectId()
        const userObjectId: ObjectId = new ObjectId()
        const uId = `${Util.randomInt(10)}`

        const authData: IAuthDocument = SignUp.prototype.signUpData({
            _id: authObjectId,
            uId,
            username,
            email,
            password,
          });
        authService.createAuthUser(authData)
        const userJwt: string = SignUp.prototype.signToken(authData, userObjectId)
        const user: IUserDocument = SignUp.prototype.userData(authData,userObjectId)
        res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', user: user, token: userJwt });
    }

    private signUpData(data: ISignUpData): IAuthDocument {
        const { _id, username, email, uId, password } = data;
        return {
          _id,
          uId,
          username,
          email: Util.lowerCase(email),
          password,
        } as IAuthDocument;
    }

    private signToken(data: IAuthDocument, userObjectId: ObjectId): string {
        return jwt.sign({
            userId: userObjectId,
            uId: data.uId,
            email: data.email,
            username: data.username,
        },
        config.JWT_TOKEN!
        )
    }

    private userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
        const { _id, username, email, password, uId } = data
        return {
            _id: userObjectId,
            authId: _id,
            uId,
            username,
            email,
            password,
            location: '',
            borrowed: 0
        } as IUserDocument
    }
}