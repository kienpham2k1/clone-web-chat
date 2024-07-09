import { PageableProp } from '../../models/request/PageableRequest';
import axiosInstance from '@/config/axiosConfig';
import { Page } from "@/models/Page";
import { RoomResponse } from '@/models/response/RoomResponse';

export const RoomChatApis = {
  getRoomChats: (pageable?: PageableProp): Promise<Page<RoomResponse>> => {
    let params = {};
    if (pageable) {
      params = {
        pageNo: pageable.pageNo.toString(),
        pageSize: pageable.pageSize.toString(),
        sortDirection: pageable.sortDirection,
        sortBy: pageable.sortBy,
      };
    }

    return axiosInstance.get<Page<RoomResponse>>('/roomChat/gets', { params })
      .then(response => response.data)
      .catch((error: any) => {
        console.error('Error fetching room chats:', error);
        throw new Error('Failed to fetch room chats');
      });
  },
};