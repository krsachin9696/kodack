export const SERVERURL = 'http://localhost:3000';
export const APIURL = `${SERVERURL}/api/v1`;
export const LEETCODE_API = `https://alfa-leetcode-api.onrender.com`;

export default {
  baseURL:  SERVERURL,
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
  list: {
    createList: `${SERVERURL}/list`,
    getPersonalLists: `${SERVERURL}/list/personal-lists`,
    getPublicLists: `${SERVERURL}/list/public-lists`,
    getAccessedLists: `${SERVERURL}/list/accessed-lists`,
    requestAccess: `${SERVERURL}/list/request-access`,
    getListDetails: `${SERVERURL}/list/list-details/`,
    editListDetails: `${SERVERURL}/list/`,
    getListQuestions: `${SERVERURL}/list/questions/`,
    getAccessRequests: `${SERVERURL}/list/access-requests/`,
    grantAccess: `${SERVERURL}/list/grant-access`
  },
  question: {
    addQuestion: `${SERVERURL}/question/add-question`,
    updateQuestion: `${SERVERURL}/question`,
    deleteQuestion: `${SERVERURL}/question`
  },
  public: {
    contactUs: `${SERVERURL}/contact-us`,
  },
};
