# Authentication Implementation with Zustand and Server API

This implementation provides a complete authentication system that integrates Firebase Authentication with the backend API using Zustand for state management.

## Features

- **Firebase Authentication** - Handles user authentication with email/password and Google sign-in
- **Backend Integration** - Automatically creates and syncs users with the backend API
- **Zustand State Management** - Clean, persistent state management for authentication
- **Error Handling** - Comprehensive error handling with user-friendly messages
- **Type Safety** - Proper error handling and validation

## Files Structure

```
client/src/
├── store/
│   └── authStore.js          # Main Zustand store for authentication
├── services/
│   ├── authService.js        # Firebase authentication service
│   ├── userService.js        # Backend API service for user operations
│   └── api.js               # Axios instance with interceptors
├── hooks/
│   └── useUser.js           # Custom hook for user operations
└── components/
    ├── Login.jsx            # Login component
    ├── Signup.jsx           # Signup component
    └── AuthDemo.jsx         # Demo component showing auth functionality
```

## Key Components

### 1. AuthStore (authStore.js)

The main Zustand store that manages authentication state:

```javascript
const useAuthStore = create(persist((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  // Actions
  signIn: async (email, password) => { /* ... */ },
  signUp: async (name, email, password) => { /* ... */ },
  signInWithGoogle: async () => { /* ... */ },
  signOut: async () => { /* ... */ },
  // ... other actions
})));
```

**Key Features:**
- Persistent state using Zustand persist middleware
- Automatic Firebase + Backend user sync
- Error handling with user-friendly messages
- Loading states for better UX

### 2. UserService (userService.js)

Handles all backend API operations for users:

```javascript
class UserService {
  async createUser(userData) { /* ... */ }
  async getUserByFirebaseUid(firebaseUid) { /* ... */ }
  async getUserByEmail(email) { /* ... */ }
  async followUser(userId, targetUserId) { /* ... */ }
  // ... other user operations
}
```

**Available Endpoints:**
- Create, read, update, delete users
- Follow/unfollow users
- Block/unblock users
- Search users
- Update notification preferences

### 3. useUser Hook (useUser.js)

Custom React hook for user operations:

```javascript
const { 
  user, 
  loading, 
  error, 
  followUser, 
  searchUsers, 
  updateCurrentUser 
} = useUser();
```

### 4. Login Component (Login.jsx)

Clean login form with:
- Email/password authentication
- Google sign-in
- Error display
- Loading states
- Responsive design

### 5. Signup Component (Signup.jsx)

Registration form with:
- Name, email, password fields
- Google sign-up
- Automatic backend user creation
- Error handling

## Authentication Flow

### Sign Up Flow:
1. User fills signup form
2. Firebase creates user account
3. Backend user record is automatically created
4. User is logged in and redirected

### Sign In Flow:
1. User fills login form
2. Firebase authenticates user
3. Backend user data is fetched and merged
4. User state is updated in Zustand store

### Google Authentication:
1. User clicks Google sign-in
2. Firebase handles Google OAuth
3. If user doesn't exist in backend, they are created
4. User data is synced and stored

## Usage Examples

### Basic Authentication

```jsx
import useAuthStore from '../store/authStore';

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useAuthStore();

  const handleLogin = async () => {
    try {
      await signIn('user@example.com', 'password');
      // User is now logged in
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
    </div>
  );
}
```

### User Operations

```jsx
import useUser from '../hooks/useUser';

function UserProfile() {
  const { followUser, searchUsers, loading } = useUser();

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      console.log('User followed successfully');
    } catch (error) {
      console.error('Follow failed:', error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const results = await searchUsers(query);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {/* Your UI here */}
    </div>
  );
}
```

## Error Handling

The implementation includes comprehensive error handling:

- **Network Errors**: Handled with user-friendly messages
- **Authentication Errors**: Firebase errors are mapped to readable messages
- **API Errors**: Backend errors are parsed and displayed appropriately
- **Validation Errors**: Form validation with real-time feedback

## Security Features

- **Firebase Security**: All authentication is handled by Firebase
- **JWT Tokens**: Automatic token management with refresh
- **Request Interceptors**: Automatic token attachment to API requests
- **Error Recovery**: Automatic logout on authentication failures

## Testing

Use the `AuthDemo` component to test all authentication features:

```jsx
import AuthDemo from './components/AuthDemo';

// Add to your router
<Route path="/auth-demo" element={<AuthDemo />} />
```

## Environment Variables

Make sure these environment variables are set:

```env
VITE_BACKEND_API_URL=http://localhost:8080
# Firebase config variables
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... other Firebase config
```

## Backend API Requirements

The backend should have these endpoints:

- `POST /api/users` - Create user
- `GET /api/users/firebase/{firebaseUid}` - Get user by Firebase UID
- `GET /api/users/{userId}` - Get user by ID
- `PUT /api/users/{userId}` - Update user
- `DELETE /api/users/{userId}` - Delete user
- `GET /api/users/search?query={query}` - Search users
- `POST /api/users/{userId}/follow/{targetUserId}` - Follow user
- `DELETE /api/users/{userId}/follow/{targetUserId}` - Unfollow user

## Best Practices

1. **State Management**: Use the auth store for global authentication state
2. **Error Handling**: Always handle errors gracefully with user feedback
3. **Loading States**: Show loading indicators for better UX
4. **Token Management**: Let the API service handle token refresh automatically
5. **Type Safety**: Use TypeScript if possible for better development experience
6. **Testing**: Test authentication flows thoroughly before deployment

This implementation provides a robust, scalable authentication system that can be easily extended and maintained.
