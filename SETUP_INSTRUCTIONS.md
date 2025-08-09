# BellPatra ERP Frontend Setup Instructions

## Overview
This project has been updated to use **React 18.3.0** with a centralized API architecture using **Axios** and **Ant Design**.

## Key Features

### ✅ React 18.3.0 Features Implemented
- **useTransition** for non-blocking state updates
- **useCallback** for optimized function memoization
- **Concurrent rendering** for better user experience
- **Suspense boundaries** for loading states

### ✅ Centralized API Architecture
- **Axios instance** with interceptors
- **Standardized API methods** (GET, POST, PUT, DELETE, PATCH)
- **Centralized error handling**
- **Token management** with automatic header injection
- **Request/Response interceptors**

### ✅ Authentication System
- **Local API integration** (`localhost:3000/api/users/login`)
- **Token-based authentication**
- **Automatic token storage** and retrieval
- **Protected routes** with client-side authentication

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000)
   - Login page: [http://localhost:3000/login](http://localhost:3000/login)
   - Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Login Credentials

Use these test credentials:
- **Username:** `ajay@admin.com`
- **Password:** `Ajay@9711`

## API Architecture

### 1. Centralized Axios Configuration (`src/app/lib/axios.ts`)
- Base URL configuration
- Request/Response interceptors
- Automatic token injection
- Error handling

### 2. API Service (`src/app/lib/api.ts`)
- Standardized HTTP methods
- Generic response typing
- File upload support
- Custom header management

### 3. Authentication Service (`src/app/lib/authService.ts`)
- Login/Logout functionality
- Token management
- User data persistence
- Profile management

### 4. API Endpoints (`src/app/lib/apiEndpoints.ts`)
- Centralized endpoint definitions
- Query parameter helpers
- URL building utilities

## Usage Examples

### Making API Calls

```typescript
import apiService from '@/app/lib/api';
import { API_ENDPOINTS } from '@/app/lib/apiEndpoints';

// GET request
const users = await apiService.get(API_ENDPOINTS.USERS.LIST);

// POST request
const newUser = await apiService.post(API_ENDPOINTS.USERS.CREATE, userData);

// PUT request
const updatedUser = await apiService.put(API_ENDPOINTS.USERS.UPDATE(userId), updateData);

// DELETE request
await apiService.delete(API_ENDPOINTS.USERS.DELETE(userId));
```

### Authentication

```typescript
import authService from '@/app/lib/authService';

// Login
const response = await authService.login({
  username: 'ajay@admin.com',
  password: 'Ajay@9711'
});

// Check authentication
const isAuthenticated = authService.isAuthenticated();

// Get current user
const user = authService.getCurrentUser();

// Logout
await authService.logout();
```

### Custom Headers

```typescript
import apiService from '@/app/lib/api';

// Set custom header globally
apiService.setCustomHeader('X-Custom-Header', 'value');

// Make request with custom headers
const response = await apiService.post('/api/endpoint', data, {
  headers: {
    'X-Request-ID': 'unique-id'
  }
});
```

## React 18 Patterns Used

### 1. useTransition for Non-blocking Updates
```typescript
const [isPending, startTransition] = useTransition();

const handleSubmit = () => {
  startTransition(() => {
    router.push('/dashboard');
  });
};
```

### 2. useCallback for Performance
```typescript
const handleLogin = useCallback(async (values) => {
  // Login logic
}, [router]);
```

### 3. Concurrent Features
- Loading states with `Spin` component
- Non-blocking navigation
- Optimized re-renders

## File Structure

```
src/app/
├── lib/
│   ├── axios.ts          # Axios configuration
│   ├── api.ts            # API service methods
│   ├── authService.ts    # Authentication service
│   └── apiEndpoints.ts   # Centralized endpoints
├── components/
│   └── LogoutButton.tsx  # Updated with new auth
├── login/
│   └── page.tsx         # Login page with new API
├── dashboard/
│   └── page.tsx         # Dashboard with auth check
└── api/
    └── users/
        └── login/
            └── route.ts  # API endpoint example
```

## Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret
```

## Key Benefits

1. **Centralized API Management:** All API calls go through standardized methods
2. **Easy Header Management:** Change headers in one place
3. **Consistent Error Handling:** Unified error responses
4. **React 18 Performance:** Optimized rendering and state updates
5. **Type Safety:** Full TypeScript support
6. **Scalable Architecture:** Easy to add new endpoints and features

## Next Steps

1. **Install dependencies:** `npm install`
2. **Test the login:** Use the provided credentials
3. **Extend API endpoints** in `apiEndpoints.ts`
4. **Add more services** following the same pattern
5. **Implement additional features** using the established architecture

## Dependencies Added
- `axios`: ^1.6.2 - HTTP client
- Updated React to 18.3.0
- Updated React types to ^18

The application is now ready for development with a robust, scalable architecture!
