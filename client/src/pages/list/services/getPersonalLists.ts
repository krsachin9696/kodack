import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

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
  const response = await axios.get(apis.list.getPersonalLists, {
    params: {
      page,
      limit,
    },
    withCredentials: true,
  });
  return response;
}
