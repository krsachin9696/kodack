import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface PublicListsResponse {
  lists: ListItemProps[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default async function fetchPublicLists(
  page: number,
  limit: number
): Promise<AxiosResponse<PublicListsResponse>> {
  const response: AxiosResponse<PublicListsResponse> = await axiosInstance.get(apis.list.getPublicLists, {
    params: {
      page,
      limit,
    },
  });

  return response;
}
