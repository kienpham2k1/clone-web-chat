import { UserResponse } from "@/models/response/UserResponse"

// export const userData = [
	// {
	// 	id: 1,
	// 	avatar: '/User1.png',
	// 	messages: [],
	// 	name: 'Jane Doe',
	// },
	// {
	// 	id: 2,
	// 	avatar: '/User2.png',
	// 	name: 'John Doe',
	// },
	// {
	// 	id: 3,
	// 	avatar: '/User3.png',
	// 	name: 'Elizabeth Smith',
	// },
	// {
	// 	id: 4,
	// 	avatar: '/User4.png',
	// 	name: 'John Smith',
	// },
// ]

// export type UserData = (typeof userData)[number]

export const loggedInUserData: UserResponse = {
	id: 'ab12d22d-9a33-4d3e-87d7-f1962da5d6c9',
	username: 'kienuser',
	phoneNumber: 'string',
	addressLine: 'string',
	email: 'string',
	verify: true,
	avatar: undefined,
}

export type LoggedInUserData = typeof loggedInUserData





