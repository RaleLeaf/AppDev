# baSICK Fitness App - API Documentation

## Overview
This document provides comprehensive API documentation for the baSICK fitness application backend. The API follows RESTful conventions and uses JSON for data exchange.

**Base URL**: `http://localhost:8080/api`

## Authentication
- **Type**: Firebase Authentication with JWT tokens
- **Header**: `Authorization: Bearer <firebase-id-token>`
- **Note**: All endpoints require authentication unless specified otherwise

## Error Handling
All API endpoints return standard HTTP status codes:
- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## API Endpoints

### Health Check
#### GET /api/health
Check if the backend service is running.

**Response:**
```json
{
  "status": "UP",
  "message": "Backend is running and CORS is configured"
}
```

---

## User Management (`/api/users`)

### 1. Get All Users
#### GET /api/users
Get list of all users (admin only).

**Response:**
```json
[
  {
    "firebaseUid": "string",
    "name": "string",
    "email": "string",
    "phoneNumber": "string",
    "isEmailVerified": boolean,
    "isPhoneVerified": boolean,
    "isActive": boolean,
    "createdAt": "string",
    "updatedAt": "string",
    "lastLoginAt": "string",
    "authType": "email|google|facebook",
    "role": "USER|ADMIN",
    "following": ["string"],
    "followers": ["string"],
    "blockedUsers": ["string"],
    "pushNotificationsEnabled": boolean,
    "emailNotificationsEnabled": boolean,
    "workoutRemindersEnabled": boolean,
    "socialNotificationsEnabled": boolean,
    "subscriptionType": "FREE|PREMIUM",
    "subscriptionExpiresAt": "string"
  }
]
```

### 2. Get User by ID
#### GET /api/users/{userId}
Get user details by user ID.

**Parameters:**
- `userId` (path): User ID

**Response:** UserDTO object

### 3. Get User by Firebase UID
#### GET /api/users/firebase/{firebaseUid}
Get user details by Firebase UID.

**Parameters:**
- `firebaseUid` (path): Firebase UID

**Response:** UserDTO object

### 4. Get User by Email
#### GET /api/users/email/{email}
Get user details by email address.

**Parameters:**
- `email` (path): Email address

**Response:** UserDTO object

### 5. Create User
#### POST /api/users
Create a new user account.

**Request Body:**
```json
{
  "firebaseUid": "string",
  "name": "string",
  "email": "string",
  "phoneNumber": "string",
  "authType": "email|google|facebook",
  "role": "USER|ADMIN",
  "isEmailVerified": boolean,
  "isPhoneVerified": boolean,
  "isActive": boolean,
  "pushNotificationsEnabled": boolean,
  "emailNotificationsEnabled": boolean,
  "workoutRemindersEnabled": boolean,
  "socialNotificationsEnabled": boolean,
  "subscriptionType": "FREE|PREMIUM",
  "subscriptionExpiresAt": "string"
}
```

**Response:** UserDTO object with 201 status

### 6. Update User
#### PUT /api/users/{userId}
Update user information.

**Parameters:**
- `userId` (path): User ID

**Request Body:** UpdateUserRequest object

**Response:** Updated UserDTO object

### 7. Delete User
#### DELETE /api/users/{userId}
Delete user account.

**Parameters:**
- `userId` (path): User ID

**Response:** 204 No Content

### 8. Search Users
#### GET /api/users/search?query={searchTerm}
Search users by name or username.

**Parameters:**
- `query` (query): Search term

**Response:** Array of UserDTO objects

### 9. Update Last Login
#### PATCH /api/users/{userId}/last-login
Update user's last login timestamp.

**Parameters:**
- `userId` (path): User ID

**Response:**
```json
{
  "message": "Last login updated successfully"
}
```

### 10. Update Last Login by Firebase UID
#### PATCH /api/users/firebase/{firebaseUid}/last-login
Update user's last login timestamp using Firebase UID.

**Parameters:**
- `firebaseUid` (path): Firebase UID

**Response:**
```json
{
  "message": "Last login updated successfully"
}
```

### 11. Follow User
#### POST /api/users/{userId}/follow/{targetUserId}
Follow another user.

**Parameters:**
- `userId` (path): Current user ID
- `targetUserId` (path): Target user ID to follow

**Response:**
```json
{
  "message": "User followed successfully"
}
```

### 12. Unfollow User
#### DELETE /api/users/{userId}/follow/{targetUserId}
Unfollow a user.

**Parameters:**
- `userId` (path): Current user ID
- `targetUserId` (path): Target user ID to unfollow

**Response:**
```json
{
  "message": "User unfollowed successfully"
}
```

### 13. Block User
#### POST /api/users/{userId}/block/{targetUserId}
Block another user.

**Parameters:**
- `userId` (path): Current user ID
- `targetUserId` (path): Target user ID to block

**Response:**
```json
{
  "message": "User blocked successfully"
}
```

### 14. Unblock User
#### DELETE /api/users/{userId}/block/{targetUserId}
Unblock a user.

**Parameters:**
- `userId` (path): Current user ID
- `targetUserId` (path): Target user ID to unblock

**Response:**
```json
{
  "message": "User unblocked successfully"
}
```

### 15. Get User Followers
#### GET /api/users/{userId}/followers
Get list of users following this user.

**Parameters:**
- `userId` (path): User ID

**Response:** Array of UserDTO objects

### 16. Get User Following
#### GET /api/users/{userId}/following
Get list of users this user is following.

**Parameters:**
- `userId` (path): User ID

**Response:** Array of UserDTO objects

### 17. Update Notification Preferences
#### PUT /api/users/{userId}/notifications
Update user's notification preferences.

**Parameters:**
- `userId` (path): User ID

**Request Body:**
```json
{
  "pushNotificationsEnabled": boolean,
  "emailNotificationsEnabled": boolean,
  "workoutRemindersEnabled": boolean,
  "socialNotificationsEnabled": boolean
}
```

**Response:** Updated UserDTO object

---

## Posts Management (`/api/posts`)

### 1. Get All Posts
#### GET /api/posts?page={page}&size={size}
Get paginated list of posts.

**Parameters:**
- `page` (query, optional): Page number (default: 0)
- `size` (query, optional): Page size (default: 20)

**Response:** Array of PostDTO objects

### 2. Get Post by ID
#### GET /api/posts/{id}
Get specific post by ID.

**Parameters:**
- `id` (path): Post ID

**Response:** PostDTO object

### 3. Create Post
#### POST /api/posts
Create a new post.

**Request Body:** CreatePostRequest object

**Response:** PostDTO object with 201 status

### 4. Update Post
#### PUT /api/posts/{id}
Update existing post.

**Parameters:**
- `id` (path): Post ID

**Request Body:** UpdatePostRequest object

**Response:** Updated PostDTO object

### 5. Delete Post
#### DELETE /api/posts/{id}
Delete a post.

**Parameters:**
- `id` (path): Post ID

**Response:** 204 No Content

---

## Workouts Management (`/api/workouts`)

### 1. Get All Workouts
#### GET /api/workouts
Get list of all workouts.

**Response:** Array of WorkoutDTO objects

### 2. Get Workout by ID
#### GET /api/workouts/{workoutId}
Get specific workout by ID.

**Parameters:**
- `workoutId` (path): Workout ID

**Response:** WorkoutDTO object

### 3. Create Workout
#### POST /api/workouts
Create a new workout.

**Request Body:** CreateWorkoutRequest object

**Response:** WorkoutDTO object with 201 status

### 4. Update Workout
#### PUT /api/workouts/{workoutId}
Update existing workout.

**Parameters:**
- `workoutId` (path): Workout ID

**Request Body:** UpdateWorkoutRequest object

**Response:** Updated WorkoutDTO object

### 5. Delete Workout
#### DELETE /api/workouts/{workoutId}
Delete a workout.

**Parameters:**
- `workoutId` (path): Workout ID

**Response:** 204 No Content

---

## Additional Controllers

The API also includes the following controllers (detailed documentation available on request):

- **UserProfileController** (`/api/user-profiles`) - User profile management
- **UserMacroTrackerController** (`/api/user-macro-trackers`) - Nutrition tracking
- **UserFoodLogController** (`/api/user-food-logs`) - Food logging
- **UserFitnessTrackerController** (`/api/user-fitness-trackers`) - Fitness tracking
- **UserFinishedWorkoutController** (`/api/user-finished-workouts`) - Workout completion
- **TrainerController** (`/api/trainers`) - Trainer management
- **NotificationController** (`/api/notifications`) - Notification system
- **LikeController** (`/api/likes`) - Like functionality
- **LeaderboardController** (`/api/leaderboards`) - Leaderboard system
- **FoodController** (`/api/foods`) - Food database
- **ExerciseController** (`/api/exercises`) - Exercise database
- **CommentController** (`/api/comments`) - Comment system
- **AppointmentController** (`/api/appointments`) - Appointment scheduling

---

## Frontend Integration

### Authentication Flow
1. User signs up/in through Firebase Auth
2. Firebase provides JWT token
3. Frontend includes token in Authorization header
4. Backend validates token and processes request

### Example API Call (JavaScript)
```javascript
// Get user by Firebase UID
const response = await fetch('/api/users/firebase/abc123', {
  headers: {
    'Authorization': `Bearer ${firebaseToken}`,
    'Content-Type': 'application/json'
  }
});

const user = await response.json();
```

### Vite Proxy Configuration
The frontend uses Vite proxy to route `/api/*` requests to the backend:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false
    }
  }
}
```

---

## CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174` (Alternative dev server)

All HTTP methods are allowed: GET, POST, PUT, DELETE, PATCH, OPTIONS

---

## Development Notes

### Authentication Flow Improvements
- **Primary Data Store**: Spring Boot backend with MySQL/PostgreSQL
- **Authentication**: Firebase Auth (provides automatic `lastSignInTime` tracking)
- **Session Management**: JWT tokens with automatic refresh
- **Removed Redundancy**: Eliminated Firestore for user data to avoid permission issues

### Error Handling
- Network timeouts are set to 30 seconds
- Automatic token refresh on 401 errors
- Graceful fallback handling for backend unavailability

### Best Practices
- Always include proper error handling
- Use environment variables for API URLs
- Implement proper loading states
- Handle authentication state changes
- Use TypeScript for better type safety (recommended)

---

## Contact
For questions or issues with the API, please contact the development team.