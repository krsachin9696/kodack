import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInterceptor';

async function fetchLists(
  endpoint: string,
  page: number,
  limit: number,
): Promise<AxiosResponse<GetListResponseProps>> {
  const response = await axiosInstance.get(
    endpoint,
    {
      params: {
        page,
        limit,
      },
    },
  );
  return response;
}

export default fetchLists;
