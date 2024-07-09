'use client'

import Link from 'next/link'
import { MoreHorizontal, SquarePen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from '@/components/ui/tooltip'
import { Avatar, AvatarImage } from './ui/avatar'
import * as RadixAvatar from '@radix-ui/react-avatar'
import { RoomResponse } from '@/models/response/RoomResponse'
interface SidebarProps {
	isCollapsed: boolean

	roomChats: RoomResponse[]
	selectedRoomChat?: RoomResponse
	setSelectedRoomChat: (room: RoomResponse) => void
	isMobile: boolean
}

export function Sidebar({
	isCollapsed,
	roomChats,
	selectedRoomChat,
	setSelectedRoomChat,
	isMobile,
}: SidebarProps) {
	return (
		<>
			{selectedRoomChat ? (
				<div
					data-collapsed={isCollapsed}
					className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
				>
					{!isCollapsed && (
						<div className="flex justify-between p-2 items-center">
							<div className="flex gap-2 items-center text-2xl">
								<p className="font-medium">Chats</p>
								<span className="text-zinc-300">
									({roomChats.length})
								</span>
							</div>

							<div>
								<Link
									href="#"
									className={cn(
										buttonVariants({
											variant: 'ghost',
											size: 'icon',
										}),
										'h-9 w-9'
									)}
								>
									<MoreHorizontal size={20} />
								</Link>

								<Link
									href="#"
									className={cn(
										buttonVariants({
											variant: 'ghost',
											size: 'icon',
										}),
										'h-9 w-9'
									)}
								>
									<SquarePen size={20} />
								</Link>
							</div>
						</div>
					)}
					<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
						{roomChats.map((room, index) =>
							isCollapsed ? (
								<TooltipProvider key={index}>
									<Tooltip
										key={index}
										delayDuration={0}
									>
										<TooltipTrigger asChild>
											<Link
												onClick={() =>
													setSelectedRoomChat(room)
												}
												href="#"
												className={cn(
													buttonVariants({
														variant:
															room.id ===
															selectedRoomChat.id
																? 'default'
																: 'ghost',
														size: 'icon',
													}),
													'h-11 w-11 md:h-16 md:w-16',
													(room.id ===
													selectedRoomChat.id
														? 'grey'
														: 'ghost') === 'grey' &&
														'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
												)}
											>
												{room.user.avatar ? (
													<Avatar className="flex justify-center items-center">
														<AvatarImage
															src={
																room.user.avatar
															}
															alt={
																room.user
																	.username
															}
															width={6}
															height={6}
															className="w-10 h-10 "
														/>
													</Avatar>
												) : (
													<>
														<RadixAvatar.Root className="AvatarRoot">
															<RadixAvatar.Fallback className="AvatarFallback">
																{room.user.username.charAt(
																	0
																)}
															</RadixAvatar.Fallback>
														</RadixAvatar.Root>
													</>
												)}
												<span className="sr-only">
													{room.user.username}
												</span>
											</Link>
										</TooltipTrigger>
										<TooltipContent
											side="right"
											className="flex items-center gap-4"
										>
											{room.user.username}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<Link
									key={index}
									href="#"
									className={cn(
										buttonVariants({
											variant:
												room.id === selectedRoomChat.id
													? 'default'
													: 'ghost',
											size: 'xl',
										}),
										(room.id === selectedRoomChat.id
											? 'grey'
											: 'ghost') === 'grey' &&
											'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
										'justify-start gap-4'
									)}
									onClick={() => setSelectedRoomChat(room)}
								>
									{room.user.avatar ? (
										<Avatar className="flex justify-center items-center">
											<AvatarImage
												src={
													room.user.avatar
														? room.user.avatar
														: '/LoggedInUser.jpg'
												}
												alt={room.user.username}
												width={6}
												height={6}
												className="w-10 h-10 "
											/>
										</Avatar>
									) : (
										<></>
									)}
									<div className="flex flex-col max-w-28">
										<span>{room.user.username}</span>
										{room.messages &&
											room.messages.length > 0 && (
												<span className="text-zinc-300 text-xs truncate ">
													{
														room.messages[
															room.messages
																.length - 1
														].user.username.split(
															' '
														)[0]
													}
													:{' '}
													{
														room.messages[
															room.messages
																.length - 1
														].content
													}
												</span>
											)}
									</div>
								</Link>
							)
						)}
					</nav>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
