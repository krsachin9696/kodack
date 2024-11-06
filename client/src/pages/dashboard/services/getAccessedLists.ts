import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface ListItemProps {
  owner: ReactNode;
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
  const response = await axios.get(apis.list.getPublicLists, {
    params: {
      page,
      limit,
    },
    withCredentials: true,
  });
  return response;
}
