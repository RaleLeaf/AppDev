# baSICK Backend API Documentation

This document provides a comprehensive overview of all API endpoints available in the baSICK fitness application backend.

## Base URL
```
http://localhost:8080/api
```

## Authentication
Most endpoints require authentication. Include the user's Firebase token in the Authorization header:
```
Authorization: Bearer <firebase-token>
```

---

## Health Check

### GET /health
**Description:** Check if the backend service is running  
**Authentication:** Not required  
**Response:**
```json
{
  "status": "UP",
  "message": "Backend is running and CORS is configured"
}
```

---

## User Management

### GET /users
**Description:** Get all users (admin only)  
**Authentication:** Required  
**Response:** Array of UserDTO objects

### GET /users/{userId}
**Description:** Get user by ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** UserDTO object

### GET /users/firebase/{firebaseUid}
**Description:** Get user by Firebase UID  
**Authentication:** Required  
**Parameters:**
- `firebaseUid` (path) - Firebase UID
**Response:** UserDTO object

### GET /users/email/{email}
**Description:** Get user by email  
**Authentication:** Required  
**Parameters:**
- `email` (path) - User email
**Response:** UserDTO object

### POST /users
**Description:** Create a new user  
**Authentication:** Required  
**Request Body:** CreateUserRequest
```json
{
  "firebaseUid": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "authType": "string",
  "role": "string",
  "isEmailVerified": boolean,
  "isPhoneVerified": boolean,
  "isActive": boolean,
  "pushNotificationsEnabled": boolean,
  "emailNotificationsEnabled": boolean,
  "workoutRemindersEnabled": boolean,
  "socialNotificationsEnabled": boolean,
  "subscriptionType": "string",
  "subscriptionExpiresAt": "timestamp"
}
```
**Response:** UserDTO object

### PUT /users/{userId}
**Description:** Update user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Request Body:** UpdateUserRequest  
**Response:** UserDTO object

### DELETE /users/{userId}
**Description:** Delete user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** 204 No Content

### POST /users/{userId}/follow/{targetUserId}
**Description:** Follow a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - Current user ID
- `targetUserId` (path) - User to follow
**Response:** Success message

### DELETE /users/{userId}/follow/{targetUserId}
**Description:** Unfollow a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - Current user ID
- `targetUserId` (path) - User to unfollow
**Response:** Success message

### POST /users/{userId}/block/{targetUserId}
**Description:** Block a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - Current user ID
- `targetUserId` (path) - User to block
**Response:** Success message

### DELETE /users/{userId}/block/{targetUserId}
**Description:** Unblock a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - Current user ID
- `targetUserId` (path) - User to unblock
**Response:** Success message

### PUT /users/{userId}/notifications
**Description:** Update notification preferences  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Request Body:** NotificationPreferencesRequest  
**Response:** UserDTO object

### GET /users/search?query={query}
**Description:** Search users by name or username  
**Authentication:** Required  
**Parameters:**
- `query` (query) - Search query
**Response:** Array of UserDTO objects

### GET /users/{userId}/followers
**Description:** Get user's followers  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of UserDTO objects

### GET /users/{userId}/following
**Description:** Get users that this user is following  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of UserDTO objects

---

## Leaderboard Management

### GET /leaderboards
**Description:** Get all leaderboards  
**Authentication:** Required  
**Response:** Array of LeaderboardDTO objects

### GET /leaderboards/{leaderboardId}
**Description:** Get leaderboard by ID  
**Authentication:** Required  
**Parameters:**
- `leaderboardId` (path) - Leaderboard ID
**Response:** LeaderboardDTO object

### POST /leaderboards
**Description:** Create a new leaderboard entry  
**Authentication:** Required  
**Request Body:** CreateLeaderboardRequest
```json
{
  "userId": "string (required)",
  "category": "string (required)",
  "timeframe": "string (required)",
  "score": "number (required)",
  "unit": "string",
  "userName": "string",
  "userProfilePicture": "string"
}
```
**Response:** LeaderboardDTO object

### PUT /leaderboards/{leaderboardId}
**Description:** Update leaderboard entry  
**Authentication:** Required  
**Parameters:**
- `leaderboardId` (path) - Leaderboard ID
**Request Body:** UpdateLeaderboardRequest  
**Response:** LeaderboardDTO object

### DELETE /leaderboards/{leaderboardId}
**Description:** Delete leaderboard entry  
**Authentication:** Required  
**Parameters:**
- `leaderboardId` (path) - Leaderboard ID
**Response:** 204 No Content

### GET /leaderboards/category/{category}
**Description:** Get leaderboards by category  
**Authentication:** Required  
**Parameters:**
- `category` (path) - Leaderboard category
**Response:** Array of LeaderboardDTO objects

### GET /leaderboards/timeframe/{timeframe}
**Description:** Get leaderboards by timeframe  
**Authentication:** Required  
**Parameters:**
- `timeframe` (path) - Timeframe (e.g., weekly, monthly)
**Response:** Array of LeaderboardDTO objects

### GET /leaderboards/category/{category}/timeframe/{timeframe}
**Description:** Get leaderboards by category and timeframe  
**Authentication:** Required  
**Parameters:**
- `category` (path) - Leaderboard category
- `timeframe` (path) - Timeframe
**Response:** Array of LeaderboardDTO objects

### GET /leaderboards/category/{category}/timeframe/{timeframe}/ranked
**Description:** Get ranked leaderboards by category and timeframe  
**Authentication:** Required  
**Parameters:**
- `category` (path) - Leaderboard category
- `timeframe` (path) - Timeframe
**Response:** Array of LeaderboardDTO objects (sorted by rank)

### GET /leaderboards/active
**Description:** Get active leaderboards  
**Authentication:** Required  
**Response:** Array of LeaderboardDTO objects

### GET /leaderboards/user/{userId}
**Description:** Get leaderboards by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of LeaderboardDTO objects

### GET /leaderboards/user/{userId}/category/{category}/timeframe/{timeframe}
**Description:** Get user's rank in specific category and timeframe  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `category` (path) - Category
- `timeframe` (path) - Timeframe
**Response:** LeaderboardDTO object

### PATCH /leaderboards/user/{userId}/category/{category}/timeframe/{timeframe}/rank?newRank={newRank}
**Description:** Update user's rank  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `category` (path) - Category
- `timeframe` (path) - Timeframe
- `newRank` (query) - New rank value
**Response:** LeaderboardDTO object

### PATCH /leaderboards/user/{userId}/category/{category}/timeframe/{timeframe}/score?newScore={newScore}
**Description:** Update user's score  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `category` (path) - Category
- `timeframe` (path) - Timeframe
- `newScore` (query) - New score value
**Response:** LeaderboardDTO object

### GET /leaderboards/stats
**Description:** Get leaderboard statistics  
**Authentication:** Required  
**Response:**
```json
{
  "totalLeaderboards": number
}
```

---

## Appointment Management

### GET /appointments
**Description:** Get all appointments  
**Authentication:** Required  
**Response:** Array of AppointmentDTO objects

### GET /appointments/{appointmentId}
**Description:** Get appointment by ID  
**Authentication:** Required  
**Parameters:**
- `appointmentId` (path) - Appointment ID
**Response:** AppointmentDTO object

### POST /appointments
**Description:** Create a new appointment  
**Authentication:** Required  
**Request Body:** CreateAppointmentRequest
```json
{
  "clientId": "string (required)",
  "trainerId": "string (required)",
  "scheduledStartTime": "string (required)",
  "durationMinutes": "number (required)",
  "title": "string",
  "description": "string",
  "serviceType": "string",
  "location": "string",
  "meetingType": "string",
  "meetingLink": "string",
  "meetingPassword": "string",
  "price": "number",
  "currency": "string",
  "isPackageSession": "boolean",
  "packageId": "string",
  "clientNotes": "string",
  "followUpRequired": "boolean",
  "followUpNotes": "string",
  "isRecurring": "boolean",
  "recurrencePattern": "string",
  "parentAppointmentId": "string",
  "recurrenceCount": "number",
  "preparationInstructions": "object",
  "equipmentNeeded": "string",
  "specialRequirements": "string",
  "trainerName": "string",
  "clientName": "string"
}
```
**Response:** AppointmentDTO object

### PUT /appointments/{appointmentId}
**Description:** Update appointment  
**Authentication:** Required  
**Parameters:**
- `appointmentId` (path) - Appointment ID
**Request Body:** UpdateAppointmentRequest  
**Response:** AppointmentDTO object

### DELETE /appointments/{appointmentId}
**Description:** Delete appointment  
**Authentication:** Required  
**Parameters:**
- `appointmentId` (path) - Appointment ID
**Response:** 204 No Content

### GET /appointments/client/{clientId}
**Description:** Get appointments by client ID  
**Authentication:** Required  
**Parameters:**
- `clientId` (path) - Client ID
**Response:** Array of AppointmentDTO objects

### GET /appointments/trainer/{trainerId}
**Description:** Get appointments by trainer ID  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** Array of AppointmentDTO objects

### GET /appointments/status/{status}
**Description:** Get appointments by status  
**Authentication:** Required  
**Parameters:**
- `status` (path) - Appointment status
**Response:** Array of AppointmentDTO objects

### GET /appointments/client/{clientId}/status/{status}
**Description:** Get appointments by client ID and status  
**Authentication:** Required  
**Parameters:**
- `clientId` (path) - Client ID
- `status` (path) - Status
**Response:** Array of AppointmentDTO objects

### GET /appointments/trainer/{trainerId}/status/{status}
**Description:** Get appointments by trainer ID and status  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
- `status` (path) - Status
**Response:** Array of AppointmentDTO objects

### GET /appointments/service-type/{serviceType}
**Description:** Get appointments by service type  
**Authentication:** Required  
**Parameters:**
- `serviceType` (path) - Service type
**Response:** Array of AppointmentDTO objects

### GET /appointments/payment-status/{paymentStatus}
**Description:** Get appointments by payment status  
**Authentication:** Required  
**Parameters:**
- `paymentStatus` (path) - Payment status
**Response:** Array of AppointmentDTO objects

### GET /appointments/client/{clientId}/upcoming
**Description:** Get upcoming appointments by client ID  
**Authentication:** Required  
**Parameters:**
- `clientId` (path) - Client ID
**Response:** Array of AppointmentDTO objects

### GET /appointments/trainer/{trainerId}/upcoming
**Description:** Get upcoming appointments by trainer ID  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** Array of AppointmentDTO objects

### PATCH /appointments/{appointmentId}/confirm
**Description:** Confirm an appointment  
**Authentication:** Required  
**Parameters:**
- `appointmentId` (path) - Appointment ID
**Response:** AppointmentDTO object

### PATCH /appointments/{appointmentId}/cancel?cancellationReason={reason}
**Description:** Cancel an appointment  
**Authentication:** Required  
**Parameters:**
- `appointmentId` (path) - Appointment ID
- `cancellationReason` (query, optional) - Reason for cancellation
**Response:** AppointmentDTO object

### PATCH /appointments/{appointmentId}/complete
**Description:** Complete an appointment  
**Authentication:** Required  
**Parameters:**
- `appointmentId` (path) - Appointment ID
**Response:** AppointmentDTO object

### PATCH /appointments/{appointmentId}/start
**Description:** Start an appointment  
**Authentication:** Required  
**Parameters:**
- `appointmentId` (path) - Appointment ID
**Response:** AppointmentDTO object

### GET /appointments/stats
**Description:** Get appointment statistics  
**Authentication:** Required  
**Response:**
```json
{
  "totalAppointments": number
}
```

---

## Trainer Management

### GET /trainers
**Description:** Get all trainers  
**Authentication:** Required  
**Response:** Array of TrainerDTO objects

### GET /trainers/{trainerId}
**Description:** Get trainer by ID  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** TrainerDTO object

### GET /trainers/user/{userId}
**Description:** Get trainer by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** TrainerDTO object

### POST /trainers
**Description:** Create a new trainer  
**Authentication:** Required  
**Request Body:** CreateTrainerRequest
```json
{
  "userId": "string (required)",
  "businessName": "string (required)",
  "bio": "string",
  "profilePictureUrl": "string",
  "certifications": ["string"],
  "specializations": ["string"],
  "experienceYears": "number",
  "phoneNumber": "string",
  "email": "string",
  "website": "string",
  "location": "string",
  "timezone": "string",
  "isAvailableOnline": "boolean",
  "isAvailableInPerson": "boolean",
  "hourlyRate": "number",
  "packageRate": "number",
  "currency": "string",
  "servicePricing": "object",
  "availability": "object",
  "isAcceptingNewClients": "boolean",
  "maxClientsPerSlot": "number",
  "testimonials": ["string"],
  "beforeAfterPhotos": ["string"],
  "instagramHandle": "string",
  "youtubeChannel": "string",
  "verificationDocuments": ["string"],
  "isSubscriptionBased": "boolean",
  "monthlySubscriptionRate": "number"
}
```
**Response:** TrainerDTO object

### PUT /trainers/{trainerId}
**Description:** Update trainer  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Request Body:** UpdateTrainerRequest  
**Response:** TrainerDTO object

### DELETE /trainers/{trainerId}
**Description:** Delete trainer  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** 204 No Content

### GET /trainers/specialization/{specialization}
**Description:** Get trainers by specialization  
**Authentication:** Required  
**Parameters:**
- `specialization` (path) - Specialization
**Response:** Array of TrainerDTO objects

### GET /trainers/location/{location}
**Description:** Get trainers by location  
**Authentication:** Required  
**Parameters:**
- `location` (path) - Location
**Response:** Array of TrainerDTO objects

### GET /trainers/verified
**Description:** Get verified trainers  
**Authentication:** Required  
**Response:** Array of TrainerDTO objects

### GET /trainers/accepting-clients
**Description:** Get trainers accepting new clients  
**Authentication:** Required  
**Response:** Array of TrainerDTO objects

### GET /trainers/verification-status/{verificationStatus}
**Description:** Get trainers by verification status  
**Authentication:** Required  
**Parameters:**
- `verificationStatus` (path) - Verification status
**Response:** Array of TrainerDTO objects

### GET /trainers/online
**Description:** Get online trainers  
**Authentication:** Required  
**Response:** Array of TrainerDTO objects

### GET /trainers/in-person
**Description:** Get in-person trainers  
**Authentication:** Required  
**Response:** Array of TrainerDTO objects

### GET /trainers/top-rated?limit={limit}
**Description:** Get top-rated trainers  
**Authentication:** Required  
**Parameters:**
- `limit` (query, default: 10) - Number of trainers to return
**Response:** Array of TrainerDTO objects

### GET /trainers/search?businessName={businessName}
**Description:** Search trainers by business name  
**Authentication:** Required  
**Parameters:**
- `businessName` (query) - Business name to search
**Response:** Array of TrainerDTO objects

### PATCH /trainers/{trainerId}/verify
**Description:** Verify a trainer  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** TrainerDTO object

### PATCH /trainers/{trainerId}/reject-verification
**Description:** Reject trainer verification  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** TrainerDTO object

### PATCH /trainers/{trainerId}/review?rating={rating}
**Description:** Add a review to trainer  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
- `rating` (query) - Rating value
**Response:** TrainerDTO object

### PATCH /trainers/{trainerId}/increment-sessions
**Description:** Increment trainer sessions count  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** TrainerDTO object

### PATCH /trainers/{trainerId}/increment-clients
**Description:** Increment trainer clients count  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** TrainerDTO object

### PATCH /trainers/{trainerId}/update-activity
**Description:** Update last active timestamp  
**Authentication:** Required  
**Parameters:**
- `trainerId` (path) - Trainer ID
**Response:** TrainerDTO object

### GET /trainers/stats
**Description:** Get trainer statistics  
**Authentication:** Required  
**Response:**
```json
{
  "totalTrainers": number
}
```

---

## Post Management

### GET /posts?page={page}&size={size}
**Description:** Get all posts with pagination  
**Authentication:** Required  
**Parameters:**
- `page` (query, default: 0) - Page number
- `size` (query, default: 20) - Page size
**Response:** Array of PostDTO objects

### GET /posts/{id}
**Description:** Get post by ID  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Post ID
**Response:** PostDTO object

### GET /posts/author/{authorId}
**Description:** Get posts by author ID  
**Authentication:** Required  
**Parameters:**
- `authorId` (path) - Author ID
**Response:** Array of PostDTO objects

### GET /posts/type/{postType}
**Description:** Get posts by type  
**Authentication:** Required  
**Parameters:**
- `postType` (path) - Post type
**Response:** Array of PostDTO objects

### POST /posts
**Description:** Create a new post  
**Authentication:** Required  
**Request Body:** CreatePostRequest  
**Response:** PostDTO object

### PUT /posts/{id}
**Description:** Update post  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Post ID
**Request Body:** UpdatePostRequest  
**Response:** PostDTO object

### DELETE /posts/{id}
**Description:** Delete post  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Post ID
**Response:** 204 No Content

### GET /posts/tags
**Description:** Get all available tags  
**Authentication:** Required  
**Response:** Array of tag strings

### GET /posts/trending
**Description:** Get trending posts  
**Authentication:** Required  
**Response:** Array of PostDTO objects

---

## Comment Management

### GET /comments/post/{postId}
**Description:** Get all comments for a post  
**Authentication:** Required  
**Parameters:**
- `postId` (path) - Post ID
**Response:** Array of CommentDTO objects

### GET /comments/user/{userId}
**Description:** Get all comments by a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of CommentDTO objects

### GET /comments/{id}
**Description:** Get comment by ID  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Comment ID
**Response:** CommentDTO object

### POST /comments
**Description:** Create a new comment  
**Authentication:** Required  
**Request Body:** CreateCommentRequest  
**Response:** CommentDTO object

### PUT /comments/{id}
**Description:** Update comment  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Comment ID
**Request Body:** UpdateCommentRequest  
**Response:** CommentDTO object

### DELETE /comments/{id}
**Description:** Delete comment  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Comment ID
**Response:** 204 No Content

### GET /comments/post/{postId}/count
**Description:** Get comment count for a post  
**Authentication:** Required  
**Parameters:**
- `postId` (path) - Post ID
**Response:** Number

### GET /comments/user/{userId}/recent
**Description:** Get recent comments by a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of CommentDTO objects

---

## Like Management

### GET /likes/post/{postId}
**Description:** Get all likes for a post  
**Authentication:** Required  
**Parameters:**
- `postId` (path) - Post ID
**Response:** Array of LikeDTO objects

### GET /likes/user/{userId}
**Description:** Get all likes by a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of LikeDTO objects

### GET /likes/{id}
**Description:** Get like by ID  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Like ID
**Response:** LikeDTO object

### POST /likes
**Description:** Create a new like  
**Authentication:** Required  
**Request Body:** CreateLikeRequest  
**Response:** LikeDTO object

### DELETE /likes/{id}
**Description:** Delete like (unlike)  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Like ID
**Response:** 204 No Content

### GET /likes/user/{userId}/post/{postId}/exists
**Description:** Check if user has liked a post  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `postId` (path) - Post ID
**Response:** Boolean

### GET /likes/post/{postId}/count
**Description:** Get like count for a post  
**Authentication:** Required  
**Parameters:**
- `postId` (path) - Post ID
**Response:** Number

---

## Workout Management

### GET /workouts
**Description:** Get all workouts  
**Authentication:** Required  
**Response:** Array of WorkoutDTO objects

### GET /workouts/{workoutId}
**Description:** Get workout by ID  
**Authentication:** Required  
**Parameters:**
- `workoutId` (path) - Workout ID
**Response:** WorkoutDTO object

### POST /workouts
**Description:** Create a new workout  
**Authentication:** Required  
**Request Body:** CreateWorkoutRequest  
**Response:** WorkoutDTO object

### PUT /workouts/{workoutId}
**Description:** Update workout  
**Authentication:** Required  
**Parameters:**
- `workoutId` (path) - Workout ID
**Request Body:** UpdateWorkoutRequest  
**Response:** WorkoutDTO object

### DELETE /workouts/{workoutId}
**Description:** Delete workout  
**Authentication:** Required  
**Parameters:**
- `workoutId` (path) - Workout ID
**Response:** 204 No Content

### GET /workouts/search?name={name}
**Description:** Search workouts by name  
**Authentication:** Required  
**Parameters:**
- `name` (query) - Workout name to search
**Response:** Array of WorkoutDTO objects

### GET /workouts/difficulty/{difficulty}
**Description:** Get workouts by difficulty  
**Authentication:** Required  
**Parameters:**
- `difficulty` (path) - Difficulty level
**Response:** Array of WorkoutDTO objects

### GET /workouts/category/{category}
**Description:** Get workouts by category  
**Authentication:** Required  
**Parameters:**
- `category` (path) - Workout category
**Response:** Array of WorkoutDTO objects

### GET /workouts/creator/{creatorId}
**Description:** Get workouts by creator  
**Authentication:** Required  
**Parameters:**
- `creatorId` (path) - Creator ID
**Response:** Array of WorkoutDTO objects

---

## Exercise Management

### GET /exercises
**Description:** Get all exercises  
**Authentication:** Required  
**Response:** Array of ExerciseDTO objects

### GET /exercises/{exerciseId}
**Description:** Get exercise by ID  
**Authentication:** Required  
**Parameters:**
- `exerciseId` (path) - Exercise ID
**Response:** ExerciseDTO object

### POST /exercises
**Description:** Create a new exercise  
**Authentication:** Required  
**Request Body:** CreateExerciseRequest  
**Response:** ExerciseDTO object

### PUT /exercises/{exerciseId}
**Description:** Update exercise  
**Authentication:** Required  
**Parameters:**
- `exerciseId` (path) - Exercise ID
**Request Body:** UpdateExerciseRequest  
**Response:** ExerciseDTO object

### DELETE /exercises/{exerciseId}
**Description:** Delete exercise  
**Authentication:** Required  
**Parameters:**
- `exerciseId` (path) - Exercise ID
**Response:** 204 No Content

### GET /exercises/search?name={name}
**Description:** Search exercises by name  
**Authentication:** Required  
**Parameters:**
- `name` (query) - Exercise name to search
**Response:** Array of ExerciseDTO objects

### GET /exercises/muscle-group/{muscleGroup}
**Description:** Get exercises by muscle group  
**Authentication:** Required  
**Parameters:**
- `muscleGroup` (path) - Muscle group
**Response:** Array of ExerciseDTO objects

### GET /exercises/difficulty/{difficulty}
**Description:** Get exercises by difficulty  
**Authentication:** Required  
**Parameters:**
- `difficulty` (path) - Difficulty level
**Response:** Array of ExerciseDTO objects

### GET /exercises/category/{category}
**Description:** Get exercises by category  
**Authentication:** Required  
**Parameters:**
- `category` (path) - Exercise category
**Response:** Array of ExerciseDTO objects

---

## Food Management

### POST /foods
**Description:** Create a new food entry  
**Authentication:** Required  
**Request Body:** CreateFoodRequest  
**Response:** FoodDTO object

### GET /foods/{id}
**Description:** Get food by ID  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Food ID
**Response:** FoodDTO object

### PUT /foods/{id}
**Description:** Update food  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Food ID
**Request Body:** UpdateFoodRequest  
**Response:** FoodDTO object

### DELETE /foods/{id}
**Description:** Delete food  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Food ID
**Response:** 204 No Content

### GET /foods/search?name={name}
**Description:** Search foods by name  
**Authentication:** Required  
**Parameters:**
- `name` (query) - Food name to search
**Response:** Array of FoodDTO objects

### GET /foods/barcode/{barcode}
**Description:** Get food by barcode  
**Authentication:** Required  
**Parameters:**
- `barcode` (path) - Food barcode
**Response:** FoodDTO object

### GET /foods/category/{category}
**Description:** Get foods by category  
**Authentication:** Required  
**Parameters:**
- `category` (path) - Food category
**Response:** Array of FoodDTO objects

### GET /foods/popular
**Description:** Get popular foods  
**Authentication:** Required  
**Response:** Array of FoodDTO objects

### GET /foods/recent
**Description:** Get recently added foods  
**Authentication:** Required  
**Response:** Array of FoodDTO objects

---

## User Profile Management

### GET /profiles
**Description:** Get all user profiles  
**Authentication:** Required  
**Response:** Array of UserProfileDTO objects

### GET /profiles/public
**Description:** Get all public user profiles  
**Authentication:** Required  
**Response:** Array of UserProfileDTO objects

### POST /profiles
**Description:** Create or update user profile  
**Authentication:** Required  
**Request Body:** CreateUserProfileRequest  
**Response:** UserProfileDTO object

### PUT /profiles/{userId}
**Description:** Update user profile  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Request Body:** UpdateUserProfileRequest  
**Response:** UserProfileDTO object

### DELETE /profiles/{userId}
**Description:** Delete user profile  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** 204 No Content

---

## User Macro Tracker

### GET /user-macro-tracker/{id}
**Description:** Get macro tracker entry by ID  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Response:** UserMacroTrackerDTO object

### GET /user-macro-tracker/user/{userId}/date/{date}
**Description:** Get macro tracker by user and date  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `date` (path) - Date (YYYY-MM-DD)
**Response:** UserMacroTrackerDTO object

### GET /user-macro-tracker/user/{userId}
**Description:** Get all macro tracker entries for user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of UserMacroTrackerDTO objects

### GET /user-macro-tracker/user/{userId}/range?startDate={startDate}&endDate={endDate}
**Description:** Get macro tracker entries in date range  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `startDate` (query) - Start date
- `endDate` (query) - End date
**Response:** Array of UserMacroTrackerDTO objects

### POST /user-macro-tracker
**Description:** Create macro tracker entry  
**Authentication:** Required  
**Request Body:** CreateUserMacroTrackerRequest  
**Response:** UserMacroTrackerDTO object

### PUT /user-macro-tracker/{id}
**Description:** Update macro tracker entry  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Request Body:** UpdateUserMacroTrackerRequest  
**Response:** UserMacroTrackerDTO object

### DELETE /user-macro-tracker/{id}
**Description:** Delete macro tracker entry  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Response:** 204 No Content

### GET /user-macro-tracker/user/{userId}/summary/{date}
**Description:** Get daily macro summary  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `date` (path) - Date
**Response:** Macro summary object

### GET /user-macro-tracker/user/{userId}/summary/weekly/{startDate}
**Description:** Get weekly macro summary  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `startDate` (path) - Week start date
**Response:** Weekly macro summary object

### GET /user-macro-tracker/user/{userId}/summary/monthly/{startDate}
**Description:** Get monthly macro summary  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `startDate` (path) - Month start date
**Response:** Monthly macro summary object

---

## User Food Log

### GET /user-food-log/{id}
**Description:** Get food log entry by ID  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Response:** UserFoodLogDTO object

### POST /user-food-log
**Description:** Create food log entry  
**Authentication:** Required  
**Request Body:** CreateUserFoodLogRequest  
**Response:** UserFoodLogDTO object

### PUT /user-food-log/{id}
**Description:** Update food log entry  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Request Body:** UpdateUserFoodLogRequest  
**Response:** UserFoodLogDTO object

### DELETE /user-food-log/{id}
**Description:** Delete food log entry  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Response:** 204 No Content

### GET /user-food-log/user/{userId}
**Description:** Get all food log entries for user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of UserFoodLogDTO objects

### GET /user-food-log/user/{userId}/date/{date}
**Description:** Get food log entries by user and date  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `date` (path) - Date
**Response:** Array of UserFoodLogDTO objects

### GET /user-food-log/user/{userId}/date/{date}/meal/{mealType}
**Description:** Get food log entries by meal type  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `date` (path) - Date
- `mealType` (path) - Meal type (breakfast, lunch, dinner, snack)
**Response:** Array of UserFoodLogDTO objects

### GET /user-food-log/user/{userId}/recent
**Description:** Get recent food log entries  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of UserFoodLogDTO objects

### GET /user-food-log/user/{userId}/frequent
**Description:** Get frequently logged foods  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of UserFoodLogDTO objects

---

## User Fitness Tracker

### GET /user-fitness-tracker/user/{userId}
**Description:** Get all fitness tracker entries for user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of UserFitnessTrackerDTO objects

### GET /user-fitness-tracker/{id}
**Description:** Get fitness tracker entry by ID  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Response:** UserFitnessTrackerDTO object

### POST /user-fitness-tracker
**Description:** Create fitness tracker entry  
**Authentication:** Required  
**Request Body:** CreateUserFitnessTrackerRequest  
**Response:** UserFitnessTrackerDTO object

### PUT /user-fitness-tracker/{id}
**Description:** Update fitness tracker entry  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Request Body:** UpdateUserFitnessTrackerRequest  
**Response:** UserFitnessTrackerDTO object

### DELETE /user-fitness-tracker/{id}
**Description:** Delete fitness tracker entry  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Response:** 204 No Content

### GET /user-fitness-tracker/user/{userId}/date-range?startDate={startDate}&endDate={endDate}
**Description:** Get fitness tracker entries in date range  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `startDate` (query) - Start date
- `endDate` (query) - End date
**Response:** Array of UserFitnessTrackerDTO objects

### GET /user-fitness-tracker/user/{userId}/latest
**Description:** Get latest fitness tracker entry  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** UserFitnessTrackerDTO object

### GET /user-fitness-tracker/user/{userId}/summary
**Description:** Get fitness tracker summary  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Fitness summary object

---

## User Finished Workout

### GET /user-finished-workout/user/{userId}
**Description:** Get all finished workouts for user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of UserFinishedWorkoutDTO objects

### GET /user-finished-workout/{id}
**Description:** Get finished workout by ID  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Response:** UserFinishedWorkoutDTO object

### POST /user-finished-workout
**Description:** Create finished workout entry  
**Authentication:** Required  
**Request Body:** CreateUserFinishedWorkoutRequest  
**Response:** UserFinishedWorkoutDTO object

### PUT /user-finished-workout/{id}
**Description:** Update finished workout entry  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Request Body:** UpdateUserFinishedWorkoutRequest  
**Response:** UserFinishedWorkoutDTO object

### DELETE /user-finished-workout/{id}
**Description:** Delete finished workout entry  
**Authentication:** Required  
**Parameters:**
- `id` (path) - Entry ID
**Response:** 204 No Content

### GET /user-finished-workout/workout/{workoutId}
**Description:** Get finished workouts by workout ID  
**Authentication:** Required  
**Parameters:**
- `workoutId` (path) - Workout ID
**Response:** Array of UserFinishedWorkoutDTO objects

### GET /user-finished-workout/user/{userId}/date-range?startDate={startDate}&endDate={endDate}
**Description:** Get finished workouts in date range  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `startDate` (query) - Start date
- `endDate` (query) - End date
**Response:** Array of UserFinishedWorkoutDTO objects

### GET /user-finished-workout/user/{userId}/statistics
**Description:** Get workout statistics for user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Workout statistics object

---

## Notification Management

### GET /api/notifications
**Description:** Get all notifications  
**Authentication:** Required  
**Response:** Array of NotificationDTO objects

### GET /api/notifications/{notificationId}
**Description:** Get notification by ID  
**Authentication:** Required  
**Parameters:**
- `notificationId` (path) - Notification ID
**Response:** NotificationDTO object

### POST /api/notifications
**Description:** Create a new notification  
**Authentication:** Required  
**Request Body:** CreateNotificationRequest
```json
{
  "userId": "string (required)",
  "title": "string (required)", 
  "message": "string (required)",
  "type": "string (required)",
  "priority": "string (default: medium)",
  "actionType": "string",
  "actionData": "string",
  "senderUserId": "string",
  "senderUserName": "string",
  "senderUserProfilePicture": "string",
  "relatedEntityId": "string",
  "relatedEntityType": "string",
  "metadata": "object",
  "scheduledAt": "timestamp"
}
```
**Response:** NotificationDTO object

### PUT /api/notifications/{notificationId}
**Description:** Update notification  
**Authentication:** Required  
**Parameters:**
- `notificationId` (path) - Notification ID
**Request Body:** UpdateNotificationRequest  
**Response:** NotificationDTO object

### DELETE /api/notifications/{notificationId}
**Description:** Delete notification  
**Authentication:** Required  
**Parameters:**
- `notificationId` (path) - Notification ID
**Response:** 204 No Content

### GET /api/notifications/user/{userId}
**Description:** Get notifications by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of NotificationDTO objects

### GET /api/notifications/user/{userId}/unread
**Description:** Get unread notifications by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of NotificationDTO objects

### GET /api/notifications/user/{userId}/read
**Description:** Get read notifications by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of NotificationDTO objects

### GET /api/notifications/type/{type}
**Description:** Get notifications by type  
**Authentication:** Required  
**Parameters:**
- `type` (path) - Notification type (workout_reminder, social_interaction, appointment, system, etc.)
**Response:** Array of NotificationDTO objects

### GET /api/notifications/user/{userId}/type/{type}
**Description:** Get notifications by user ID and type  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `type` (path) - Notification type
**Response:** Array of NotificationDTO objects

### GET /api/notifications/priority/{priority}
**Description:** Get notifications by priority  
**Authentication:** Required  
**Parameters:**
- `priority` (path) - Priority level (high, medium, low)
**Response:** Array of NotificationDTO objects

### GET /api/notifications/user/{userId}/high-priority
**Description:** Get high priority notifications by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Array of NotificationDTO objects

### GET /api/notifications/sender/{senderUserId}
**Description:** Get notifications by sender user ID  
**Authentication:** Required  
**Parameters:**
- `senderUserId` (path) - Sender user ID
**Response:** Array of NotificationDTO objects

### GET /api/notifications/entity/{relatedEntityId}/type/{relatedEntityType}
**Description:** Get notifications by related entity  
**Authentication:** Required  
**Parameters:**
- `relatedEntityId` (path) - Related entity ID
- `relatedEntityType` (path) - Related entity type
**Response:** Array of NotificationDTO objects

### GET /api/notifications/user/{userId}/recent?limit={limit}
**Description:** Get recent notifications by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
- `limit` (query, default: 20) - Number of notifications to return
**Response:** Array of NotificationDTO objects

### PATCH /api/notifications/{notificationId}/read
**Description:** Mark notification as read  
**Authentication:** Required  
**Parameters:**
- `notificationId` (path) - Notification ID
**Response:** NotificationDTO object

### PATCH /api/notifications/{notificationId}/unread
**Description:** Mark notification as unread  
**Authentication:** Required  
**Parameters:**
- `notificationId` (path) - Notification ID
**Response:** NotificationDTO object

### PATCH /api/notifications/user/{userId}/mark-all-read
**Description:** Mark all notifications as read for a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Success message

### DELETE /api/notifications/user/{userId}
**Description:** Delete all notifications for a user  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** Success message

### GET /api/notifications/user/{userId}/unread/count
**Description:** Count unread notifications by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** 
```json
{
  "unreadCount": number
}
```

### GET /api/notifications/user/{userId}/count
**Description:** Count total notifications by user ID  
**Authentication:** Required  
**Parameters:**
- `userId` (path) - User ID
**Response:** 
```json
{
  "totalCount": number
}
```

### GET /api/notifications/stats
**Description:** Get notification statistics  
**Authentication:** Required  
**Response:** 
```json
{
  "totalNotifications": number
}
```

### POST /api/notifications/social
**Description:** Create a social notification  
**Authentication:** Required  
**Parameters:**
- `userId` (query) - Target user ID
- `title` (query) - Notification title
- `message` (query) - Notification message
- `type` (query) - Notification type
- `senderUserId` (query) - Sender user ID
- `senderUserName` (query) - Sender user name
- `senderUserProfilePicture` (query, optional) - Sender profile picture URL
**Response:** NotificationDTO object

### POST /api/notifications/action
**Description:** Create an action notification  
**Authentication:** Required  
**Parameters:**
- `userId` (query) - Target user ID
- `title` (query) - Notification title
- `message` (query) - Notification message
- `type` (query) - Notification type
- `actionType` (query) - Action type
- `actionData` (query, optional) - Action data
- `relatedEntityId` (query, optional) - Related entity ID
- `relatedEntityType` (query, optional) - Related entity type
**Response:** NotificationDTO object

### POST /api/notifications/workout-reminder
**Description:** Create a workout reminder notification  
**Authentication:** Required  
**Parameters:**
- `userId` (query) - Target user ID
- `workoutName` (query) - Workout name
**Response:** NotificationDTO object

### POST /api/notifications/follow
**Description:** Create a follow notification  
**Authentication:** Required  
**Parameters:**
- `userId` (query) - Target user ID
- `followerUserId` (query) - Follower user ID
- `followerUserName` (query) - Follower user name
- `followerProfilePicture` (query, optional) - Follower profile picture URL
**Response:** NotificationDTO object

### POST /api/notifications/like
**Description:** Create a like notification  
**Authentication:** Required  
**Parameters:**
- `userId` (query) - Target user ID
- `likerUserId` (query) - Liker user ID
- `likerUserName` (query) - Liker user name
- `likerProfilePicture` (query, optional) - Liker profile picture URL
- `postId` (query) - Post ID
**Response:** NotificationDTO object

### POST /api/notifications/comment
**Description:** Create a comment notification  
**Authentication:** Required  
**Parameters:**
- `userId` (query) - Target user ID
- `commenterUserId` (query) - Commenter user ID
- `commenterUserName` (query) - Commenter user name
- `commenterProfilePicture` (query, optional) - Commenter profile picture URL
- `postId` (query) - Post ID
**Response:** NotificationDTO object

### POST /api/notifications/appointment-reminder
**Description:** Create an appointment reminder notification  
**Authentication:** Required  
**Parameters:**
- `userId` (query) - Target user ID
- `appointmentId` (query) - Appointment ID
- `trainerName` (query) - Trainer name
- `appointmentTime` (query) - Appointment time
**Response:** NotificationDTO object

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Common Data Types

### UserDTO
```json
{
  "id": "string",
  "firebaseUid": "string",
  "name": "string",
  "email": "string",
  "phoneNumber": "string",
  "authType": "string",
  "role": "string",
  "isEmailVerified": "boolean",
  "isPhoneVerified": "boolean",
  "isActive": "boolean",
  "profileCreatedAt": "timestamp",
  "lastLoginAt": "timestamp",
  "pushNotificationsEnabled": "boolean",
  "emailNotificationsEnabled": "boolean",
  "workoutRemindersEnabled": "boolean",
  "socialNotificationsEnabled": "boolean",
  "subscriptionType": "string",
  "subscriptionExpiresAt": "timestamp",
  "followersCount": "number",
  "followingCount": "number",
  "blockedUsers": ["string"]
}
```

### LeaderboardDTO
```json
{
  "id": "string",
  "userId": "string",
  "userName": "string",
  "userProfilePicture": "string",
  "category": "string",
  "timeframe": "string",
  "score": "number",
  "unit": "string",
  "rank": "number",
  "isActive": "boolean",
  "lastUpdatedAt": "timestamp",
  "createdAt": "timestamp"
}
```

### AppointmentDTO
```json
{
  "id": "string",
  "clientId": "string",
  "trainerId": "string",
  "title": "string",
  "description": "string",
  "scheduledStartTime": "timestamp",
  "scheduledEndTime": "timestamp",
  "actualStartTime": "timestamp",
  "actualEndTime": "timestamp",
  "durationMinutes": "number",
  "status": "string",
  "serviceType": "string",
  "location": "string",
  "meetingType": "string",
  "meetingLink": "string",
  "meetingPassword": "string",
  "price": "number",
  "currency": "string",
  "paymentStatus": "string",
  "paymentId": "string",
  "isPackageSession": "boolean",
  "packageId": "string",
  "clientNotes": "string",
  "trainerNotes": "string",
  "followUpRequired": "boolean",
  "followUpNotes": "string",
  "cancellationReason": "string",
  "isRecurring": "boolean",
  "recurrencePattern": "string",
  "parentAppointmentId": "string",
  "recurrenceCount": "number",
  "preparationInstructions": "object",
  "equipmentNeeded": "string",
  "specialRequirements": "string",
  "trainerName": "string",
  "clientName": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### TrainerDTO
```json
{
  "id": "string",
  "userId": "string",
  "businessName": "string",
  "bio": "string",
  "profilePictureUrl": "string",
  "certifications": ["string"],
  "specializations": ["string"],
  "experienceYears": "number",
  "phoneNumber": "string",
  "email": "string",
  "website": "string",
  "location": "string",
  "timezone": "string",
  "isAvailableOnline": "boolean",
  "isAvailableInPerson": "boolean",
  "hourlyRate": "number",
  "packageRate": "number",
  "currency": "string",
  "servicePricing": "object",
  "availability": "object",
  "isAcceptingNewClients": "boolean",
  "maxClientsPerSlot": "number",
  "averageRating": "number",
  "totalReviews": "number",
  "totalSessions": "number",
  "totalClients": "number",
  "verificationStatus": "string",
  "verifiedAt": "timestamp",
  "isActive": "boolean",
  "testimonials": ["string"],
  "beforeAfterPhotos": ["string"],
  "instagramHandle": "string",
  "youtubeChannel": "string",
  "verificationDocuments": ["string"],
  "isSubscriptionBased": "boolean",
  "monthlySubscriptionRate": "number",
  "lastActiveAt": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### NotificationDTO
```json
{
  "id": "string",
  "userId": "string",
  "title": "string",
  "message": "string",
  "type": "string",
  "priority": "string",
  "isRead": "boolean",
  "actionType": "string",
  "actionData": "string",
  "senderUserId": "string",
  "senderUserName": "string",
  "senderUserProfilePicture": "string",
  "relatedEntityId": "string",
  "relatedEntityType": "string",
  "metadata": "object",
  "isPushSent": "boolean",
  "isEmailSent": "boolean",
  "scheduledAt": "timestamp",
  "readAt": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## Notes

1. All timestamps are in ISO 8601 format
2. All monetary values are in the specified currency
3. Authentication is handled via Firebase tokens
4. CORS is configured for localhost:5173 (frontend development)
5. All endpoints use JSON for request and response bodies
6. File uploads should use multipart/form-data when applicable
7. Rate limiting may apply to certain endpoints
8. Some endpoints may require additional permissions based on user roles

---

This documentation covers all available API endpoints in the baSICK fitness application backend. For any questions or issues, please refer to the source code or contact the development team.
