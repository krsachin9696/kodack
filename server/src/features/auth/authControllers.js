import {
  signupUser,
  verifyUserOtp,
  setupUserPassword,
} from './authServices.js';
import passport from 'passport';

const signup = async (req, res) => {
  const { name, username, email } = req.body;
  try {
    const result = await signupUser(name, username, email);
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

const login = (req, res, next) => {
  console.log('login request', req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred during login.' });
    }
    if (!user) {
      console.log(info.message, 'user exist hi nhi krta');
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
