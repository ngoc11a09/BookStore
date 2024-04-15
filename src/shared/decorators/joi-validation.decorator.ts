import { ObjectSchema } from "joi";
import { CustomError, JoiRequestValidationError } from "../utils/error-handler";
import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Request, Response } from "express";

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value
        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { error } = await Promise.resolve(schema.validate(req.body))
                if (error?.details) throw new JoiRequestValidationError(error.details[0].message)
            } catch (error) {
                return next(error)
            }
            return method.call(this, req, res, next);
        }
    }
}