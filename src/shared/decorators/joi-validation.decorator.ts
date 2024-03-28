import { ObjectSchema } from "joi";
import { CustomError, JoiRequestValidationError } from "../utils/error-handler";
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from "express";

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value
        descriptor.value = async function (...args: [Request, Response]) {
            const req: Request = args[0]
            const res: Response = args[1]
            try {

                const { error } = await Promise.resolve(schema.validate(req.body))
                if (error?.details) throw new JoiRequestValidationError(error.details[0].message)
                return method.apply(this, args)
            }
            catch (error) {
                if (error instanceof CustomError)
                    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
            }
        }
        return descriptor
    }
}