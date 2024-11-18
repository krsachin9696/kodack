import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

// Define the response structure for a single access request
export interface AccessRequest {
    userId: string;
    userName: string;
}

// Define the response structure for the Get Access Requests API
export interface GetAccessRequestsResponse {
    listID: string;
    pendingRequests: AccessRequest[];
    approvedRequests: AccessRequest[];
}

// Function to fetch access requests for a specific list ID
export default async function getAccessRequests(
    listID: string
): Promise<AxiosResponse<GetAccessRequestsResponse>> {
    try {
        const response = await axios.get(`${apis.list.getAccessRequests}${listID}`, {
            withCredentials: true,
        });
        console.log("Access Requests Data:", response);
        return response;
    } catch (error) {
        console.error("Error fetching access requests:", error);
        throw error;
    }
}
