import { joiValidation } from "@root/shared/decorators/joi-validation.decorator"
import HTTP_STATUS from 'http-status-codes';
import { basicInfoSchema } from "@user/schemas/info.schema"
import { Request, Response } from "express"
import { userService } from "@user/services/user.service"
import { IBasicInfo } from "@user/interfaces/user.interface";

export class Update {
    @joiValidation(basicInfoSchema)
    public async updateInfo(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id
        try {
            await userService.updateUserInfo(id, { ...req.body } as IBasicInfo)
            res.status(HTTP_STATUS.OK).json({ message: "Updated successfully" })
        } catch (error) {
            console.log(error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "An error occurred while updating user" })
        }
    }
}