import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface SendOtpProps {
  email: string;
}

interface SendOtpResponseProps {
  message: string;
}

export interface VerifyOtpProps {
  email: string;
  otp: string;
}

interface VerifyOtpResponseProps {
  message: string;
}

export interface ResetPasswordProps {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordResponseProps {
  message: string;
}

// Send OTP to email
export const __sendOtp = async (
  otpDetails: SendOtpProps
): Promise<AxiosResponse<SendOtpResponseProps>> => {
  const response = await axios.post(apis.user.forgotPassword, otpDetails, {
    withCredentials: true,
  });
  return response;
};

// Verify OTP
export const __verifyOtp = async (
  otpDetails: VerifyOtpProps
): Promise<AxiosResponse<VerifyOtpResponseProps>> => {
  const response = await axios.post(apis.user.verifyOtp, otpDetails, {
    withCredentials: true,
  });
  return response;
};

// Reset password
export const __resetPassword = async (
  passwordDetails: ResetPasswordProps
): Promise<AxiosResponse<ResetPasswordResponseProps>> => {
  const response = await axios.post(apis.user.setupPassword, passwordDetails, {
    withCredentials: true,
  });
  return response;
};
