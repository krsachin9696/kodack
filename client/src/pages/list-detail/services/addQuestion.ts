import axios, {AxiosResponse} from 'axios';
import apis from '../../../constants/apis';

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
  return await axios.post(apis.question.addQuestion, data, {
    withCredentials: true,
  });
}
