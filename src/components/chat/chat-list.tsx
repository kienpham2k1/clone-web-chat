import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import ChatBottombar from './chat-bottombar'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageResponse } from '@/models/response/MessageResponse'
import { MessageRequest } from '@/models/request/MessageRequest'
import { UserResponse } from '@/models/response/UserResponse'

interface ChatListProps {
	messages?: MessageResponse[]
	sendMessage: (newMessage: MessageRequest) => void
	isMobile: boolean
	loggedUser : UserResponse | null
}

export function ChatList({
	messages,
	sendMessage,
	isMobile,
	loggedUser,
}: ChatListProps) {
	const messagesContainerRef = useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight
		}
	}, [messages])

	return (
		<div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
			<div
				ref={messagesContainerRef}
				className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
			>
				<AnimatePresence>
					{messages?.map((message, index) => (
						<motion.div
							key={index}
							layout
							initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
							animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
							exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
							transition={{
								opacity: { duration: 0.1 },
								layout: {
									type: 'spring',
									bounce: 0.3,
									duration:
										messages.indexOf(message) * 0.05 + 0.2,
								},
							}}
							style={{
								originX: 0.5,
								originY: 0.5,
							}}
							className={cn(
								'flex flex-col gap-2 p-4 whitespace-pre-wrap',
								!message.user ||
									message.user?.id === loggedUser?.id
									? 'items-end'
									: 'items-start'
							)}
						>
							<div className="flex gap-3 items-center">
								{message.user?.id !== loggedUser?.id &&
								message.user?.avatar ? (
									<Avatar className="flex justify-center items-center">
										<AvatarImage
											src={message.user?.avatar}
											alt={message.user?.username}
											width={6}
											height={6}
										/>
									</Avatar>
								) : (
									<></>
								)}
								<span className=" bg-accent p-3 rounded-md max-w-xs">
									{message.content}
								</span>
								{message.user?.id === loggedUser?.id &&
									message.user?.avatar && (
										<Avatar className="flex justify-center items-center">
											<AvatarImage
												src={message.user?.avatar}
												alt={message.user?.username}
												width={6}
												height={6}
											/>
										</Avatar>
									)}
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			<ChatBottombar
				sendMessage={sendMessage}
				isMobile={isMobile}
			/>
		</div>
	)
}
