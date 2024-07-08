import { MessageResponse } from "@/app/data";
import axios from 'axios';
const token: string =
  'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraWVudXNlciIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzIwNDI0NjEwLCJleHAiOjE3MjA1MTEwMTB9.IYuPaJ4dWwEIKlPsVkW11Db9xBUqvzs--AYY51cu1XgnQ6ZXwsy7FUwHXCUqkMz4'
interface PageMessage {
  content: MessageResponse
}
const fetchMessage = async (roomId: string): Promise<PageMessage> => {
  const url = `http://localhost:8080/api/v1/message/getMessage/${roomId}`;

  try {
    const response = await axios.get<PageMessage>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};
export default fetchMessage;