import { MessageResponse } from "./MessageResponse"
import { UserResponse } from "./UserResponse"

export interface RoomResponse {
    id: string
    createdDate: Date
    user: UserResponse
    messages: MessageResponse[]
}