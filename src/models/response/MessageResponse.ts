import { RoomResponse } from "./RoomResponse"
import { UserResponse } from "./UserResponse"

export interface MessageResponse {
	id: string
	content: string
	attachment: string
	createdDate: Date
	userId: string
	user: UserResponse
	roomId: string
	room: RoomResponse
}
