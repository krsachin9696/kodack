// import axios, { AxiosResponse } from 'axios';
// import apis from '../../../constants/apis';

// export interface ListDetailProps {
//     listID: string;
//     listName: string;
//     description: string;
//     tags: string[];
// }

// interface ListDetailResponse {
//     lists: ListDetailProps[];
// }

// // Fetch list details by listID
// export default async function fetchListDetail(listID: string): Promise<AxiosResponse<ListDetailResponse>> {
//     try {
//         const response = await axios.get(`${apis.list.getListDetails}${listID}`, {
//             withCredentials: true,
//         });
//         return response;
//     } catch (error) {
//         console.error("Error fetching list details:", error);
//         throw error;  // Ensure to propagate the error for proper error handling elsewhere
//     }
// }

import axios, { AxiosResponse } from 'axios';
import apis from '../../../constants/apis';

export interface ListDetailResponse {
    listID: string;
    listName: string;
    description: string;
    tags: string[];
}

export default async function fetchListDetail(listID: string): Promise<AxiosResponse<ListDetailResponse>> {
    try {
        const response = await axios.get(`${apis.list.getListDetails}${listID}`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Error fetching list details:", error);
        throw error;
    }
}
