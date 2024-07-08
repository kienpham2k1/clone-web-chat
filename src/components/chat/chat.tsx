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
import fetchMessage from '@/action/zustand/api/messageApi'
import axiosInstance from '@/config/axiosConfig'
import { NextApiResponse } from 'next'
import axios from 'axios'
import { MessageApis } from '@/action/zustand/api/MessageApis'
import { Page } from '@/models/Page'

interface ChatProps {
	messages?: MessageResponse[]
	selectedUser: UserData
	isMobile: boolean
}
const roomId: string =
	process.env.ROOM_CHAT_ID || 'ab12d22d-9a33-4d3e-87d7-f1962da5d6c9'

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
	const [messagesState, setMessages] = React.useState<MessageResponse[]>([])
	const [client, setClient] = useState<Client | null>(null)

	useEffect(() => {
		const onConnect = (client: Client) => {
			client.subscribe(`/topic/${roomId}`, (message: IMessage) => {
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
	}, [])

	const sendMessage = (newMessage: MessageRequest) => {
		const destination = `/app/${roomId}/sendMessage`
		try {
			client?.publish({
				destination,
				body: JSON.stringify(newMessage),
			})
		} catch (error) {
			console.error('fail to send message' + error)
		}
	}
	useEffect(() => {
		fetchData()
	}, [])
	const fetchData = async () => {
		var x: Page<MessageResponse> = await MessageApis.getMessageByRoomId(
			'ab12d22d-9a33-4d3e-87d7-f1962da5d6c9'
		)
		setMessages(x.content)
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
