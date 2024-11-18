import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface ListItemProps {
  owner: string;
  listID: string;
  name: string;
  tags: string[];
  access: boolean;
}

interface PublicListsResponse {
  lists: ListItemProps[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default async function fetchAccessedLists(
  page: number, 
  limit: number
): Promise<AxiosResponse<PublicListsResponse>> {
  const response = await axiosInstance.get(apis.list.getPublicLists, {
    params: {
      page,
      limit,
    },
  });
  return response;
}
