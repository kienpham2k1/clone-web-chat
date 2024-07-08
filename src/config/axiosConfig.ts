// axiosConfig.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_JWT}`
  }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
