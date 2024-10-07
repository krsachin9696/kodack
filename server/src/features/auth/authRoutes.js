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

// authRoute.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: 'http://localhost:5173/', // Change this to where you want to redirect after success
//     failureRedirect: 'http://localhost:5173/login', // Redirect to login page on failure
//   }),
// );

authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/login',
  }),
  async (req, res) => {
    const user = req.user; // This will have user information from Google
    console.log(user, 'user');

    const userData = {
      userID: user.userID, // Assuming `id` is the user's Google ID
      name: user.name,
      username: user.email,
      email: user.email,
    };

    res.json({
      message: 'Login Successful',
      user: userData, // Return the user data
    });
  },
);

export default authRoute;
