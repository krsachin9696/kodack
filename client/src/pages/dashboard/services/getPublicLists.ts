import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface ListItemProps {
  listID: string;
  name: string;
  tags: string[];
  status: string;
}

export interface PublicListsResponse {
  lists: ListItemProps[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default async function fetchPublicLists(
  page: number,
  limit: number
): Promise<{ 
  page: number; 
  limit: number; 
  totalTags: number; 
  lists: ListItemProps[]; 
}> {
  const response: AxiosResponse<PublicListsResponse> = await axiosInstance.get(apis.list.getPublicLists, {
    params: {
      page,
      limit,
    },
  });

  const { totalPages, currentPage, totalItems, lists } = response.data;

  return {
    page: currentPage, 
    limit,
    totalTags: totalItems,
    lists,
  };
}
