// lib/authService.ts
import apiService, { ApiResponse } from './api';
import { API_ENDPOINTS } from './apiEndpoints';

// Types for authentication
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    phone: string | null;
    role: string;
    isActive: boolean;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

// Authentication service
class AuthService {
  // Login method
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      // If login successful, store both tokens and user data
      if (response.status === 'success' && response.data.token) {
        apiService.setAuthToken(response.data.token);
        
        // Store tokens and user data in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.data.token);
          localStorage.setItem('refresh_token', response.data.refreshToken);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  // Logout method
  async logout(): Promise<void> {
    try {
      // Call logout API if you have one
      // await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
      
      // Clear stored data
      apiService.clearAuthToken();
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local data even if API call fails
      apiService.clearAuthToken();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
      }
    }
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (error) {
          console.error('Error parsing user data:', error);
          return null;
        }
      }
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      return !!token;
    }
    return false;
  }

  // Get auth token
  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Get refresh token
  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  // Register method (if needed)
  async register(userData: {
    username: string;
    email: string;
    password: string;
    name: string;
  }): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  // Refresh token method
  async refreshToken(): Promise<ApiResponse<{ token: string; refreshToken: string }>> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiService.post<{ token: string; refreshToken: string }>(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        { refreshToken }
      );
      
      if (response.success && response.data.token) {
        // Update both tokens
        apiService.setAuthToken(response.data.token);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.data.token);
          if (response.data.refreshToken) {
            localStorage.setItem('refresh_token', response.data.refreshToken);
          }
        }
      }
      
      return response;
    } catch (error: any) {
      // If refresh fails, logout user
      await this.logout();
      throw error;
    }
  }

  // Update profile method
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await apiService.put<User>(API_ENDPOINTS.AUTH.PROFILE, userData);
      
      // Update stored user data
      if (response.success && typeof window !== 'undefined') {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, ...response.data };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  // Change password method
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
