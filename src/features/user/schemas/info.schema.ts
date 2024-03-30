import Joi, { ObjectSchema } from "joi";

const basicInfoSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().messages({
        'string.base': 'Name should be a type of string',
    }),
    lastName: Joi.string().messages({
        'string.base': 'Lastname should be a type of string',
    }),
    phone: Joi.string().length(10).messages({
        'string.base': 'Phone should be a type of string',
        'string.length': 'Phone must be 10 numbers'
    }),
    address: Joi.string().messages({
        'string.base': 'Address should be a type of string',
    }),
    birthday: Joi.date().max(Date.now()).messages({
        'date.base': 'Birthday should be a type of date',
        'date.max': 'Invalid birthday'
    }),
    gender: Joi.string().messages({
        'string.base': 'Gender should be a type of string',
    }),
    role: Joi.string().messages({
        'string.base': 'Role should be a type of string',
    })
});

export { basicInfoSchema }