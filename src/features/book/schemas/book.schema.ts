import Joi, { ObjectSchema } from "joi";

const bookSchema: ObjectSchema = Joi.object().keys({
    code: Joi.string().messages({
        'string.base': 'Code must be of type string',
    }),
    title: Joi.string().messages({
        'string.base': 'Title must be of type string',
    }),
    price: Joi.number().min(0).messages({
        'number.base': 'Price must be of type number',
        'number.min': 'Price must be greater than 0',
    }),
    quantity: Joi.number().min(0).messages({
        'number.base': 'Quantity must be of type number',
        'number.min': 'Quantity must be greater than 0',
    }),
    publishYear: Joi.number().messages({
        'number.base': 'Publish year must be of type number',
    }),
    publishCode: Joi.string().messages({
        'string.base': 'Publish code must be of type string',
    }),
    author: Joi.string().messages({
        'string.base': 'Author must be of type string',
    })
})

export { bookSchema }