export const SERVERURL = 'http://localhost:3000';
export const APIURL = `${SERVERURL}/api/v1`;
export const LEETCODE_API = `https://alfa-leetcode-api.onrender.com`;

export default {
  user: {
    signup: `${SERVERURL}/auth/signup`,
    login: `${SERVERURL}/auth/login`,
    forgotPassword: `${SERVERURL}/auth/forgot-password`,
    ResendOtp: `${SERVERURL}/auth/resend-otp`,
    verifyOtp: `${SERVERURL}/auth/verify-otp`,
    setupPassword: `${SERVERURL}/auth/setup-password`,
    logout: `${SERVERURL}/auth/logout`,
    getUser: `${SERVERURL}/user`,
  },
  public: {
    contactUs: `${SERVERURL}/contact-us`,
  }
};
