import { AxiosResponse } from 'axios';
import apis from '../constants/apis';
import axiosInstance from './axiosInterceptor';

export interface RequestAccessProps {
  listID: string
}

interface LoginResponseProps {
  message: string;
}

export default async function requestAccessService(
  requestAccessDetails: RequestAccessProps,
): Promise<AxiosResponse<LoginResponseProps>> {
  const response = await axiosInstance.post(apis.list.requestAccess, requestAccessDetails);
  return response;
}
