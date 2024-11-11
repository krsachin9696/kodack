import crypto from 'crypto';
import {
  findUserByEmailOrUsername,
  createUser,
  findUserByEmail,
  updateUserByEmail,
} from './authRepository.js';
import sendEmail from '../../utils/sendEmail.js';
import { hashPassword } from '../../utils/hashPassword.js';

export const signupUser = async (
  name,
  username,
  email,
  password,
  confirmPassword,
) => {
  const existingUser = await findUserByEmailOrUsername(username, email);

  if (existingUser && existingUser.otpVerified) {
    throw new Error('Username or email already taken');
  }

  if (password !== confirmPassword) {
    console.log(password, confirmPassword);
    throw new Error('password & confirm password do not match.');
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  if (existingUser && !existingUser.otpVerified) {
    await updateUserByEmail(email, { otp, otpExpiresAt });

    await sendEmail(
      email,
      'Your New OTP Code',
      `Your new OTP code is ${otp}. It is valid for 15 minutes.`,
    );

    return {
      message:
        'A new OTP has been sent. Please verify your email with the OTP.',
    };
  }

  const passwordHash = await hashPassword(password);
  await createUser({ name, username, email, otp, otpExpiresAt, passwordHash });
  await sendEmail(
    email,
    'Your OTP Code',
    `Your OTP code is ${otp}. It is valid for 15 minutes.`,
  );

  return {
    message:
      'Signup successful. Please verify your email with the OTP sent to you.',
  };
};

export const forgotPasswordUser = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) {
    //not throwing error as suggested by ma'am so that information isn't revealed
    return 'Email does not exist';
  }
  if (!user) {
    //not throwing error as suggested by ma'am so that information isn't revealed
    return 'Email does not exist';
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); //need to check otp expiration

  await sendEmail(
    email,
    'Your New OTP Code',
    `Your new OTP code is ${otp}. It is valid for 15 minutes.`,
  );
  await sendEmail(
    email,
    'Your New OTP Code',
    `Your new OTP code is ${otp}. It is valid for 15 minutes.`,
  );

  await updateUserByEmail(email, { otp, otpExpiresAt });
  await updateUserByEmail(email, { otp, otpExpiresAt });

  return {
    message: 'A new OTP has been sent. Please verify your email with the OTP.',
  };
};

export const verifyUserOtp = async (email, otp) => {
  const user = await findUserByEmail(email);

  if (!user) {
    //changed the error here to not reveal user information
    throw new Error('Invalid OTP');
  }

  if (user.otp === otp && user.otpExpiresAt > new Date()) {
    await updateUserByEmail(email, {
      otpVerified: true,
      otp: null,
      otpExpiresAt: null,
    });
    return { message: 'OTP verified successfully' };
  } else {
    if (user.otp !== otp) throw new Error('Invalid OTP');
    else throw new Error('OTP expired');
  }
};

export const setupUserPassword = async (email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new Error('password & confirm password do not match.');
  }

  const user = await findUserByEmail(email);

  if (!user) {
    //changed the error here to not reveal user information
    throw new Error('password & confirm password do not match.');
  }

  if (!user.otpVerified) {
    throw new Error('Email not verified');
  }

  const passwordHash = await hashPassword(password);
  await updateUserByEmail(email, { passwordHash });

  return { message: 'Password has been set successfully' };
};
