export const SERVERURL = 'http://localhost:3000';
export const APIURL = `${SERVERURL}/api/v1`;

export default {
  user: {
    signup: `${SERVERURL}/auth/signup`,
    login: `${SERVERURL}/auth/login`,
    verifyOtp: `${SERVERURL}/auth/verify-otp`,
    setupPassword: `${SERVERURL}/auth/setup-password`,
  }
}