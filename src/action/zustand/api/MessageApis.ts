import { MessageResponse } from "@/app/data";
import axiosInstance from '@/config/axiosConfig';
import { Page } from "@/models/Page";
import { AxiosResponse } from "axios";

export const MessageApis = {
  getMessageByRoomId: (roomId: string): Promise<Page<MessageResponse>> =>
    axiosInstance.get<Page<MessageResponse>>(`/message/getMessage/${roomId}`)
      .then(response => response.data)
      .catch(error => {

        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
      }),
};