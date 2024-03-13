import { joiValidation } from "@root/shared/decorators/joi-validation.decorator";
import { signInSchema } from "../schemas/signin.schema";
import { Request, Response } from "express";
import { IAuthDocument } from "../interfaces/auth.interface";
import { authService } from "../services/auth.service";
import { BadRequestError } from "@root/shared/utils/error-handler";

export class SignIn {
    @joiValidation(signInSchema)
    public async read(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body
        const isUserExist: IAuthDocument = await authService.getAuthUserByUsername(username)
        if (!isUserExist) throw new BadRequestError('Invalid credentials')
    }
}