import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface LoginDetailsProps {
  email: string;
  password: string;
}

interface User {
  userID: string;
  name: string;
  username: string;
  email: string;
}

interface LoginResponseProps {
  message: string;
  user: User;
}

export default async function __login(
  loginDetails: LoginDetailsProps,
): Promise<AxiosResponse<LoginResponseProps>> {
  const response = await axios.post(apis.user.login, loginDetails, {
    withCredentials: true,
  });
  return response;
}
