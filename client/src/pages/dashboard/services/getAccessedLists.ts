import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

interface AccessListsResponse {
  lists: ListItemProps[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default async function fetchAccessedLists(
  page: number, 
  limit: number
): Promise<AxiosResponse<AccessListsResponse>> {
  const response = await axiosInstance.get(apis.list.getPublicLists, {
    params: {
      page,
      limit,
    },
  });
  return response;
}
