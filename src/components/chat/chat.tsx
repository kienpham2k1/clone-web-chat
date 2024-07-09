import { UserData } from '@/app/data'
import ChatTopbar from './chat-topbar'
import { ChatList } from './chat-list'
import React, { useEffect, useState } from 'react'
import { Client, IFrame, IMessage } from '@stomp/stompjs'
import connectStompClient from '../../utils/stompClient'
import { MessageApis } from '@/action/zustand/api/MessageApis'
import { Page } from '@/models/Page'
import { MessageResponse } from '@/models/response/MessageResponse'
import { MessageRequest } from '@/models/request/MessageRequest'
import { UserResponse } from '@/models/response/UserResponse'
import { RoomResponse } from '@/models/response/RoomResponse'

interface ChatProps {
	selectedUser: UserData
	isMobile: boolean
	selectedRoomChat?: RoomResponse
}
const roomId: string =
	process.env.ROOM_CHAT_ID || 'ab12d22d-9a33-4d3e-87d7-f1962da5d6c9'

export function Chat({
	selectedUser,
	isMobile,
	selectedRoomChat,
}: // setSelectedRoomChat,
ChatProps) {
	const [messagesState, setMessages] = React.useState<MessageResponse[]>([])
	const [client, setClient] = useState<Client | null>(null)
	useEffect(() => {
		fetchMessages()
	}, [selectedRoomChat])
	useEffect(() => {
		const onConnect = (client: Client) => {
			client.subscribe(`/topic/${selectedRoomChat?.id}`, (message: IMessage) => {
				console.log('Received message:', message.body)
				try {
					const parsedMessage = JSON.parse(
						message.body
					) as MessageResponse
					setMessages((prevMessages) => [
						...prevMessages,
						parsedMessage,
					])
				} catch (error) {
					console.error('Error parsing message:', error)
				}
			})
			setClient(client)
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
	}, [selectedRoomChat])

	const sendMessage = (newMessage: MessageRequest) => {
		const destination = `/app/${selectedRoomChat?.id}/sendMessage`
		try {
			client?.publish({
				destination,
				body: JSON.stringify(newMessage),
			})
		} catch (error) {
			console.error('fail to send message' + error)
		}
	}

	const fetchMessages = async () => {
		if (selectedRoomChat) {
			var messagePage: Page<MessageResponse> =
				await MessageApis.getMessageByRoomId(selectedRoomChat.id)
			setMessages(messagePage.content)
		}
	}
	return (
		<div className="flex flex-col justify-between w-full h-full">
			<ChatTopbar
				roomChat={selectedRoomChat}
				selectedUser={selectedUser}
			/>

			<ChatList
				messages={messagesState}
				selectedUser={selectedUser}
				sendMessage={sendMessage}
				isMobile={isMobile}
			/>
		</div>
	)
}
