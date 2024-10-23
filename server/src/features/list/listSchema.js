import Joi from 'joi';

const listSchemaValidation = Joi.object({
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

export { listSchemaValidation };
