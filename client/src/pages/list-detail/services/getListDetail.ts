import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface ListDetailResponse {
    listID: string;
    listName: string;
    description: string;
    tags: string[];
    isOwner: boolean;
    accessStatus: string;
}

export default async function getListDetail(listID: string): Promise<AxiosResponse<ListDetailResponse>> {
    try {
        const response = await axiosInstance.get(`${apis.list.getListDetails}${listID}`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Error fetching list details:", error);
        throw error;
    }
}
