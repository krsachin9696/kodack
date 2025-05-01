import Joi from 'joi';

const contactUsSchemaValidation = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 2 characters long.',
    'string.max': 'Name must not exceed 50 characters.',
  }),

  email: Joi.string().trim().email().required().lowercase().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
  }),

  subject: Joi.string().trim().min(3).max(100).required().messages({
    'string.empty': 'Subject is required.',
    'string.min': 'Subject must be at least 3 characters long.',
    'string.max': 'Subject must not exceed 100 characters.',
  }),

  message: Joi.string().trim().min(10).max(500).required().messages({
    'string.empty': 'Message is required.',
    'string.min': 'Message must be at least 10 characters long.',
    'string.max': 'Message must not exceed 500 characters.',
  }),
});

export { contactUsSchemaValidation };
