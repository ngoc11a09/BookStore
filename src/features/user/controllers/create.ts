import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { Request, Response } from "express";
import { BadRequestError, CustomError } from "@root/shared/utils/error-handler";
import { ObjectId } from "mongodb";
import { Util } from "@root/shared/utils/util";
import HTTP_STATUS from 'http-status-codes';
import { userSchema } from "../schemas/info.schema";
import { IUserDocument } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

export class Create {
    @joiValidation(userSchema)
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { email, username } = req.body
            let isUserExist: IUserDocument = await userService.getUserByEmail(email) || await userService.getUserByUsername(username)

            if (isUserExist != null) {
                throw new BadRequestError('Username or email is in use')
            }
            const id: ObjectId = new ObjectId()

            const user: IUserDocument = Create.prototype.userData({ ...req.body }, id)

            try {
                userService.addUser(user)
                res.status(HTTP_STATUS.CREATED).json({ message: 'Add a new user successfully', user: user });
            } catch (error) {
                throw new BadRequestError('Cannot add a new user')
            }
        } catch (error) {
            if (error instanceof CustomError)
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
        }
    }

    private userData(data: IUserDocument, _id: ObjectId): IUserDocument {
        const { username, password, email, name, lastName, phone, address, gender, birthday, role } = data;
        return {
            _id: _id,
            uId: `B${Util.randomInt(6)}`,
            username,
            password,
            email,
            name: Util.firstLetterUppercase(name),
            lastName: Util.firstLetterUppercase(lastName),
            phone,
            address,
            gender,
            birthday,
            role
        } as IUserDocument
    }
}