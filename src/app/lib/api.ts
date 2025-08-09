// lib/api.ts
import axiosInstance from './axios';
import { AxiosResponse } from 'axios';

// Generic API response type
export interface ApiResponse<T = any> {
  status: string;
  statusCode: number;
  message: string;
  data: T;
}

// Legacy response type for backward compatibility
export interface LegacyApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status?: number;
}

// Generic error type
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// API Service class with all HTTP methods
class ApiService {
  // GET request
  async get<T = any>(
    url: string,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(url, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // POST request
  async post<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // PUT request
  async put<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // PATCH request
  async patch<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.patch(url, data, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  async delete<T = any>(
    url: string,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // File upload method
  async upload<T = any>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      return {
        data: response.data,
        success: true,
        status: response.status,
        message: 'Upload successful'
      };
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        errors: error.response.data?.errors || {}
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'Network error - no response from server',
        status: 0
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0
      };
    }
  }

  // Method to set custom headers (can be called from anywhere)
  setCustomHeader(key: string, value: string) {
    axiosInstance.defaults.headers.common[key] = value;
  }

  // Method to remove custom headers
  removeCustomHeader(key: string) {
    delete axiosInstance.defaults.headers.common[key];
  }

  // Method to set auth token
  setAuthToken(token: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Method to clear auth token
  clearAuthToken() {
    delete axiosInstance.defaults.headers.common['Authorization'];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
