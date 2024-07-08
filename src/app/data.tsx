export const userData = [
	{
		id: 1,
		avatar: '/User1.png',
		messages: [],
		name: 'Jane Doe',
	},
	{
		id: 2,
		avatar: '/User2.png',
		name: 'John Doe',
	},
	{
		id: 3,
		avatar: '/User3.png',
		name: 'Elizabeth Smith',
	},
	{
		id: 4,
		avatar: '/User4.png',
		name: 'John Smith',
	},
]

export type UserData = (typeof userData)[number]

export const loggedInUserData = {
	id: 5,
	avatar: '/LoggedInUser.jpg',
	name: 'Jakob Hoeg',
}

export type LoggedInUserData = typeof loggedInUserData

export interface Message {
	id: string
	content: string
	attachment: string
	createdDate: string
	userId: string
	// user: User
	roomId: string
	// room: Room
}
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
export interface MessageRequest {
	content: string
	attachment: string | undefined
}

// export interface User {
// 	id: number
// 	avatar: string
// 	messages: Message[]
// 	name: string
// }
export interface UserResponse {
	username: string
	phoneNumber: string
	addressLine: string
	email: string
	verify: boolean
}
export interface RoomResponse {}
