import Joi, { ObjectSchema } from "joi";

const publisherSchema: ObjectSchema = Joi.object().keys({
    code: Joi.string().messages({
        'string.base': 'Publisher code must be of type string',
    }),
    name: Joi.string().messages({
        'string.base': 'Name must be of type string'
    }),
    address: Joi.string().messages({
        'string.base': 'Address must be of type string'
    })
})

export { publisherSchema }