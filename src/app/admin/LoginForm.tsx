'use client'
import { useState } from 'react'
import { storeToken, retrieveToken } from '../../utils/tokenUtils'
import { AuthApis } from '@/action/api/AuthApis'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { storeUser } from '@/utils/userUtils'

const LoginForm: React.FC = () => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			const response = await AuthApis.signIn({ username, password })
			router.push('/admin/chat')
			storeToken(response.token.accessToken)
			storeUser(response.user)
		} catch (error) {
			setError('Login fail!')
		}
	}
	return (
		<Card className="mx-auto max-w-sm">
			<form onSubmit={handleSubmit}>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Login</CardTitle>
					<CardDescription>
						Please enter your username and password.
					</CardDescription>
					<p className="text-red-500">{error}</p>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="Username"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="Password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button
						type="submit"
						className="w-full"
					>
						Log In
					</Button>
				</CardContent>
			</form>
		</Card>
	)
}

export default LoginForm
