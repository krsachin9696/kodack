import { Router } from 'express';
import passport from 'passport';
import {
  signup,
  login,
  logout,
  verifyOtp,
  setupPassword,
} from './authControllers.js';

const authRoute = Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.post('/verify-otp', verifyOtp);
authRoute.post('/setup-password', setupPassword);
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
