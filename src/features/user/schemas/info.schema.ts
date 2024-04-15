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
    address: Joi.array().messages({
        'array.base': 'Invalid address',
    }),
    birthday: Joi.date().max(Date.now()).messages({
        'date.base': 'Birthday should be a type of date',
        'date.max': 'Invalid birthday'
    }),
    gender: Joi.string().messages({
        'string.base': 'Gender should be a type of string',
    }),
    position: Joi.string().messages({
        'string.base': 'Position should be a type of string'
    })
});

const userSchema: ObjectSchema = Joi.object().keys({
    username: Joi.string().required().messages({
        'string.base': 'Username should be a type of string',
        'string.empty': 'Username is a required field'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password should be a type of string',
        'string.empty': 'Password is a required field'
    }),
    email: Joi.string().required().email().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email must be valid',
        'string.empty': 'Email is a required field'
    }),
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
        'string.length': 'Phone must be 10 numbers',
        'string.empty': 'Phone is a required field'
    }),
    address: Joi.array().required().messages({
        'array.empty': 'Address is a required field',
        'aray.base': 'Address should be a type of string',
    }),
    birthday: Joi.date().required().max(Date.now()).messages({
        'string.empty': 'Birthday is a required field',
        'date.base': 'Birthday should be a type of date',
        'date.max': 'Invalid birthday'
    }),
    gender: Joi.string().required().messages({
        'string.empty': 'Gender is a required field',
        'string.base': 'Gender should be a type of string',
    }),
    position: Joi.string().messages({
        'string.base': 'Position should be a type of string'
    })
});

export { basicInfoSchema, userSchema }