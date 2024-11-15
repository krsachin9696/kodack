import axios, { AxiosResponse } from 'axios';
import apis from '../../../../constants/apis';

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
  const response: AxiosResponse<PublicListsResponse> = await axios.get(apis.list.getPublicLists, {
    params: {
      page,
      limit,
    },
    withCredentials: true,
  });

  // console.log(response, "public list data");

  const { totalPages, currentPage, totalItems, lists } = response.data;

  // console.log({
  //   page: currentPage, 
  //   limit,
  //   totalTags: totalItems,
  //   lists,
  // }, "somethign")

  return {
    page: currentPage, 
    limit,
    totalTags: totalItems,
    lists,
  };
}
