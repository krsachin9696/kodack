import axios, { AxiosResponse } from 'axios';
import apis from '../constants/apis';

interface getUserResponseProps {
  user: User;
}

export default async function getUser(): Promise<AxiosResponse<getUserResponseProps>> {
  const response = await axios.get(apis.user.getUser, {
    withCredentials: true,
  });
  return response;
}
