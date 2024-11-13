import Joi from 'joi';

export const addQuestionSchema = Joi.object({
  title: Joi.string().trim().max(255).required().messages({
    'string.empty': 'Title is required.',
    'string.max': 'Title must be less than or equal to 255 characters.',
  }),
  link: Joi.string().uri().required().messages({
    'string.empty': 'Link is required.',
    'string.uri': 'Link must be a valid URL.',
  }),
  listID: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.empty': 'List ID is required.',
    'string.guid': 'List ID must be a valid UUID.',
  }),
});

export const updateQuestionStatusSchema = Joi.object({
  done: Joi.boolean().optional().messages({
    'boolean.base': 'done must be a boolean value.',
  }),
  important: Joi.boolean().optional().messages({
    'boolean.base': 'important must be a boolean value.',
  }),
  review: Joi.boolean().optional().messages({
    'boolean.base': 'review must be a boolean value.',
  }),
})
  .min(1)
  .messages({
    'object.min':
      'At least one status field (done, important, or review) must be provided.',
  });
