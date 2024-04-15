import Joi, { ObjectSchema } from "joi";

const borrowSchema: ObjectSchema = Joi.object().keys({
    code: Joi.string().messages({
        'string.base': 'Borrow code must be of type string',
    }),
    userCode: Joi.string().messages({
        'string.base': 'User code must be of type string',
    }),
    bookCode: Joi.string().messages({
        'string.base': 'Book code must be of type string',
    }),
    borrowedDate: Joi.date().messages({
        'date.base': 'Borrowed date must be of type date',
    }),
    returnDate: Joi.date().min(Joi.ref('borrowedDate')).messages({
        'date.base': 'Return date must be of type date',
        'date.min': 'Return date must be equal or later than borrowed date'
    })
})

export { borrowSchema }