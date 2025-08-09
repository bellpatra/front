// lib/apiEndpoints.ts
// Centralized API endpoints configuration

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/users/login',
    LOGOUT: '/api/users/logout',
    REGISTER: '/api/users/register',
    REFRESH_TOKEN: '/api/users/refresh-token',
    PROFILE: '/api/users/profile',
    CHANGE_PASSWORD: '/api/users/change-password',
  },
  
  // User management endpoints
  USERS: {
    LIST: '/api/users',
    GET_BY_ID: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
    SEARCH: '/api/users/search',
  },
  
  // Example: Product endpoints (add your own as needed)
  PRODUCTS: {
    LIST: '/api/products',
    GET_BY_ID: (id: string) => `/api/products/${id}`,
    CREATE: '/api/products',
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
    SEARCH: '/api/products/search',
    CATEGORIES: '/api/products/categories',
  },
  
  // Example: Orders endpoints
  ORDERS: {
    LIST: '/api/orders',
    GET_BY_ID: (id: string) => `/api/orders/${id}`,
    CREATE: '/api/orders',
    UPDATE: (id: string) => `/api/orders/${id}`,
    DELETE: (id: string) => `/api/orders/${id}`,
    USER_ORDERS: (userId: string) => `/api/orders/user/${userId}`,
  },
  
  // File upload endpoints
  UPLOAD: {
    IMAGE: '/api/upload/image',
    DOCUMENT: '/api/upload/document',
    BULK: '/api/upload/bulk',
  },
  
  // Reports endpoints
  REPORTS: {
    SALES: '/api/reports/sales',
    USERS: '/api/reports/users',
    PRODUCTS: '/api/reports/products',
    CUSTOM: '/api/reports/custom',
  },
} as const;

// Helper function to build query parameters
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  return searchParams.toString();
};

// Helper function to build full URL with query parameters
export const buildApiUrl = (endpoint: string, params?: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }
  
  const queryString = buildQueryString(params);
  return `${endpoint}${queryString ? `?${queryString}` : ''}`;
};

// Example usage functions
export const apiHelpers = {
  // Get users with pagination and filters
  getUsersUrl: (page = 1, limit = 10, search?: string, role?: string) => {
    return buildApiUrl(API_ENDPOINTS.USERS.LIST, {
      page,
      limit,
      search,
      role,
    });
  },
  
  // Get products with filters
  getProductsUrl: (category?: string, minPrice?: number, maxPrice?: number) => {
    return buildApiUrl(API_ENDPOINTS.PRODUCTS.LIST, {
      category,
      minPrice,
      maxPrice,
    });
  },
  
  // Get orders with date range
  getOrdersUrl: (startDate?: string, endDate?: string, status?: string) => {
    return buildApiUrl(API_ENDPOINTS.ORDERS.LIST, {
      startDate,
      endDate,
      status,
    });
  },
};

export default API_ENDPOINTS;
