'use client'

import { userData } from '@/app/data'
import React, { useEffect, useState } from 'react'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
import { Sidebar } from '../sidebar'
import { Chat } from './chat'
import { Page } from '@/models/Page'
import { RoomChatApis } from '@/action/zustand/api/RoomChatApis'
import { RoomResponse } from '@/models/response/RoomResponse'

interface ChatLayoutProps {
	defaultLayout: number[] | undefined
	defaultCollapsed?: boolean
	navCollapsedSize: number
}

export function ChatLayout({
	defaultLayout = [320, 480],
	defaultCollapsed = false,
	navCollapsedSize,
}: ChatLayoutProps) {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
	const [selectedUser, setSelectedUser] = React.useState(userData[0])
	const [isMobile, setIsMobile] = useState(false)
	const [roomChats, setRoomChats] = useState<RoomResponse[]>([])
	const [selectedRoomChat, setSelectedRoomChat] = useState<RoomResponse | undefined>(undefined);

	useEffect(() => {
		fetchRoomChat()
	}, [])

	useEffect(() => {
		const checkScreenWidth = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		// Initial check
		checkScreenWidth()

		// Event listener for screen width changes
		window.addEventListener('resize', checkScreenWidth)

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('resize', checkScreenWidth)
		}
	}, [])
	const fetchRoomChat = async () => {
		var roomPage: Page<RoomResponse> = await RoomChatApis.getRoomChats()
		setRoomChats(roomPage.content)
		setSelectedRoomChat(roomPage.content[0])
	}

	return (
		<ResizablePanelGroup
			direction="horizontal"
			onLayout={(sizes: number[]) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`
			}}
			className="h-full items-stretch"
		>
			<ResizablePanel
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={isMobile ? 0 : 24}
				maxSize={isMobile ? 8 : 30}
				onCollapse={() => {
					setIsCollapsed(true)
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						true
					)}`
				}}
				onExpand={() => {
					setIsCollapsed(false)
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						false
					)}`
				}}
				className={cn(
					isCollapsed &&
						'min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out'
				)}
			>
				<Sidebar
					isCollapsed={isCollapsed || isMobile}
					roomChats={roomChats}
					selectedRoomChat={selectedRoomChat}
					setSelectedRoomChat={setSelectedRoomChat}
					isMobile={isMobile}
				/>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel
				defaultSize={defaultLayout[1]}
				minSize={30}
			>
				<Chat
					selectedRoomChat={selectedRoomChat}
					selectedUser={selectedUser}
					isMobile={isMobile}
				 
				/>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
