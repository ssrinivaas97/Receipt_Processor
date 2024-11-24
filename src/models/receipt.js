const Joi = require('joi');

// added validations to verify format of the receipt processed



const itemSchema = Joi.object({
    shortDescription: Joi.string()
        .pattern(/^[\s\S]+$/) // Allow all characters
        .required()
        .messages({
            'string.pattern.base': 'Item description must contain at least one character.',
            'any.required': 'Item shortDescription is required.'
        }),
    price: Joi.string()
        .pattern(/^\d+\.\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Item price must be a string in the format of a decimal number (e.g., "1.25").',
            'any.required': 'Item price is required.'
        }),
});

const receiptSchema = Joi.object({
    retailer: Joi.string()
        .pattern(/^[\w\s\-&]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Retailer name can only contain letters, numbers, spaces, dashes, and ampersands.',
            'any.required': 'Retailer name is required.'
        }),
    purchaseDate: Joi.string()
        .isoDate()
        .required()
        .messages({
            'string.isoDate': 'Purchase date must be in ISO date format (e.g., "YYYY-MM-DD").',
            'any.required': 'Purchase date is required.'
        }),
    purchaseTime: Joi.string()
        .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
        .required()
        .messages({
            'string.pattern.base': 'Purchase time must be in HH:mm format (24-hour clock).',
            'any.required': 'Purchase time is required.'
        }),
    total: Joi.string()
        .pattern(/^\d+\.\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Total must be a string in the format of a decimal number (e.g., "2.65").',
            'any.required': 'Total is required.'
        }),
    items: Joi.array()
        .items(itemSchema)
        .min(1)
        .required()
        .messages({
            'array.min': 'The receipt must have at least one item.',
            'any.required': 'Items are required.'
        }),
});

module.exports = receiptSchema;
