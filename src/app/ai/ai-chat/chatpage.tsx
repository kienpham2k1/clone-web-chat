'use client'

import { AIRecommendationApis } from '@/action/api/AIRecommendationApis'
import { Button } from '@/components/ui/button'
import GeminiAIRequest from '@/models/ai/GeminiAIRequest'
import GeminiAIResponse from '@/models/ai/GeminiAIResponse'
import { ChangeEvent, FormEvent, useState } from 'react'
import { promises as fs } from 'fs'
import axios from 'axios'
const AIChatForm: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		setSelectedFile(file || null)
	}
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!selectedFile) return

		const geminiRq = {
			contents: [
				{
					role: 'user',
					parts: [
						{
							text: 'recommend me shoes to wear with this outfit',
							inlineData: {
								data: selectedFile,
								mimeType: selectedFile.type,
							},
						},
					],
				},
			],
		}
		console.log(geminiRq)

		const formData = new FormData()
		// formData.append('contents[0].parts[0].inlineData.data', selectedFile)
		// formData.append('contents[0].parts[0].inlineData.mimeType', selectedFile.type)
		formData.append('contents[0].parts[0].text', "Recommend me a shoes to wear with this")
		formData.append('contents[0].role', "user")

		await AIRecommendationApis.ask(formData)
	}

	return (
		<div>
			<h1>Upload File</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="file"
					onChange={handleFileChange}
				/>
				<button type="submit">Upload</button>
			</form>
		</div>
	)
}
export default AIChatForm
