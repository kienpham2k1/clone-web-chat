import { Client, IMessage, IFrame } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const brokerURL: string =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/ws'
const accessToken: string =
	'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraWVudXNlciIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzIwNDA0MjI3LCJleHAiOjE3MjA0OTA2Mjd9.PgLNMKHoY6XzqjFE5vAkBoYx5JkQVi4m3hbZ0Y3fteBnL5yx5CFywqVB1l58Drsm'

interface StompConfig {
	onConnectCallback: (client: Client) => void
	onErrorCallback: (frame: IFrame) => void
}

const connectStompClient = ({
	onConnectCallback,
	onErrorCallback,
}: StompConfig): Client => {
	const socket = new SockJS(brokerURL)
	const stompClient = new Client({
		webSocketFactory: () => socket as WebSocket,
		connectHeaders: {
			['Authorization']: `Bearer ${accessToken}`,
		},
		debug: (str) => {
			console.log(str)
		},
		reconnectDelay: 5000,
		onConnect: (frame: IFrame) => {
			console.log('Connected')
			onConnectCallback(stompClient)
		},
		onStompError: (frame: IFrame) => {
			console.error('Broker reported error: ' + frame.headers['message'])
			console.error('Additional details: ' + frame.body)
			onErrorCallback(frame)
		},
	})
	stompClient.activate()

	return stompClient
}

export default connectStompClient
