import {
  signupUser,
  verifyUserOtp,
  setupUserPassword,
  forgotPasswordUser,
} from './authServices.js';
import passport from 'passport';
import asyncHandler from '../../utils/asyncHandler.js';
import { findUserByEmail } from './authRepository.js';

const signup = asyncHandler(async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;
  const result = await signupUser(
    name,
    username,
    email,
    password,
    confirmPassword
  );
  res.status(201).json(result);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await forgotPasswordUser(email);
  res.status(200).json(result);
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const result = await verifyUserOtp(email, otp);
  res.status(200).json(result);
});

const setupPassword = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const result = await setupUserPassword(email, password, confirmPassword);
  res.status(200).json(result);
});

const login = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Fetch the user to check OTP verification
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'User not found.' });
  }

  // Check if the OTP is verified
  if (!user.otpVerified) {
    return res
      .status(403)
      .json({ error: 'Email not verified. Please signup again!' });
  }

  // Proceed with passport authentication if OTP is verified
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'An error occurred during login.' });
    }
    if (!user) {
      return res.status(401).json({ error: info.message || 'Login failed.' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed.' });
      }

      const { userID, name, username, email } = user;
      return res.status(200).json({
        message: 'Login successful',
        user: { userID, name, username, email },
      });
    });
  })(req, res, next);
});

const logout = asyncHandler(async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed.' });
    }
    res.clearCookie('connect.sid', { path: '/' });
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed.' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  });
});

export { signup, verifyOtp, setupPassword, login, logout, forgotPassword };
