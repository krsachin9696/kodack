import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface ContactUsDetailsProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactUsResponseProps {
  message: string;
}

export default async function __contactUs(
  contactUsDetails: ContactUsDetailsProps,
): Promise<AxiosResponse<ContactUsResponseProps>> {
  const response = await axios.post(apis.public.contactUs, contactUsDetails, {
    withCredentials: true,
  });
  return response;
}
