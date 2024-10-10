import {
  signupUser,
  verifyUserOtp,
  setupUserPassword,
} from './authServices.js';
import passport from 'passport';

const signup = async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;
  try {
    const result = await signupUser(
      name,
      username,
      email,
      password,
      confirmPassword,
    );
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await verifyUserOtp(email, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setupPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const result = await setupUserPassword(email, password, confirmPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

import { findUserByEmail } from './authRepository.js';

const login = async (req, res, next) => {
  const { email } = req.body;

  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred during login.' });
  }
};

const logout = (req, res) => {
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
};

export { signup, verifyOtp, setupPassword, login, logout };
