import {AxiosResponse} from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface AddQuestionInputProps {
  listID: string;
  title: string;
  link: string;
}

interface AddQuestionResponseProps {
  message: string;
  questionId: string;
  question: AddQuestionInputProps;
}

export default async function addQuestion(
  data: AddQuestionInputProps
): Promise<AxiosResponse<AddQuestionResponseProps>> {
  return await axiosInstance.post(apis.question.addQuestion, data, {
    withCredentials: true,
  });
}
