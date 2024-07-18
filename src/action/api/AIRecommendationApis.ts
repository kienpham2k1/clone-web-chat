import axiosInstance from '@/config/axiosConfig';
import GeminiAIRequest from '@/models/ai/GeminiAIRequest';
import GeminiAIResponse from '@/models/ai/GeminiAIResponse';
export const AIRecommendationApis = {
    ask: (form: FormData): Promise<any> => {
        console.log();

        return axiosInstance.post<any>(`/ai-recommendation/ask`, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((response) => {
                console.log(response.data);
                return response.data
            })
            .catch((error) => {
                console.error('Error ask ai:', error)
                throw new Error('Failed to sign in')
            })
    }
};