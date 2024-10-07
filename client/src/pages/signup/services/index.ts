import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface SignupDetailsProps {
  name: string;
  email: string;
  username: string;
}

interface SignupResponseProps {
  message: string;
  user: User;
}

export default async function __signup(
  signupDetails: SignupDetailsProps,
): Promise<AxiosResponse<SignupResponseProps>> {
  const response = await axios.post(apis.user.signup, signupDetails, {
    withCredentials: true,
  });
  return response;
}

// Interface for OTP verification response
interface OTPInfoProp {
  email: string;
  otp: string;
}

interface OTPVerificationResponse {
  message: string;
  verified: boolean;
}

// Interface for Password setup response

interface PasswordDetailsProps {
  email: string;
  password: string;
  confirmPassword: string;
}
interface PasswordSetupResponse {
  message: string;
  success: boolean;
}

// Function to verify OTP
export async function verifyOTP(
  otpInfo: OTPInfoProp,
): Promise<AxiosResponse<OTPVerificationResponse>> {
  const response = await axios.post(apis.user.verifyOtp, otpInfo, {
    withCredentials: true,
  });
  return response;
}

// Function to set up a password after OTP verification
export async function setupPassword(
  passwordDetails: PasswordDetailsProps,
): Promise<AxiosResponse<PasswordSetupResponse>> {
  const response = await axios.post(apis.user.setupPassword, passwordDetails, {
    withCredentials: true,
  });
  return response;
}
