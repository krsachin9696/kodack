import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface CreateListInputProps {
  name: string;
  isPublic: boolean;
  tags: string[];
  description: string;
}

interface CreateListResponseProps {
    listID: string;
    name: string;
    tags: string[];
    accessStatus: AccessStatus | null;
    isPublic?: boolean;
    owner?: string;
}

export default async function createList(
  newList: CreateListInputProps
): Promise<AxiosResponse<CreateListResponseProps>> {
  const response = await axiosInstance.post(apis.list.createList, newList);
  return response;
}
