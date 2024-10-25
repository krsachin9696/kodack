import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface CreateListInputProps {
  name: string;
  isPublic: boolean;
  tags: string[];
  description: string;
}

interface CreateListResponseProps {
  message: string;
  list: CreateListInputProps;
}

export default async function createList(
  newList: CreateListInputProps
): Promise<AxiosResponse<CreateListResponseProps>> {
  const response = await axios.post(apis.list.createList, newList, {
    withCredentials: true,
  });
  return response;
}
