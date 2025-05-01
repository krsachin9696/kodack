import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

// Define the request input interface
export interface GrantAccessInputProps {
  userID: string;
  listID: string;
  status: 'APPROVED' | 'REJECTED';
}

// Define the response interface
interface GrantAccessResponseProps {
  userID: string;
  listID: string;
  status: 'APPROVED' | 'REJECTED';
}

export default async function grantAccess(
  data: GrantAccessInputProps
): Promise<AxiosResponse<GrantAccessResponseProps>> {
  const response = await axiosInstance.patch(
    `${apis.list.grantAccess}`, data, { withCredentials: true }
  );
  return response;
}
