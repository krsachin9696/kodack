import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface QuestionResponse {
    questionId: string;
    title: string;
    leetcodeLink: string;
    status: {
        done: boolean;
        important: boolean;
        review: boolean;
    };
}

export interface GetQuestionsResponse {
    listID: string;
    questions: QuestionResponse[];
}

export default async function getQuestions(listID: string): Promise<AxiosResponse<GetQuestionsResponse>> {
    try {
        const response = await axiosInstance.get(`${apis.list.getListQuestions}${listID}`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
}
