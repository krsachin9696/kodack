import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface UpdateQuestionInputProps {
  done?: boolean;
  important?: boolean;
  review?: boolean;
}

export interface UpdateQuestionResponse {
  message: string;
  questionID: string;
  done: boolean;
  important: boolean;
  review: boolean; 
}

export default async function updateQuestion(
  listID: string,
  questionID: string,
  status: UpdateQuestionInputProps
): Promise<AxiosResponse<UpdateQuestionResponse>> {
  try {
    const response = await axios.patch(
      `${apis.question.updateQuestion}/${listID}/${questionID}`,
      status,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error('Error updating question status:', error);
    throw error;
  }
}
