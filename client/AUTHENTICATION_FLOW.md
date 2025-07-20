# Authentication and Route Protection Documentation

## Overview
This document explains the authentication and route protection system implemented in the baSICK fitness app.

## Components

### 1. ProtectedRoute Component
**File**: `src/components/ProtectedRoute.jsx`

**Purpose**: Protects routes that require authentication.

**Behavior**:
- Shows loading spinner while checking authentication status
- Redirects unauthenticated users to `/login` with return URL
- Renders protected component for authenticated users
- Preserves the intended destination URL for post-login redirect

**Usage**:
```jsx
<Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
```

### 2. PublicRoute Component
**File**: `src/components/PublicRoute.jsx`

**Purpose**: Protects public routes (login/signup) from authenticated users.

**Behavior**:
- Shows loading spinner while checking authentication status
- Redirects authenticated users to `/home`
- Renders public component (Login/Signup) for unauthenticated users

**Usage**:
```jsx
<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
```

## Authentication Flow

### 1. Initial App Load
1. App loads and initializes authentication state
2. `useAuthStore.initialize()` checks for existing Firebase session
3. Loading state shows while authentication is being verified
4. User is redirected based on authentication status

### 2. Unauthenticated User Journey
1. User tries to access protected route (e.g., `/home`)
2. `ProtectedRoute` detects no authentication
3. User is redirected to `/login` with return URL stored
4. After successful login, user is redirected to originally intended route

### 3. Authenticated User Journey
1. User tries to access public route (e.g., `/login`)
2. `PublicRoute` detects existing authentication
3. User is automatically redirected to `/home`
4. User can access all protected routes without additional prompts

### 4. Logout Flow
1. User clicks logout (e.g., in ProfilePage)
2. `signOut()` is called to clear authentication state
3. User is redirected to `/login`
4. All subsequent protected route access requires re-authentication

## Route Configuration

### Protected Routes
All routes requiring authentication are wrapped with `<ProtectedRoute>`:

- `/home` - Main dashboard
- `/user-details` - User profile setup
- `/workout-categories` - Workout categories
- `/exercises` - Exercise list
- `/trainers` - Trainers list
- `/profile` - User profile
- `/edit-profile` - Profile editing
- `/settings` - App settings
- `/leaderboard` - Fitness leaderboard
- `/appointments` - Appointment scheduling
- `/feed` - Social feed
- `/progress` - Progress tracking
- `/ai-helper` - AI fitness assistant
- `/notifications` - Notifications
- `/macros` - Macro tracking
- `/add-food` - Food logging
- All developer tools (`/dev/*`)

### Public Routes
Routes accessible without authentication:

- `/` - Root route (redirects to login)
- `/login` - Login page
- `/signup` - Registration page
- `/splash` - Splash screen (special case)

## Implementation Details

### Loading States
Both `ProtectedRoute` and `PublicRoute` show a loading spinner while checking authentication:

```jsx
if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

### Return URL Preservation
When redirecting to login, the intended destination is preserved:

```jsx
// In ProtectedRoute
if (!isAuthenticated) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}

// In Login component
const from = location.state?.from?.pathname || '/home';
// After successful login:
navigate(from, { replace: true });
```

### Automatic Redirects
Authenticated users are automatically redirected away from public routes:

```jsx
// In PublicRoute
if (isAuthenticated) {
  return <Navigate to="/home" replace />;
}
```

## Security Considerations

### 1. Client-Side Protection
- Route protection prevents UI access but is not sufficient for security
- Backend API endpoints must also validate authentication
- Firebase JWT tokens are used for backend authentication

### 2. Token Management
- Firebase handles token refresh automatically
- Tokens are included in all API requests via Axios interceptors
- Invalid tokens trigger automatic logout and redirect to login

### 3. State Persistence
- Authentication state is persisted using Zustand middleware
- State is restored on app reload for better UX
- Sensitive data is not stored in localStorage

## Testing Authentication

### Manual Testing
1. **Unauthenticated Access**: Try accessing `/home` directly - should redirect to `/login`
2. **Return URL**: Access `/profile` when not logged in, login, verify redirect to `/profile`
3. **Authenticated Redirect**: Login and try accessing `/login` - should redirect to `/home`
4. **Logout**: Login, then logout from profile page - should redirect to `/login`

### Developer Tools
Use the AuthTester component at `/auth-tester` to test various authentication scenarios:
- Sign up new users
- Sign in existing users
- Test Google authentication
- Test logout functionality
- Verify session restoration

## Troubleshooting

### Common Issues

1. **Infinite Loading**: Check if `initialize()` is being called in App.jsx
2. **No Redirect After Login**: Verify `navigate(from, { replace: true })` in Login component
3. **Still Accessible When Logged Out**: Ensure route is wrapped in `<ProtectedRoute>`
4. **Redirect Loop**: Check that public routes use `<PublicRoute>` wrapper

### Debug Authentication State
Use the browser's React DevTools to inspect the `useAuthStore` state:
- `isAuthenticated`: Should be true/false
- `isLoading`: Should be false after initialization
- `user`: Should contain user data when authenticated
- `error`: Should show any authentication errors

## Future Enhancements

### Possible Improvements
1. **Role-Based Access**: Add admin/user role checking to routes
2. **Route Permissions**: Fine-grained permissions per route
3. **Session Timeout**: Automatic logout after inactivity
4. **Remember Me**: Optional persistent authentication
5. **Multi-Factor Auth**: Add 2FA support for enhanced security

## Migration Notes

### Changes Made
1. Added `ProtectedRoute` and `PublicRoute` components
2. Updated all routes in `AppWithChatBubble.jsx` to use route guards
3. Modified Login and Signup components to handle return URLs
4. Updated ProfilePage logout to use proper `signOut()` method
5. Improved loading states and user experience

### Breaking Changes
- Direct access to protected routes now requires authentication
- Public routes automatically redirect authenticated users
- Manual navigation to `/login` when authenticated is no longer possible

This implementation provides a robust, user-friendly authentication system that follows modern web application security best practices.
