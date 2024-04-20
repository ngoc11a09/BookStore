import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import HTTP_STATUS from 'http-status-codes';
import { authService } from "@auth/services/auth.service";
import { BadRequestError, CustomError } from "@root/shared/utils/error-handler";
import { Util } from "@root/shared/utils/util";
import { IUserDocument } from "@user/interfaces/user.interface";
import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { signUpSchema } from "../schemas/signup.schema";
import { userService } from "@user/services/user.service";
import { ISignUpData } from "../interfaces/auth.interface";

export class SignUp {
    @joiValidation(signUpSchema)
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { username, password, email, role } = req.body
            const isUserExist: IUserDocument = await userService.getUserByUsernameEmail(username, email)
            if (isUserExist) {
                throw new BadRequestError('Username or email existed')
            }
            const userObjectId: ObjectId = new ObjectId()
            const uId = `${Util.randomInt(10)}`

            const user: IUserDocument = SignUp.prototype.userData({ ...req.body, uId }, userObjectId)
            const userJwt: string = authService.signToken({ username, password, email, role } as IUserDocument, userObjectId).accessToken

            await userService.addUser(user)
            res.status(HTTP_STATUS.CREATED).json({ message: 'User registered successfully', user: SignUp.prototype.removePass(user), accessToken: userJwt });
        } catch (error) {
            console.log(error);

            if (error instanceof CustomError)
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
        }
    }

    private removePass(user: IUserDocument): any {
        const { password, ...res } = user
        return { ...res }
    }

    private userData(data: ISignUpData, userObjectId: ObjectId): IUserDocument {
        const { username, email, password, uId, role } = data
        return {
            _id: userObjectId,
            uId,
            username,
            email: Util.lowerCase(email),
            password,
            role: role ? role : 'user'
        } as IUserDocument
    } // init user's data
}