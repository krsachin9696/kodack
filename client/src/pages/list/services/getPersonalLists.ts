import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface ListItemProps {
  listID: string;
  name: string;
  tags: string[];
  isPublic: boolean;
  status: string;
}

interface PersonalListsResponse {
  lists: ListItemProps[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default async function fetchPersonalLists(
  page: number, 
  limit: number
): Promise<AxiosResponse<PersonalListsResponse>> {
  const response = await axiosInstance.get(apis.list.getPersonalLists, {
    params: {
      page,
      limit,
    },
  });
  return response;
}
