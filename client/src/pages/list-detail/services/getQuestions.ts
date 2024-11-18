import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface QuestionResponse {
    questionID: string;
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
        const response = await axios.get(`${apis.list.getListQuestions}${listID}`, {
            withCredentials: true,
        });
        console.log("questiondata", response)
        return response;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
}
