import { ObjectSchema } from "joi";
import { JoiRequestValidationError } from "../utils/error-handler";
import { Request } from "express";

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void

export function joiValidation(schema: ObjectSchema): IJoiDecorator{
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const menthod = descriptor.value
        descriptor.value = async function (...args:any){            
            const req: Request = args[0]
            const {error} = await Promise.resolve(schema.validate(req.body))
            if (error?.details) throw new JoiRequestValidationError(error.details[0].message)
            return menthod.apply(this,args)
        }
        return descriptor
    }
}