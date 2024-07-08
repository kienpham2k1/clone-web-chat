import {
	loggedInUserData,
	Message,
	MessageRequest,
	MessageResponse,
	RoomResponse,
	UserData,
	UserResponse,
} from '@/app/data'
import ChatTopbar from './chat-topbar'
import { ChatList } from './chat-list'
import React, { useEffect, useState } from 'react'
import { Client, IFrame, IMessage } from '@stomp/stompjs'
import connectStompClient from '../../utils/stompClient'

interface ChatProps {
	messages?: MessageResponse[]
	selectedUser: UserData
	isMobile: boolean
}
const roomId: string =
	process.env.ROOM_CHAT_ID || 'ab12d22d-9a33-4d3e-87d7-f1962da5d6c9'

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
	const [messagesState, setMessages] = React.useState<MessageResponse[]>(
		messages ?? []
	)
	const [client, setClient] = useState<Client | null>(null)
	useEffect(() => {
		connectToServer()
	}, [])
	const connectToServer = () => {
		const onConnect = (client: Client) => {
			client.subscribe(`/topic/${roomId}`, (message: IMessage) => {
				console.log('Received message:', message.body)
				try {
					const parsedMessage = JSON.parse(
						message.body
					) as MessageServer

					// const modifiedMessage: Message = {
					// 	...parsedMessage,
					// 	id: messagesState.length + 1,
					// 	message: parsedMessage.content,
					// 	name:
					// 		parsedMessage.sender === 'Jakob Hoeg'
					// 			? loggedInUserData.name
					// 			: 'Jane Doe',
					// 	avatar:
					// 		parsedMessage.sender === 'Jakob Hoeg'
					// 			? loggedInUserData.avatar
					// 			: '/User1.png',
					// }

					// setMessages((prevMessages) => [
					// 	...prevMessages,
					// 	modifiedMessage,
					// ])
				} catch (error) {
					console.error('Error parsing message:', error)
				}
			})
			setClient(client) // Save the client instance
		}

		const onError = (error: IFrame) => {
			console.error('STOMP error:', error)
		}

		const stompClient = connectStompClient({
			onConnectCallback: onConnect,
			onErrorCallback: onError,
		})

		return () => {
			if (stompClient) {
				stompClient.deactivate()
			}
		}
	}

	const sendMessage = (newMessage: MessageRequest) => {
		console.log(newMessage)
		const user: UserResponse = {
			username: 'string',
			phoneNumber: 'string',
			addressLine: 'string',
			email: 'string',
			verify: true,
		}
		const room: RoomResponse = {}
		let messageRP: MessageResponse = {
			id: '1',
			content: newMessage.content,
			attachment: newMessage.content,
			createdDate: new Date(),
			userId: 'string',
			user: user,
			roomId: 'string',
			room: room,
		}
		setMessages([...messagesState, messageRP])
		// const destination = `/app/${roomId}/sendMessage`
		// try {
		// 	if (!client) connectToServer()
		// 	client?.publish({
		// 		destination,
		// 		body: JSON.stringify(newMessage),
		// 	})
		// } catch (error) {
		// 	console.error('fail to send message' + error)
		// }
	}

	return (
		<div className="flex flex-col justify-between w-full h-full">
			<ChatTopbar selectedUser={selectedUser} />

			<ChatList
				messages={messagesState}
				selectedUser={selectedUser}
				sendMessage={sendMessage}
				isMobile={isMobile}
			/>
		</div>
	)
}
interface MessageServer {
	content: string
	sender: string
	type: string
}
