import Joi, { ObjectSchema } from "joi";

const basicInfoSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().messages({
        'string.base': 'Name should be a type of string',
        'string.empty': 'Name is a required field'
    }),
    lastName: Joi.string().required().messages({
        'string.base': 'Lastname should be a type of string',
        'string.empty': 'Lastname is a required field'
    }),
    phone: Joi.string().required().length(10).messages({
        'string.base': 'Phone should be a type of string',
        'string.empty': 'Phone is a required field',
        'string.length': 'Phone must be 10 numbers'
    }),
    address: Joi.string().required().messages({
        'string.base': 'Address should be a type of string',
        'string.empty': 'Address is a required field'
    }),
    birthday: Joi.date().required().max(Date.now()).messages({
        'date.base': 'Birthday should be a type of date',
        'date.empty': 'Birthday is a required field',
        'date.max': 'Invalid birthday'
    }),
    gender: Joi.string().required().messages({
        'string.empty': 'Name is a required field'
    }),
});

export { basicInfoSchema }