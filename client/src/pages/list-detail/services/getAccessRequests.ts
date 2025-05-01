import { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';
import axiosInstance from '../../../services/axiosInterceptor';

export interface AccessRequest {
    userId: string;
    userName: string;
}

export interface GetAccessRequestsResponse {
    listID: string;
    pendingRequests: AccessRequest[];
    approved: AccessRequest[];
}

// Function to fetch access requests for a specific list ID
export default async function getAccessRequests(
    listID: string
): Promise<AxiosResponse<GetAccessRequestsResponse>> {
    try {
        const response = await axiosInstance.get(`${apis.list.getAccessRequests}${listID}`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Error fetching access requests:", error);
        throw error;
    }
}
