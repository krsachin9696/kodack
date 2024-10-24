import { Router } from 'express';
import passport from 'passport';
import {
  signup,
  login,
  logout,
  verifyOtp,
  setupPassword,
  forgotPassword,
} from './authControllers.js';
import {
  signupSchema,
  loginSchema,
  otpSchema,
  passwordSetupSchema,
  forgotPasswordSchema,
} from './authSchema.js'
import validate from '../../middlewares/validationMiddleware.js';

const authRoute = Router();

authRoute.post('/signup', validate(signupSchema), signup);
authRoute.post('/login', validate(loginSchema), login);
authRoute.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword)
authRoute.post('/verify-otp', validate(otpSchema), verifyOtp);
authRoute.post('/setup-password', validate(passwordSetupSchema), setupPassword);
authRoute.post('/logout', logout);

// Google OAuth routes
authRoute.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: 'http://localhost:5173/login',
  }),
);

export default authRoute;
