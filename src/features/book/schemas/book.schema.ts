import Joi, { ObjectSchema } from "joi";

const bookSchema: ObjectSchema = Joi.object().keys({
    code: Joi.string().required().messages({
        'string.base': 'Code must be of type string',
        'string.empty': 'Code is a required field'
    }),
    title: Joi.string().required().messages({
        'string.base': 'Title must be of type string',
        'string.empty': 'Title is a required field'
    }),
    price: Joi.number().required().min(0).messages({
        'number.base': 'Price must be of type number',
        'number.min': 'Price must be greater than 0',
        'number.empty': 'Price is a required field'
    }),
    quantity: Joi.number().required().min(0).messages({
        'number.base': 'Quantity must be of type number',
        'number.min': 'Quantity must be greater than 0',
        'number.empty': 'Quantity is a required field'
    }),
    publishYear: Joi.number().required().messages({
        'number.base': 'Publish year must be of type number',
        'number.empty': 'Publish year is a required field'
    }),
    publishCode: Joi.string().required().messages({
        'string.base': 'Publish code must be of type string',
        'string.empty': 'Publish code is a required field'
    }),
    author: Joi.string().required().messages({
        'string.base': 'Author must be of type string',
        'string.empty': 'Author is a required field'
    })
})

export { bookSchema }