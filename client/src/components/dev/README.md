# Developer Tools

This folder contains developer and testing components for the baSICK fitness application. These tools are designed to help with development, debugging, and testing of the application.

## Available Tools

### 🔐 Authentication Demo (`/auth-demo`)
**File:** `AuthDemo.jsx`

A comprehensive testing interface for the authentication system.

**Features:**
- Display current user information (Firebase & backend data)
- Test API calls (search users, get user data)
- Authentication state debugging
- Sign out functionality
- Raw user data viewer

**Use Cases:**
- Verify authentication flows work correctly
- Debug user data synchronization between Firebase and backend
- Test API integration
- Validate Zustand store state

### 🔗 API Tester (`/api-tester`)
**File:** `ApiTester.jsx`

A tool for testing backend API endpoints with custom requests.

**Features:**
- Send custom HTTP requests (GET, POST, PUT, DELETE, PATCH)
- Quick test buttons for common endpoints
- JSON request body editor
- Response viewer with status codes and headers
- Error handling and display
- Authentication token automatically included

**Use Cases:**
- Test new API endpoints during development
- Debug API responses
- Validate request/response formats
- Test error handling

### 🔥 Firestore Tester (`/firestore-tester`)
**File:** `FirestoreTester.jsx`

A comprehensive tool for testing Firebase Firestore operations and document management.

**Features:**
- Create test user documents in Firestore
- Get current user document data
- Update user documents with test data
- Check if user documents exist
- Update user profile information
- **Test lastLoginAt timestamp updates**
- Real-time operation results display
- Error handling and debugging

**Use Cases:**
- Test Firestore integration and operations
- Debug user document creation and updates
- Validate Firestore service functions
- Test data synchronization between Firebase Auth and Firestore
- **Verify lastLoginAt tracking functionality**

### 🏠 Developer Dashboard (`/dev`)
**File:** `DevDashboard.jsx`

Central hub for accessing all developer tools.

**Features:**
- Overview of all available dev tools
- Current user information display
- System information (environment, URLs, etc.)
- Quick actions (clear storage, log state, etc.)
- Environment variables viewer

**Use Cases:**
- Main entry point for developers
- Quick access to all testing tools
- System status overview

## How to Access

### During Development
1. Start the development server: `npm run dev`
2. Navigate to any of these URLs:
   - `http://localhost:5173/dev` - Developer Dashboard
   - `http://localhost:5173/auth-demo` - Authentication Demo
   - `http://localhost:5173/api-tester` - API Tester

### Authentication Required
All developer tools require user authentication. If you're not logged in, you'll be redirected to the login page.

## File Structure

```
src/components/dev/
├── README.md           # This file
├── DevDashboard.jsx    # Main developer dashboard
├── AuthDemo.jsx        # Authentication testing tool
└── ApiTester.jsx       # API endpoint testing tool
```

## Adding New Developer Tools

To add a new developer tool:

1. **Create the component** in this folder
2. **Add the import** to `main.jsx`
3. **Add the route** to the routes configuration
4. **Update DevDashboard.jsx** to include a link to your new tool
5. **Update this README** with documentation

Example:

```jsx
// 1. Create MyNewTool.jsx
import { useNavigate } from 'react-router-dom';

const MyNewTool = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8">
      <button onClick={() => navigate('/dev')}>Back to Dev Tools</button>
      {/* Your tool content */}
    </div>
  );
};

export default MyNewTool;

// 2. Add to main.jsx imports
import MyNewTool from './components/dev/MyNewTool.jsx';

// 3. Add route
<Route path="/my-new-tool" element={<MyNewTool />} />

// 4. Add to DevDashboard.jsx devTools array
{
  name: 'My New Tool',
  description: 'Description of what your tool does',
  path: '/my-new-tool',
  icon: '🔧',
  color: 'bg-yellow-600 hover:bg-yellow-700'
}
```

## Best Practices

### Component Structure
- Include a "Back to Dev Tools" button for easy navigation
- Use consistent styling (dark theme with `bg-[#1a1a1a]` background)
- Handle authentication state (redirect to login if not authenticated)
- Include error handling and loading states

### Styling Guidelines
- Background: `bg-[#1a1a1a]` (main) and `bg-[#2a2a2a]` (cards)
- Text: `text-white` (headers), `text-gray-300` (body), `text-gray-400` (secondary)
- Buttons: Use appropriate color variants (blue, green, red, etc.)
- Consistent padding: `p-6` for cards, `p-8` for main container

### Security Considerations
- These tools are for development only
- Don't expose sensitive information (API keys, secrets)
- Include authentication checks
- Be careful with environment variables display

## Related Files

These developer tools integrate with:
- `src/store/authStore.js` - Authentication state management
- `src/services/userService.js` - Backend API calls
- `src/services/api.js` - HTTP client configuration
- `src/hooks/useUser.js` - User operations hook

## Troubleshooting

### Common Issues

1. **Tools not accessible**
   - Ensure you're logged in
   - Check that routes are properly configured in `main.jsx`

2. **API calls failing**
   - Verify backend server is running on `http://localhost:8080`
   - Check authentication token is valid
   - Verify CORS configuration

3. **Import errors**
   - Check relative import paths (use `../../` since dev folder is nested)
   - Ensure all dependencies are properly imported

### Debug Steps
1. Check browser console for errors
2. Verify authentication state in DevDashboard
3. Test API connectivity with API Tester
4. Use AuthDemo to verify user data

## Future Enhancements

Potential additions to the developer tools:
- Component Library viewer
- State Inspector for Zustand stores
- Mock data generator
- Performance monitoring dashboard
- Log viewer
- Database query tool
- Email/notification tester

## LastLoginAt Implementation

The `lastLoginAt` attribute has been implemented across the entire authentication flow to track when users last accessed the application.

### Implementation Details

**Backend Integration:**
- `userService.updateLastLogin(userId)` - Updates backend user record
- API endpoint: `PATCH /api/users/{userId}/last-login`
- Automatically called during all authentication flows

**Firestore Integration:**
- `firestoreService.updateLastLogin(uid)` - Updates Firestore user document
- Uses `serverTimestamp()` for consistent timing
- Fallback when backend is unavailable

**Authentication Flows:**
- **Email/Password Login:** Updates lastLoginAt on successful authentication
- **Google Sign-in:** Updates lastLoginAt for both new and existing users
- **Session Restoration:** Updates lastLoginAt when app initializes with existing session
- **User Registration:** Sets initial lastLoginAt timestamp

**Developer Tools:**
- **AuthDemo:** Displays formatted lastLoginAt timestamp
- **FirestoreTester:** Test lastLoginAt updates independently
- **ApiTester:** Quick test for backend lastLoginAt endpoint

### Testing LastLoginAt

1. **Via Authentication Demo (`/auth-demo`):**
   - View current user's lastLoginAt timestamp
   - See formatted date/time display

2. **Via Firestore Tester (`/firestore-tester`):**
   - Use "Update Last Login" button to test Firestore updates
   - View operation results in real-time

3. **Via API Tester (`/api-tester`):**
   - Use "Update Last Login" quick test for backend API
   - Test with custom user IDs

### Data Flow
```
Login/Authentication → Update Backend lastLoginAt → Update Firestore lastLoginAt → User State Updated
```

## Best Practices
- Ensure `lastLoginAt` is updated on every login and session restoration
- Use Firestore and backend API tools to verify `lastLoginAt` functionality
- Regularly check user documents for accurate `lastLoginAt` timestamps
