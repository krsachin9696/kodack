
import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface SignupDetailsProps {
  name: string;
  email: string;
  username: string;
}

interface User {
  userID: string;
  name: string;
  username: string;
  email: string;
}

interface SignupResponseProps {
  message: string;
  user: User;
}

export default async function __signup(
  signupDetails: SignupDetailsProps,
): Promise<AxiosResponse<SignupResponseProps>> {
  const response = await axios.post(apis.user.signup, signupDetails, { withCredentials: true });
  return response;
}
