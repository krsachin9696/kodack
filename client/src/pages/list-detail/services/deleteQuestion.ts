import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface DeleteQuestionInputProps {
    listID: string;
    questionID: string;
}

interface DeleteQuestionResponseProps {
    message: string;
    questionID: string;
}

export default async function deleteQuestion(
    listID: string,
    questionID: string
): Promise<AxiosResponse<DeleteQuestionResponseProps>> {
    return await axiosInstance.delete(`${apis.question.deleteQuestion}/${listID}/${questionID}`);
}
    