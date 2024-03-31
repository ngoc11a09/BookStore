import Joi, { ObjectSchema } from "joi";

const borrowSchema: ObjectSchema = Joi.object().keys({
    userCode: Joi.string().messages({
        'string.base': 'User code must be of type string',
    }),
    adminCode: Joi.string().messages({
        'string.base': 'Admin code must be of type string',
    }),
    bookCode: Joi.string().messages({
        'string.base': 'Book code must be of type string',
    }),
    borrowedDay: Joi.date().messages({
        'date.base': 'Borrowed day must be of type date',
    }),
    returnDay: Joi.date().min(Joi.ref('borrowedDay')).messages({
        'date.base': 'Return day must be of type date',
    })
})

export { borrowSchema }