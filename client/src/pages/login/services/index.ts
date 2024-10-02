import axios, { AxiosResponse } from 'axios'
import apis from '../../../constants/apis'

export interface LoginDetailsProps {
  email: string
  password: string
}

export default async function __login(
  loginDetails: LoginDetailsProps
): Promise<AxiosResponse> {
  return await axios.post(apis.user.login, loginDetails)
}
