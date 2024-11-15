import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface EditListInputProps {
  name: string;
  description: string;
  tags: string[];
}

interface EditListResponseProps {
  message: string;
  list: EditListInputProps;
}

export default async function editListDetails(
  data: EditListInputProps,
  listID: string
): Promise<AxiosResponse<EditListResponseProps>> {
  return await axios.put(`${apis.list.editListDetails}${listID}`, data, {
    withCredentials: true,
  });
}
