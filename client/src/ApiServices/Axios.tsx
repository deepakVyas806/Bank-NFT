// src/axiosSetup.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Base URL of your API
// const BASE_URL = 'https://betting-app-gold.vercel.app/';  //Live
const BASE_URL = 'https://betting-app-gold.vercel.app/';  //Local

// Get tokens from local storage
const getAccessToken = (): string | null => localStorage.getItem('accessToken');
const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

// Set tokens in local storage
const setAccessToken = (token: string): void => localStorage.setItem('accessToken', token);
const setRefreshToken = (token: string): void => localStorage.setItem('refreshToken', token);

// Public Axios Instance - No Auth Token Required
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// Private Axios Instance - Auth Token Required
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Necessary if using cookies for token management
});

// Add a request interceptor to add the access token before each request
axiosPrivate.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Refresh Token Logic
const refreshAccessToken = async (): Promise<string> => {
  try {
    const response: AxiosResponse<{ accessToken: string; refreshToken: string }> = await axiosPublic.post('/auth/refresh-token', {
      token: getRefreshToken(),
    });
    const { accessToken, refreshToken } = response.data;

    // Update tokens in local storage
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    return accessToken;
  } catch (error) {
    // Handle token refresh failure (e.g., logout the user)
    console.error('Unable to refresh access token', error);
    throw error;
  }
};

// Response Interceptor for Handling 401 Unauthorized Errors
axiosPrivate.interceptors.response.use(
  (response: AxiosResponse) => response, // Pass through if successful
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        // Retry the original request with the new access token
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
