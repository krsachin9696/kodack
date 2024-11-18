import axios from 'axios';
import apis from '../../../constants/apis';

export interface AddQuestionInputProps {
  listID: string;
  title: string;
  link: string;
}

interface AddQuestionResponseProps {
  message: string;
  questionID: string;
  question: AddQuestionInputProps;
}

export default async function addQuestion(
  data: AddQuestionInputProps
): Promise<AddQuestionInputProps> {
  const response = await axios.post<AddQuestionResponseProps>(apis.question.addQuestion, data, {
    withCredentials: true,
  });
  return response.data.question;
}
