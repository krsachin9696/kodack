// import axios, { AxiosResponse } from 'axios';
// import apis from '../constants/apis';

// interface getUserResponseProps {
//   user: User;
// }

// export default async function getUser(): Promise<AxiosResponse<getUserResponseProps>> {
//   const response = await axios.get(apis.user.getUser, {
//     withCredentials: true,
//   });
//   return response;
// }

import axios, { AxiosResponse } from 'axios';
import apis from '../constants/apis';
interface getUserResponseProps {
  user: User;
}

export default async function getUser(): Promise<AxiosResponse<getUserResponseProps>> {
  try {
    const response = await axios.get(apis.user.getUser, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw error; // Rethrow for other errors
  }
}
