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

export const requestAccessSchema = Joi.object({
  listID: Joi.string().trim().max(200).required().messages({
    'string.empty': 'List ID is required.',
    'strinf.max': 'List ID must be less than or equal to 200 characters.',
  }),
});

export const grantAccessSchema = Joi.object({
  userID: Joi.string().trim().max(200).required().messages({
    'string.empty': 'User ID is required.',
    'strinf.max': 'USer ID must be less than or equal to 200 characters.',
  }),
  listID: Joi.string().trim().max(200).required().messages({
    'string.empty': 'List ID is required.',
    'strinf.max': 'List ID must be less than or equal to 200 characters.',
  }),
});
