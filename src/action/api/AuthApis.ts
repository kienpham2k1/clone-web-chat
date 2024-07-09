// apis/authApis.ts

import axiosInstance from '@/config/axiosConfig';
import { UserResponse } from '@/models/response/UserResponse';

interface SignInRequest {
  username: string;
  password: string;
}

interface SignInResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  }
  user: UserResponse
}

export const AuthApis = {
  signIn: (data: SignInRequest): Promise<SignInResponse> =>
    axiosInstance.post<SignInResponse>('/auth/signin', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error signing in:', error);
        throw new Error('Failed to sign in');
      }),
};
