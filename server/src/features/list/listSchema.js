import Joi from 'joi';

export const createListSchema = Joi.object({
  name: Joi.string().trim().max(150).required().messages({
    'string.empty': 'List name is required.',
    'string.max': 'List name must be less than or equal to 150 characters.',
  }),
  description: Joi.string().trim().max(450).messages({
    'string.max': 'Description must be less than or equal to 450 characters.',
  }),
  isPublic: Joi.boolean().required().messages({
    'boolean.base': 'isPublic must be a boolean value.',
  }),
  isDeleted: Joi.boolean().default(false).messages({
    'boolean.base': 'isDeleted must be a boolean value.',
  }),
  tags: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Tags must be an array of strings.',
  }),
});

export const updateListSchema = Joi.object({
  name: Joi.string().trim().max(150).optional().messages({
    'string.max': 'List name must be less than or equal to 150 characters.',
  }),
  description: Joi.string().trim().max(450).optional().messages({
    'string.max': 'Description must be less than or equal to 450 characters.',
  }),
  isPublic: Joi.boolean().optional().messages({
    'boolean.base': 'isPublic must be a boolean value.',
  }),
  tags: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Tags must be an array of strings.',
  }),
});

export const requestAccessSchema = Joi.object({
  listID: Joi.string().trim().max(200).required().messages({
    'string.empty': 'List ID is required.',
    'string.max': 'List ID must be less than or equal to 200 characters.',
  }),
});

export const grantAccessSchema = Joi.object({
  userID: Joi.string().trim().max(200).required().messages({
    'string.empty': 'User ID is required.',
    'string.max': 'User ID must be less than or equal to 200 characters.',
  }),
  listID: Joi.string().trim().max(200).required().messages({
    'string.empty': 'List ID is required.',
    'string.max': 'List ID must be less than or equal to 200 characters.',
  }),
  status: Joi.string()
    .trim()
    .valid('PENDING', 'APPROVED', 'REJECTED')
    .required()
    .uppercase()
    .messages({
      'string.empty': 'Status is required.',
      'any.only': 'Status must be one of PENDING, APPROVED, or REJECTED.',
    }),
});
