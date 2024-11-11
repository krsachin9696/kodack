import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface RequestAccessProps {
  listID: string
}

interface LoginResponseProps {
  message: string;
}

export default async function requestAccessService(
  requestAccessDetails: RequestAccessProps,
): Promise<AxiosResponse<LoginResponseProps>> {
  const response = await axios.post(apis.list.requestAccess, requestAccessDetails, {
    withCredentials: true,
  });
  return response;
}
