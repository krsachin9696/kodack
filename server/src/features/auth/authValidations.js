import Joi from 'joi';

const signupSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required.',
  }),

  username: Joi.string().trim().required().messages({
    'string.empty': 'Username is required.',
  }),

  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
  }),

  password: Joi.string().trim().min(8).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters long.',
  }),

  confirmPassword: Joi.string()
    .trim()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'Passwords must match.',
      'string.empty': 'Confirm Password is required.',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
  }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.'
  })
})

const otpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
  }),
  otp: Joi.string().required().messages({
    'string.empty': 'OTP is required.',
  }),
});

const passwordSetupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords must match.',
    'string.empty': 'Confirm Password is required.',
  }),
});

export { signupSchema, loginSchema, otpSchema, passwordSetupSchema, forgotPasswordSchema };
