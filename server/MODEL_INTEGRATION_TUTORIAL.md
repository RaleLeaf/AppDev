# Step-by-Step Tutorial: Creating a New Model with Complete Integration

This tutorial demonstrates how to create a new model and integrate it with DTOs, repositories, services, controllers, and mappers following the established patterns in the baSICK project.

## Why This Architecture?

The baSICK project follows a **layered architecture** pattern that separates concerns and promotes maintainability:

- **Models**: Represent your data structure and business entities
- **DTOs (Data Transfer Objects)**: Control what data is exposed to/from the API
- **Mappers**: Convert between DTOs and Models safely
- **Services**: Contain business logic and orchestrate operations
- **Repositories**: Handle data persistence and retrieval
- **Controllers**: Handle HTTP requests/responses and validation

## Overview: Data Flow Architecture

```
Client Request → Controller → DTO → Mapper → Model → Service → Repository → Firestore
                     ↓
Client Response ← Controller ← DTO ← Mapper ← Model ← Service ← Repository ← Firestore
```

### **Why This Flow?**

1. **Separation of Concerns**: Each layer has one responsibility
2. **Testability**: Easy to unit test each layer independently
3. **Maintainability**: Changes in one layer don't affect others
4. **Security**: DTOs prevent exposing sensitive internal data
5. **Flexibility**: Easy to change data storage or API structure

## Example: Creating a "User Profile" Feature

Let's create a complete User Profile feature as an example to demonstrate every aspect of this architecture.

---

## **Step 1: Define the Model**

### **What is a Model?**
A **Model** represents the core data structure of your business entity. It's a Plain Old Java Object (POJO) that defines what data your application works with internally. Models should:
- Represent the actual data structure in your database
- Include all fields that will be stored
- Have proper constructors for object creation
- Use appropriate data types (including Firestore's `Timestamp` for dates)

### **Why Start with the Model?**
Starting with the model helps you:
1. **Define your data structure** clearly before building around it
2. **Establish field types and constraints** early in development
3. **Create a foundation** that other layers will build upon
4. **Think through your business requirements** before implementation

**Location**: `src/main/java/com/basick/app/model/`

Create `UserProfile.java`:

```java
package com.basick.app.model;

import java.util.List;
import com.google.cloud.Timestamp;

/**
 * Model class representing a user's fitness profile.
 * This class defines the structure of user profile data stored in Firestore.
 * 
 * Key Design Decisions:
 * - userId: String for flexibility with different ID formats
 * - Timestamp: Using Firestore's Timestamp for proper date handling
 * - List<String> goals: Allows multiple fitness goals per user
 * - Optional fields: Some fields can be null for partial profiles
 */
public class UserProfile {
    // Primary identifier - matches the document ID in Firestore
    private String userId;
    
    // Basic user information
    private String displayName;    // User's chosen display name
    private String email;          // User's email address
    private Integer age;           // User's age (Integer allows null)
    private String gender;         // User's gender identity
    
    // Fitness-specific information
    private String fitnessLevel;   // e.g., "Beginner", "Intermediate", "Advanced"
    private List<String> goals;    // e.g., ["weight-loss", "muscle-gain", "endurance"]
    
    // Physical measurements
    private Double height;         // Height in centimeters (Double allows precision)
    private Double weight;         // Weight in kilograms (Double allows precision)
    
    // Additional profile data
    private String profileImageUrl; // URL to user's profile image
    
    // Audit fields - automatically managed
    private Timestamp createdAt;   // When the profile was created
    private Timestamp updatedAt;   // When the profile was last updated

    // Default constructor - REQUIRED for Firestore deserialization
    // Firestore needs this to create objects when reading from database
    public UserProfile() {
    }

    // Full constructor - Used for creating complete objects
    // This constructor allows you to create a UserProfile with all fields set
    // Useful for mapping from DTOs or when you have all the data available
    public UserProfile(String userId, String displayName, String email, Integer age, 
                      String gender, String fitnessLevel, List<String> goals, 
                      Double height, Double weight, String profileImageUrl, 
                      Timestamp createdAt, Timestamp updatedAt) {
        this.userId = userId;
        this.displayName = displayName;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.fitnessLevel = fitnessLevel;
        this.goals = goals;
        this.height = height;
        this.weight = weight;
        this.profileImageUrl = profileImageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters - REQUIRED for Firestore serialization/deserialization
    // Firestore uses these methods to read/write data to/from the database
    // Each field needs both a getter and setter for proper data binding
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getFitnessLevel() { return fitnessLevel; }
    public void setFitnessLevel(String fitnessLevel) { this.fitnessLevel = fitnessLevel; }

    public List<String> getGoals() { return goals; }
    public void setGoals(List<String> goals) { this.goals = goals; }

    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}
```

---

## **Step 2: Create DTOs**

### **What are DTOs and Why Use Them?**

**DTOs (Data Transfer Objects)** are classes that define the structure of data sent to and received from your API. They serve as a **contract** between your API and its clients.

### **Key Benefits of DTOs:**
1. **API Stability**: Change internal models without breaking the API
2. **Security**: Control exactly what data is exposed externally
3. **Validation**: Add validation rules specific to API requests
4. **Documentation**: Clear API contracts for frontend developers
5. **Versioning**: Support multiple API versions with different DTOs

### **Types of DTOs We'll Create:**
- **Response DTO**: Data sent TO the client (GET requests)
- **Create Request DTO**: Data received FROM client for creation (POST requests)
- **Update Request DTO**: Data received FROM client for updates (PUT/PATCH requests)

### **Why Separate DTOs?**
- **Response DTOs** include all data (including timestamps, IDs)
- **Create Request DTOs** exclude auto-generated fields (like timestamps)
- **Update Request DTOs** make most fields optional for partial updates

**Location**: `src/main/java/com/basick/app/dto/userprofile/`

### 2.1 Response DTO - `UserProfileDTO.java`

```java
package com.basick.app.dto.userprofile;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Response DTO for User Profile data.
 * This class defines the structure of data sent TO clients.
 * 
 * Key Features:
 * - @JsonProperty: Controls JSON field names (snake_case for API consistency)
 * - String timestamps: Easier for frontend to handle than Timestamp objects
 * - All fields included: Complete representation for client consumption
 */
public class UserProfileDTO {
    // @JsonProperty converts Java camelCase to API snake_case
    // This allows Java conventions internally while maintaining API consistency
    @JsonProperty("user_id")
    private String userId;
    
    @JsonProperty("display_name")
    private String displayName;
    
    // Fields without @JsonProperty use their Java name in JSON
    private String email;
    private Integer age;
    private String gender;
    
    @JsonProperty("fitness_level")
    private String fitnessLevel;
    private List<String> goals;
    private Double height;
    private Double weight;
    
    @JsonProperty("profile_image_url")
    private String profileImageUrl;
    
    // Timestamps converted to strings for easier frontend handling
    @JsonProperty("created_at")
    private String createdAt;
    
    @JsonProperty("updated_at")
    private String updatedAt;

    // Default constructor - Required for JSON deserialization
    public UserProfileDTO() {
    }

    // Full constructor - Used by mappers to create complete DTO objects
    public UserProfileDTO(String userId, String displayName, String email, Integer age, 
                         String gender, String fitnessLevel, List<String> goals, 
                         Double height, Double weight, String profileImageUrl, 
                         String createdAt, String updatedAt) {
        this.userId = userId;
        this.displayName = displayName;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.fitnessLevel = fitnessLevel;
        this.goals = goals;
        this.height = height;
        this.weight = weight;
        this.profileImageUrl = profileImageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters - Required for JSON serialization
    // ... (add all getters and setters for each field)
}
```

### 2.2 Create Request DTO - `CreateUserProfileRequest.java`

```java
package com.basick.app.dto.userprofile;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Request DTO for creating new User Profiles.
 * This class defines what data clients must send to create a user profile.
 * 
 * Key Design Decisions:
 * - No userId: Will be provided in the URL path parameter
 * - No timestamps: Automatically generated by the system
 * - Required vs Optional: Only essential fields are required
 * - Same JSON naming: Consistent with response DTO
 */
public class CreateUserProfileRequest {
    @JsonProperty("display_name")
    private String displayName;  // Required - every user needs a display name
    
    private String email;        // Required - for user identification
    private Integer age;         // Optional - user may not want to share
    private String gender;       // Optional - user may prefer not to specify
    
    @JsonProperty("fitness_level")
    private String fitnessLevel; // Optional - user may set this later
    
    private List<String> goals;  // Optional - user may define goals gradually
    private Double height;       // Optional - physical measurements
    private Double weight;       // Optional - physical measurements
    
    @JsonProperty("profile_image_url")
    private String profileImageUrl; // Optional - user may add image later

    // Default constructor - Required for JSON deserialization
    public CreateUserProfileRequest() {
    }

    // Getters and Setters - Required for JSON binding
    // ... (add all getters and setters for each field)
}
```

### 2.3 Update Request DTO - `UpdateUserProfileRequest.java`

```java
package com.basick.app.dto.userprofile;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Request DTO for updating existing User Profiles.
 * This class defines what data clients can send to update a user profile.
 * 
 * Key Design Decisions:
 * - All fields optional: Supports partial updates (only send what changed)
 * - No email updates: Email is typically immutable after creation
 * - No userId: Cannot change user identity
 * - No timestamps: System manages these automatically
 */
public class UpdateUserProfileRequest {
    // All fields are optional - allows partial updates
    // Client only sends fields they want to change
    
    @JsonProperty("display_name")
    private String displayName;  // Optional - user can change display name
    
    private Integer age;         // Optional - user can update age
    private String gender;       // Optional - user can update gender
    
    @JsonProperty("fitness_level")
    private String fitnessLevel; // Optional - fitness level can change over time
    
    private List<String> goals;  // Optional - goals can be updated
    private Double height;       // Optional - height can be corrected
    private Double weight;       // Optional - weight changes frequently
    
    @JsonProperty("profile_image_url")
    private String profileImageUrl; // Optional - user can change profile image

    // Default constructor - Required for JSON deserialization
    public UpdateUserProfileRequest() {
    }

    // Getters and Setters - Required for JSON binding
    // Note: All fields are optional, so null values are acceptable
    // ... (add all getters and setters for each field)
}
```

---

## **Step 3: Create Mapper**

### **What are Mappers and Why Use Them?**

**Mappers** are utility classes that convert between different object types. They act as **translators** between your internal models and external DTOs.

### **Key Benefits of Mappers:**
1. **Separation of Concerns**: Keep conversion logic separate from business logic
2. **Reusability**: Use the same mapping logic across multiple places
3. **Maintainability**: Change mapping rules in one place
4. **Type Safety**: Handle data type conversions safely
5. **Null Safety**: Handle null values gracefully

### **Types of Mapping Methods:**
- **toDTO()**: Convert Model → Response DTO (for sending to client)
- **fromCreateRequest()**: Convert Create DTO → Model (for new objects)
- **fromUpdateRequest()**: Convert Update DTO → Model (merging with existing data)

**Location**: `src/main/java/com/basick/app/mapper/`

Create `UserProfileMapper.java`:

```java
package com.basick.app.mapper;

import com.basick.app.dto.userprofile.CreateUserProfileRequest;
import com.basick.app.dto.userprofile.UpdateUserProfileRequest;
import com.basick.app.dto.userprofile.UserProfileDTO;
import com.basick.app.model.UserProfile;
import com.google.cloud.Timestamp;

/**
 * Mapper class for converting between UserProfile models and DTOs.
 * This class handles all the conversion logic between internal models and API DTOs.
 * 
 * Key Features:
 * - Static methods: No need to create mapper instances
 * - Null safety: Handles null inputs gracefully
 * - Type conversions: Handles Timestamp ↔ String conversions
 * - Defensive programming: Checks for null before processing
 */
public class UserProfileMapper {

    /**
     * Converts a UserProfile model to a UserProfileDTO for API responses.
     * This method handles internal → external data conversion.
     * 
     * @param userProfile The internal model object
     * @param userId The user ID (sometimes stored separately)
     * @return UserProfileDTO for API response, or null if input is null
     */
    public static UserProfileDTO toDTO(UserProfile userProfile, String userId) {
        // Null safety: Always check inputs before processing
        if (userProfile == null) {
            return null;
        }

        // Create and return the DTO with converted data
        return new UserProfileDTO(
            userId,  // User ID from parameter (often from URL path)
            userProfile.getDisplayName(),
            userProfile.getEmail(),
            userProfile.getAge(),
            userProfile.getGender(),
            userProfile.getFitnessLevel(),
            userProfile.getGoals(),
            userProfile.getHeight(),
            userProfile.getWeight(),
            userProfile.getProfileImageUrl(),
            // Convert Timestamp to String for API compatibility
            // Handle potential null timestamps gracefully
            userProfile.getCreatedAt() != null ? userProfile.getCreatedAt().toString() : null,
            userProfile.getUpdatedAt() != null ? userProfile.getUpdatedAt().toString() : null
        );
    }

    /**
     * Converts a CreateUserProfileRequest DTO to a UserProfile model.
     * This method handles external → internal data conversion for new objects.
     * 
     * @param request The create request DTO from the client
     * @param userId The user ID (from URL path parameter)
     * @return UserProfile model ready for persistence, or null if input is null
     */
    public static UserProfile fromCreateRequest(CreateUserProfileRequest request, String userId) {
        // Null safety: Always check inputs
        if (request == null) {
            return null;
        }

        return new UserProfile(
            userId,
            request.getDisplayName(),
            request.getEmail(),
            request.getAge(),
            request.getGender(),
            request.getFitnessLevel(),
            request.getGoals(),
            request.getHeight(),
            request.getWeight(),
            request.getProfileImageUrl(),
            Timestamp.now(),
            Timestamp.now()
        );
    }

    public static UserProfile fromUpdateRequest(UpdateUserProfileRequest request, UserProfile existing) {
        if (request == null || existing == null) {
            return null;
        }

        return new UserProfile(
            existing.getUserId(),
            request.getDisplayName() != null ? request.getDisplayName() : existing.getDisplayName(),
            existing.getEmail(), // Email shouldn't be updatable
            request.getAge() != null ? request.getAge() : existing.getAge(),
        // Create new UserProfile with data from request plus system-generated fields
        return new UserProfile(
            userId,  // Set from path parameter
            request.getDisplayName(),
            request.getEmail(),
            request.getAge(),
            request.getGender(),
            request.getFitnessLevel(),
            request.getGoals(),
            request.getHeight(),
            request.getWeight(),
            request.getProfileImageUrl(),
            // System-generated timestamps for new objects
            Timestamp.now(),  // createdAt
            Timestamp.now()   // updatedAt
        );
    }

    /**
     * Converts an UpdateUserProfileRequest DTO to a UserProfile model.
     * This method handles external → internal data conversion for updates.
     * It merges new data with existing data, preserving unchanged fields.
     * 
     * @param request The update request DTO from the client
     * @param existing The current UserProfile from the database
     * @return Updated UserProfile model, or null if inputs are null
     */
    public static UserProfile fromUpdateRequest(UpdateUserProfileRequest request, UserProfile existing) {
        // Null safety: Both request and existing object must be present
        if (request == null || existing == null) {
            return null;
        }

        // Create updated object using null coalescing pattern:
        // Use new value if provided, otherwise keep existing value
        return new UserProfile(
            existing.getUserId(),  // Never change user ID
            // Use ternary operator: new value if not null, otherwise existing value
            request.getDisplayName() != null ? request.getDisplayName() : existing.getDisplayName(),
            existing.getEmail(),   // Email typically shouldn't be updatable
            request.getAge() != null ? request.getAge() : existing.getAge(),
            request.getGender() != null ? request.getGender() : existing.getGender(),
            request.getFitnessLevel() != null ? request.getFitnessLevel() : existing.getFitnessLevel(),
            request.getGoals() != null ? request.getGoals() : existing.getGoals(),
            request.getHeight() != null ? request.getHeight() : existing.getHeight(),
            request.getWeight() != null ? request.getWeight() : existing.getWeight(),
            request.getProfileImageUrl() != null ? request.getProfileImageUrl() : existing.getProfileImageUrl(),
            existing.getCreatedAt(),  // Preserve original creation time
            Timestamp.now()           // Update the modification time
        );
    }
}
```

---

## **Step 4: Create Repository**

### **What is a Repository and Why Use It?**

The **Repository pattern** abstracts data access logic and provides a clean interface for data operations. It acts as an **in-memory collection** of domain objects.

### **Key Benefits of Repositories:**
1. **Abstraction**: Hide database-specific implementation details
2. **Testability**: Easy to mock for unit testing
3. **Consistency**: Standardized data access patterns
4. **Maintainability**: Change data storage without affecting business logic
5. **Query Organization**: Centralize all data queries for an entity

### **Common Repository Methods:**
- **CRUD Operations**: Create, Read, Update, Delete
- **Finder Methods**: Query by specific fields or conditions
- **Bulk Operations**: Handle multiple records efficiently

**Location**: `src/main/java/com/basick/app/repository/`

Create `UserProfileRepository.java`:

```java
package com.basick.app.repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Repository;

import com.basick.app.model.UserProfile;
import com.basick.app.service.FirestoreService;

/**
 * Repository class for UserProfile data access operations.
 * This class handles all database interactions for UserProfile entities.
 * 
 * Key Features:
 * - Uses Firestore as the database through FirestoreService
 * - Returns Optional<T> for single objects (null-safe)
 * - Returns List<T> for multiple objects
 * - Handles exceptions gracefully
 * - Uses collection name "userProfiles" in Firestore
 */
@Repository
public class UserProfileRepository {
    
    // Collection name in Firestore - should be consistent across the app
    private static final String COLLECTION_NAME = "userProfiles";
    
    // Dependency injection of Firestore service
    private final FirestoreService db;
    
    // Constructor injection - preferred over field injection
    public UserProfileRepository(FirestoreService db) {
        this.db = db;
    }

    public List<UserProfile> findAll() {
        try {
            return db.findAll("userProfiles", UserProfile.class);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public List<UserProfile> findByFitnessLevel(String fitnessLevel) {
        try {
            return db.findByField("userProfiles", "fitnessLevel", fitnessLevel, UserProfile.class);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public List<UserProfile> findByGoals(List<String> goals) {
        try {
            return db.findByArrayContainsAny("userProfiles", "goals", goals, UserProfile.class);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public Optional<UserProfile> findById(String userId) {
        try {
            return Optional.ofNullable(db.findById("userProfiles", userId, UserProfile.class));
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public Optional<UserProfile> save(UserProfile userProfile, String userId) {
        try {
            db.saveWithId("userProfiles", userId, userProfile);
            return findById(userId);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public Optional<UserProfile> update(String userId, UserProfile userProfile) {
        try {
            if (findById(userId).isEmpty()) {
                return Optional.empty();
            }
            db.saveWithId("userProfiles", userId, userProfile);
            return findById(userId);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public boolean delete(String userId) {
        try {
            UserProfile userProfile = findById(userId).orElse(null);
            if (userProfile != null) {
                db.delete("userProfiles", userId);
                return true;
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
        return false;
    }
}
```

---

## **Step 5: Create Service**

**Location**: `src/main/java/com/basick/app/service/`

Create `UserProfileService.java`:

```java
package com.basick.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.basick.app.model.UserProfile;
import com.basick.app.repository.UserProfileRepository;

@Service
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    
    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    public List<UserProfile> findByFitnessLevel(String fitnessLevel) {
        return userProfileRepository.findByFitnessLevel(fitnessLevel);
    }

    public List<UserProfile> findByGoals(List<String> goals) {
        if (goals == null || goals.isEmpty()) {
            return getAllUserProfiles();
        }
        return userProfileRepository.findByGoals(goals);
    }

    public Optional<UserProfile> getUserProfileById(String userId) {
        return userProfileRepository.findById(userId);
    }

    public Optional<UserProfile> createUserProfile(UserProfile userProfile, String userId) {
        if (userProfile.getCreatedAt() == null || userProfile.getUpdatedAt() == null) {
            userProfile.setCreatedAt(com.google.cloud.Timestamp.now());
            userProfile.setUpdatedAt(com.google.cloud.Timestamp.now());
        }
        return userProfileRepository.save(userProfile, userId);
    }

    public Optional<UserProfile> updateUserProfile(String userId, UserProfile userProfile) {
        Optional<UserProfile> existing = userProfileRepository.findById(userId);
        if (existing.isEmpty()) {
            return Optional.empty();
        }
        userProfile.setCreatedAt(existing.get().getCreatedAt());
        userProfile.setUpdatedAt(com.google.cloud.Timestamp.now());
        return userProfileRepository.update(userId, userProfile);
    }

    public boolean deleteUserProfile(String userId) {
        return userProfileRepository.delete(userId);
    }
}
```

---

## **Step 5: Create Service**

### **What is a Service Layer and Why Use It?**

The **Service layer** contains your application's **business logic** and orchestrates operations between controllers and repositories. It's the brain of your application.

### **Key Responsibilities of Services:**
1. **Business Logic**: Implement business rules and validation
2. **Transaction Management**: Handle complex operations across multiple repositories
3. **Data Transformation**: Orchestrate mapping between DTOs and models
4. **Error Handling**: Manage exceptions and edge cases
5. **Caching**: Implement caching strategies if needed

### **Why Separate Service from Controller?**
- **Single Responsibility**: Controllers handle HTTP, Services handle business logic
- **Reusability**: Services can be used by multiple controllers
- **Testability**: Easier to unit test business logic separately
- **Maintainability**: Changes to business rules don't affect HTTP handling

**Location**: `src/main/java/com/basick/app/service/`

Create `UserProfileService.java`:

```java
package com.basick.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.basick.app.model.UserProfile;
import com.basick.app.repository.UserProfileRepository;

/**
 * Service class for UserProfile business logic.
 * This class contains all business rules and operations for user profiles.
 * 
 * Key Features:
 * - Handles business validation
 * - Manages timestamp creation/updates
 * - Provides filtering and search capabilities
 * - Abstracts repository operations
 * - Handles edge cases and errors
 */
@Service
public class UserProfileService {
    
    // Dependency injection of repository
    private final UserProfileRepository userProfileRepository;
    
    // Constructor injection - enables easy testing with mocked repositories
    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * Retrieves all user profiles from the database.
     * Business Rule: Anyone can view all profiles (consider privacy implications)
     */
    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    /**
     * Finds user profiles by fitness level.
     * Business Rule: Enables filtering by fitness level for matching users
     */
    public List<UserProfile> findByFitnessLevel(String fitnessLevel) {
        return userProfileRepository.findByFitnessLevel(fitnessLevel);
    }

    /**
     * Finds user profiles by goals.
     * Business Rule: If no goals specified, return all profiles
     */
    public List<UserProfile> findByGoals(List<String> goals) {
        if (goals == null || goals.isEmpty()) {
            return getAllUserProfiles();
        }
        return userProfileRepository.findByGoals(goals);
    }

    /**
     * Retrieves a specific user profile by ID.
     * Business Rule: Users should be able to view their own profile
     */
    public Optional<UserProfile> getUserProfileById(String userId) {
        return userProfileRepository.findById(userId);
    }

    /**
     * Creates a new user profile.
     * Business Rule: Ensure timestamps are set for new profiles
     */
    public Optional<UserProfile> createUserProfile(UserProfile userProfile, String userId) {
        // Business validation: Ensure timestamps are set
        if (userProfile.getCreatedAt() == null || userProfile.getUpdatedAt() == null) {
            userProfile.setCreatedAt(com.google.cloud.Timestamp.now());
            userProfile.setUpdatedAt(com.google.cloud.Timestamp.now());
        }
        return userProfileRepository.save(userProfile, userId);
    }

    /**
     * Updates an existing user profile.
     * Business Rules: 
     * - Profile must exist before updating
     * - Preserve creation timestamp
     * - Update modification timestamp
     */
    public Optional<UserProfile> updateUserProfile(String userId, UserProfile userProfile) {
        Optional<UserProfile> existing = userProfileRepository.findById(userId);
        if (existing.isEmpty()) {
            return Optional.empty();  // Business rule: can't update non-existent profile
        }
        
        // Business rule: Preserve creation time, update modification time
        userProfile.setCreatedAt(existing.get().getCreatedAt());
        userProfile.setUpdatedAt(com.google.cloud.Timestamp.now());
        
        return userProfileRepository.update(userId, userProfile);
    }

    /**
     * Deletes a user profile.
     * Business Rule: Only allow deletion of existing profiles
     */
    public boolean deleteUserProfile(String userId) {
        return userProfileRepository.delete(userId);
    }
}
```

---

## **Step 6: Create Controller**

### **What is a Controller and Why Use It?**

**Controllers** handle HTTP requests and responses. They're the **entry point** for your API and manage the communication between your application and clients.

### **Key Responsibilities of Controllers:**
1. **HTTP Handling**: Process requests and generate responses
2. **Input Validation**: Validate request data before processing
3. **Data Transformation**: Convert between DTOs and models using mappers
4. **Error Handling**: Return appropriate HTTP status codes and error messages
5. **Documentation**: Provide clear API contracts

### **Best Practices:**
- **Thin Controllers**: Keep business logic in services
- **Consistent Responses**: Use standardized response formats
- **Proper Status Codes**: Return meaningful HTTP status codes
- **Input Validation**: Validate all inputs before processing
- **Error Handling**: Handle exceptions gracefully

**Location**: `src/main/java/com/basick/app/controller/`

Create `UserProfileController.java`:

```java
package com.basick.app.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.basick.app.dto.common.ApiResponse;
import com.basick.app.dto.userprofile.CreateUserProfileRequest;
import com.basick.app.dto.userprofile.UpdateUserProfileRequest;
import com.basick.app.dto.userprofile.UserProfileDTO;
import com.basick.app.mapper.UserProfileMapper;
import com.basick.app.model.UserProfile;
import com.basick.app.service.UserProfileService;

@RestController
@RequestMapping("/api/user-profiles")
public class UserProfileController {
    private final UserProfileService userProfileService;
    
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserProfileDTO>>> getAllUserProfiles() {
        try {
            List<UserProfile> userProfiles = userProfileService.getAllUserProfiles();
            List<UserProfileDTO> userProfileDTOs = userProfiles.stream()
                .map(profile -> UserProfileMapper.toDTO(profile, profile.getUserId()))
                .collect(Collectors.toList());
            
            return userProfileDTOs.isEmpty() 
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(ApiResponse.success("User profiles retrieved successfully", userProfileDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to retrieve user profiles", e.getMessage()));
        }
    }

    @GetMapping("/fitness-level")
    public ResponseEntity<ApiResponse<List<UserProfileDTO>>> getUserProfilesByFitnessLevel(@RequestParam String level) {
        try {
            if (level == null || level.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Fitness level parameter is required"));
            }

            List<UserProfile> userProfiles = userProfileService.findByFitnessLevel(level);
            List<UserProfileDTO> userProfileDTOs = userProfiles.stream()
                .map(profile -> UserProfileMapper.toDTO(profile, profile.getUserId()))
                .collect(Collectors.toList());
            
            return userProfileDTOs.isEmpty() 
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(ApiResponse.success("User profiles by fitness level retrieved successfully", userProfileDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to retrieve user profiles by fitness level", e.getMessage()));
        }
    }

    @GetMapping("/goals")
    public ResponseEntity<ApiResponse<List<UserProfileDTO>>> getUserProfilesByGoals(@RequestParam List<String> goals) {
        try {
            List<UserProfile> userProfiles = userProfileService.findByGoals(goals);
            List<UserProfileDTO> userProfileDTOs = userProfiles.stream()
                .map(profile -> UserProfileMapper.toDTO(profile, profile.getUserId()))
                .collect(Collectors.toList());
            
            return userProfileDTOs.isEmpty() 
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(ApiResponse.success("User profiles by goals retrieved successfully", userProfileDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to retrieve user profiles by goals", e.getMessage()));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserProfileDTO>> getUserProfileById(@PathVariable String userId) {
        try {
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User ID is required"));
            }

            Optional<UserProfile> userProfile = userProfileService.getUserProfileById(userId);
            if (userProfile.isPresent()) {
                UserProfileDTO userProfileDTO = UserProfileMapper.toDTO(userProfile.get(), userId);
                return ResponseEntity.ok(ApiResponse.success("User profile retrieved successfully", userProfileDTO));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to retrieve user profile", e.getMessage()));
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserProfileDTO>> createUserProfile(@PathVariable String userId, @RequestBody CreateUserProfileRequest request) {
        try {
            if (userId == null || userId.isEmpty() || request == null || request.getDisplayName() == null || request.getDisplayName().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User ID and display name are required"));
            }
            
            UserProfile userProfile = UserProfileMapper.fromCreateRequest(request, userId);
            Optional<UserProfile> savedUserProfile = userProfileService.createUserProfile(userProfile, userId);
            
            if (savedUserProfile.isPresent()) {
                UserProfileDTO userProfileDTO = UserProfileMapper.toDTO(savedUserProfile.get(), userId);
                return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("User profile created successfully", userProfileDTO));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to create user profile"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to create user profile", e.getMessage()));
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserProfileDTO>> updateUserProfile(@PathVariable String userId, @RequestBody UpdateUserProfileRequest request) {
        try {
            if (userId == null || userId.isEmpty() || request == null) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User ID and request body are required"));
            }

            Optional<UserProfile> existingUserProfile = userProfileService.getUserProfileById(userId);
            if (existingUserProfile.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            UserProfile updatedUserProfile = UserProfileMapper.fromUpdateRequest(request, existingUserProfile.get());
            Optional<UserProfile> savedUserProfile = userProfileService.updateUserProfile(userId, updatedUserProfile);
            
            if (savedUserProfile.isPresent()) {
                UserProfileDTO userProfileDTO = UserProfileMapper.toDTO(savedUserProfile.get(), userId);
                return ResponseEntity.ok(ApiResponse.success("User profile updated successfully", userProfileDTO));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to update user profile"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to update user profile", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUserProfile(@PathVariable String userId) {
        try {
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User ID is required"));
            }

            boolean isDeleted = userProfileService.deleteUserProfile(userId);
            if (isDeleted) {
                return ResponseEntity.ok(ApiResponse.success("User profile deleted successfully", "User profile deleted."));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to delete user profile", e.getMessage()));
        }
    }
}
```

---

## **Step 7: API Endpoints Summary**

After completing all steps, you'll have these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user-profiles` | Get all user profiles |
| GET | `/api/user-profiles/fitness-level?level=Beginner` | Filter by fitness level |
| GET | `/api/user-profiles/goals?goals=weight-loss,strength` | Filter by goals |
| GET | `/api/user-profiles/{userId}` | Get user profile by ID |
| POST | `/api/user-profiles/{userId}` | Create new user profile |
| PUT | `/api/user-profiles/{userId}` | Update user profile |
| DELETE | `/api/user-profiles/{userId}` | Delete user profile |

---

## **Step 8: Testing**

### 8.1 Compile and Test
```bash
mvn clean compile
mvn spring-boot:run

for macbook:chmod +x mvnw
             ./mvnw spring-boot:run

```

### 8.2 Test Endpoints
```bash
# Create user profile
curl -X POST "http://localhost:8080/api/user-profiles/user123" \
  -H "Content-Type: application/json" \
  -d '{
    "display_name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "gender": "Male",
    "fitness_level": "Beginner",
    "goals": ["weight-loss", "strength"],
    "height": 175.0,
    "weight": 70.0
  }'

# Get user profile
curl -X GET "http://localhost:8080/api/user-profiles/user123"
```

---

## **Key Patterns to Follow**

1. **Consistent Naming**: Use singular for model, plural for collection endpoints
2. **DTO Organization**: Group DTOs by feature/domain in separate packages
3. **Error Handling**: Always use try-catch blocks and meaningful error messages
4. **Validation**: Validate required fields in controllers
5. **Mapping**: Use mappers to convert between DTOs and models
6. **Service Layer**: Keep business logic in services, not controllers
7. **Repository Pattern**: Isolate data access logic in repositories
8. **API Response**: Use consistent `ApiResponse<T>` format for all endpoints
9. **HTTP Status Codes**: Use appropriate status codes (200, 201, 204, 400, 404, 500)
10. **Documentation**: Follow the same documentation patterns

This tutorial provides a complete template for adding any new feature to your baSICK application while maintaining consistency with existing patterns!

---

## **Understanding the Complete Architecture Flow**

### **Request Processing Flow (CREATE Example)**

Let's trace through what happens when a client creates a new user profile:

```
1. CLIENT SENDS REQUEST:
   POST /api/user-profiles/user123
   Content-Type: application/json
   {
     "display_name": "John Doe",
     "email": "john@example.com",
     "age": 25,
     "fitness_level": "Beginner"
   }

2. CONTROLLER RECEIVES REQUEST:
   - @PostMapping("/{userId}") matches the URL
   - @PathVariable extracts "user123" as userId
   - @RequestBody deserializes JSON to CreateUserProfileRequest DTO
   - @Valid validates the DTO (if validation annotations are present)

3. DTO VALIDATION:
   - Spring validates @NotBlank, @Email, @Min/@Max constraints
   - If validation fails, returns 400 Bad Request automatically
   - If validation passes, continues to business logic

4. CONTROLLER → SERVICE:
   - Controller calls UserProfileMapper.fromCreateRequest()
   - Mapper converts CreateUserProfileRequest DTO → UserProfile model
   - Mapper adds system fields (timestamps, userId)
   - Controller calls userProfileService.createUserProfile()

5. SERVICE BUSINESS LOGIC:
   - Service applies business rules (e.g., set timestamps)
   - Service calls userProfileRepository.save()
   - Service handles any business-specific validation

6. REPOSITORY → DATABASE:
   - Repository calls FirestoreService.saveWithId()
   - Data is persisted to Firestore collection "userProfiles"
   - Repository returns Optional<UserProfile> with saved data

7. SERVICE → CONTROLLER:
   - Service returns Optional<UserProfile> to controller
   - Controller checks if save was successful

8. CONTROLLER RESPONSE:
   - If successful: Controller calls UserProfileMapper.toDTO()
   - Mapper converts UserProfile model → UserProfileDTO
   - Controller wraps DTO in ApiResponse<UserProfileDTO>
   - Returns 201 Created with JSON response

9. CLIENT RECEIVES RESPONSE:
   HTTP 201 Created
   Content-Type: application/json
   {
     "success": true,
     "message": "User profile created successfully",
     "data": {
       "user_id": "user123",
       "display_name": "John Doe",
       "email": "john@example.com",
       "age": 25,
       "fitness_level": "Beginner",
       "created_at": "2025-07-01T12:00:00Z",
       "updated_at": "2025-07-01T12:00:00Z"
     }
   }
```

### **Why Each Layer Exists**

#### **1. Controller Layer**
- **Purpose**: Handle HTTP protocol details
- **Responsibilities**: URL routing, request/response format, HTTP status codes
- **Why Separate**: Business logic shouldn't know about HTTP details

#### **2. DTO Layer**
- **Purpose**: Define API contract and data validation
- **Responsibilities**: Control data exposure, validate inputs, API versioning
- **Why Separate**: Internal models should be independent of API structure

#### **3. Mapper Layer**
- **Purpose**: Convert between different data representations
- **Responsibilities**: DTO ↔ Model conversion, data transformation, null handling
- **Why Separate**: Keep conversion logic organized and reusable

#### **4. Service Layer**
- **Purpose**: Implement business logic and rules
- **Responsibilities**: Business validation, complex operations, transaction management
- **Why Separate**: Business rules should be independent of data access

#### **5. Repository Layer**
- **Purpose**: Abstract data access operations
- **Responsibilities**: CRUD operations, queries, database interactions
- **Why Separate**: Data access logic should be testable and swappable

#### **6. Model Layer**
- **Purpose**: Represent core business entities
- **Responsibilities**: Data structure, business entity definition
- **Why Separate**: Core entities should be independent of storage format

### **Benefits of This Architecture**

1. **Testability**: Each layer can be unit tested independently
2. **Maintainability**: Changes in one layer don't affect others
3. **Flexibility**: Easy to change databases, APIs, or business rules
4. **Security**: Control data exposure through DTOs
5. **Scalability**: Easy to add new features following the same pattern
6. **Team Development**: Different developers can work on different layers
7. **Code Reuse**: Services and repositories can be reused across controllers

### **Common Data Transformations**

```
CLIENT JSON → DTO → MODEL → DATABASE
    ↓           ↓      ↓        ↓
{               Create  User     Firestore
  "display_    User    Profile  Document
  name":       Profile  {        {
  "John"       Request  userId:  displayName:
}              {        "123",   "John",
               display  name:    createdAt:
               Name:    "John",  Timestamp
               "John"   created  }
               }        At: ...
                       }
```

---

## **Step 9: Advanced Features**

### 9.1 Input Validation

Add validation annotations to your DTOs for better error handling:

```java
// In CreateUserProfileRequest.java
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;

public class CreateUserProfileRequest {
    @NotBlank(message = "Display name is required")
    @JsonProperty("display_name")
    private String displayName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @Min(value = 13, message = "Age must be at least 13")
    @Max(value = 120, message = "Age must be less than 120")
    private Integer age;
    
    // ... other fields
}
```

Update your controller to use `@Valid`:

```java
@PostMapping("/{userId}")
public ResponseEntity<ApiResponse<UserProfileDTO>> createUserProfile(
    @PathVariable String userId, 
    @Valid @RequestBody CreateUserProfileRequest request) {
    // ... implementation
}
```

### 9.2 Custom Exceptions

Create custom exceptions for better error handling:

```java
// In src/main/java/com/basick/app/exception/
public class UserProfileNotFoundException extends RuntimeException {
    public UserProfileNotFoundException(String userId) {
        super("User profile not found with ID: " + userId);
    }
}

public class UserProfileAlreadyExistsException extends RuntimeException {
    public UserProfileAlreadyExistsException(String userId) {
        super("User profile already exists with ID: " + userId);
    }
}
```

Update your service to use custom exceptions:

```java
public Optional<UserProfile> getUserProfileById(String userId) {
    return userProfileRepository.findById(userId)
        .or(() -> {
            throw new UserProfileNotFoundException(userId);
        });
}
```

### 9.3 Advanced Querying

Add complex queries to your repository:

```java
// In UserProfileRepository.java
public List<UserProfile> findByAgeRange(int minAge, int maxAge) {
    try {
        return db.findByFieldRange("userProfiles", "age", minAge, maxAge, UserProfile.class);
    } catch (ExecutionException | InterruptedException e) {
        e.printStackTrace();
        return List.of();
    }
}

public List<UserProfile> findByMultipleFields(String fitnessLevel, String gender) {
    try {
        Map<String, Object> filters = new HashMap<>();
        filters.put("fitnessLevel", fitnessLevel);
        filters.put("gender", gender);
        return db.findByMultipleFields("userProfiles", filters, UserProfile.class);
    } catch (ExecutionException | InterruptedException e) {
        e.printStackTrace();
        return List.of();
    }
}
```

### 9.4 Pagination Support

Add pagination to your endpoints:

```java
// In UserProfileController.java
@GetMapping("/paginated")
public ResponseEntity<ApiResponse<List<UserProfileDTO>>> getUserProfilesPaginated(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) {
    try {
        List<UserProfile> userProfiles = userProfileService.getUserProfilesPaginated(page, size);
        // ... implementation
    } catch (Exception e) {
        // ... error handling
    }
}
```

### 9.5 Search Functionality

Add search capabilities:

```java
// In UserProfileService.java
public List<UserProfile> searchUserProfiles(String searchTerm) {
    return userProfileRepository.findAll().stream()
        .filter(profile -> 
            profile.getDisplayName().toLowerCase().contains(searchTerm.toLowerCase()) ||
            profile.getEmail().toLowerCase().contains(searchTerm.toLowerCase())
        )
        .collect(Collectors.toList());
}
```

---

## **Step 10: Testing Strategy**

### 10.1 Unit Tests

Create unit tests for your service:

```java
// In src/test/java/com/basick/app/service/
@ExtendWith(MockitoExtension.class)
class UserProfileServiceTest {
    
    @Mock
    private UserProfileRepository userProfileRepository;
    
    @InjectMocks
    private UserProfileService userProfileService;
    
    @Test
    void testGetAllUserProfiles() {
        // Given
        List<UserProfile> mockProfiles = Arrays.asList(
            new UserProfile(/* parameters */),
            new UserProfile(/* parameters */)
        );
        when(userProfileRepository.findAll()).thenReturn(mockProfiles);
        
        // When
        List<UserProfile> result = userProfileService.getAllUserProfiles();
        
        // Then
        assertEquals(2, result.size());
        verify(userProfileRepository).findAll();
    }
}
```

### 10.2 Integration Tests

Create integration tests for your controller:

```java
// In src/test/java/com/basick/app/controller/
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(OrderAnnotation.class)
class UserProfileControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    @Order(1)
    void testCreateUserProfile() {
        // Given
        CreateUserProfileRequest request = new CreateUserProfileRequest();
        request.setDisplayName("Test User");
        request.setEmail("test@example.com");
        
        // When
        ResponseEntity<ApiResponse> response = restTemplate.postForEntity(
            "/api/user-profiles/test-user", request, ApiResponse.class);
        
        // Then
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }
}
```

---

## **Step 11: Documentation**

### 11.1 API Documentation

Create API documentation:

```markdown
# User Profile API

## Endpoints

### Create User Profile
- **POST** `/api/user-profiles/{userId}`
- **Description**: Creates a new user profile
- **Path Parameters**: 
  - `userId` (string): Unique identifier for the user
- **Request Body**:
  ```json
  {
    "display_name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "gender": "Male",
    "fitness_level": "Beginner",
    "goals": ["weight-loss", "strength"],
    "height": 175.0,
    "weight": 70.0
  }
  ```
- **Response**: 201 Created with user profile data
```

### 11.2 Code Comments

Add meaningful comments to your code:

```java
/**
 * Service class for managing user profiles.
 * Handles CRUD operations and business logic for user profiles.
 */
@Service
public class UserProfileService {
    
    /**
     * Retrieves all user profiles from the database.
     * @return List of all user profiles
     */
    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }
    
    /**
     * Creates a new user profile with the provided data.
     * @param userProfile The user profile to create
     * @param userId The unique identifier for the user
     * @return Optional containing the created user profile, or empty if creation failed
     */
    public Optional<UserProfile> createUserProfile(UserProfile userProfile, String userId) {
        // Implementation
    }
}
```

---

## **Step 12: Performance Considerations**

### 12.1 Caching

Consider adding caching for frequently accessed data:

```java
// In UserProfileService.java
@Cacheable(value = "userProfiles", key = "#userId")
public Optional<UserProfile> getUserProfileById(String userId) {
    return userProfileRepository.findById(userId);
}

@CacheEvict(value = "userProfiles", key = "#userId")
public Optional<UserProfile> updateUserProfile(String userId, UserProfile userProfile) {
    // Implementation
}
```

### 12.2 Database Indexing

Consider which fields need indexing in Firestore:
- `userId` (automatic)
- `fitnessLevel` (for filtering)
- `goals` (for array-contains queries)
- `createdAt` (for sorting)

### 12.3 Batch Operations

For bulk operations, consider batch processing:

```java
public List<UserProfile> createMultipleUserProfiles(List<CreateUserProfileRequest> requests) {
    return requests.stream()
        .map(request -> createUserProfile(
            UserProfileMapper.fromCreateRequest(request, generateUserId()), 
            generateUserId()
        ))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toList());
}
```

---

## **Step 13: Security Considerations**

### 13.1 Authentication

Add authentication checks:

```java
@PreAuthorize("hasRole('USER')")
@GetMapping("/{userId}")
public ResponseEntity<ApiResponse<UserProfileDTO>> getUserProfileById(@PathVariable String userId) {
    // Implementation
}
```

### 13.2 Data Sanitization

Sanitize input data:

```java
private String sanitizeInput(String input) {
    if (input == null) return null;
    return input.trim().replaceAll("[<>\"']", "");
}
```

### 13.3 Rate Limiting

Consider implementing rate limiting for your endpoints:

```java
@RateLimiter(name = "userProfileApi", fallbackMethod = "rateLimitFallback")
@GetMapping
public ResponseEntity<ApiResponse<List<UserProfileDTO>>> getAllUserProfiles() {
    // Implementation
}
```

---

## **Step 14: Monitoring and Logging**

### 14.1 Logging

Add proper logging:

```java
@Service
public class UserProfileService {
    private static final Logger logger = LoggerFactory.getLogger(UserProfileService.class);
    
    public Optional<UserProfile> createUserProfile(UserProfile userProfile, String userId) {
        logger.info("Creating user profile for user: {}", userId);
        try {
            // Implementation
            logger.info("Successfully created user profile for user: {}", userId);
        } catch (Exception e) {
            logger.error("Failed to create user profile for user: {}", userId, e);
            throw e;
        }
    }
}
```

### 14.2 Metrics

Add metrics for monitoring:

```java
@Timed(name = "user_profile_creation", description = "Time taken to create user profile")
public Optional<UserProfile> createUserProfile(UserProfile userProfile, String userId) {
    // Implementation
}
```

---

## **Complete Checklist for New Model Integration**

When adding a new model, ensure you complete these steps:

- [ ] **Step 1**: Create the model class with proper fields and constructors
- [ ] **Step 2**: Create DTOs (response, create request, update request) in feature-specific package
- [ ] **Step 3**: Create mapper class with static methods for conversions
- [ ] **Step 4**: Create repository with CRUD operations and custom queries
- [ ] **Step 5**: Create service with business logic and error handling
- [ ] **Step 6**: Create controller with proper endpoints and validation
- [ ] **Step 7**: Test all endpoints manually or with automated tests
- [ ] **Step 8**: Add input validation annotations
- [ ] **Step 9**: Create custom exceptions if needed
- [ ] **Step 10**: Add unit and integration tests
- [ ] **Step 11**: Document the API endpoints
- [ ] **Step 12**: Consider performance optimizations
- [ ] **Step 13**: Add security measures
- [ ] **Step 14**: Add logging and monitoring
- [ ] **Step 15**: Update global exception handler if needed

---

## **Common Pitfalls to Avoid**

1. **Forgetting validation**: Always validate input data
2. **Not handling exceptions**: Use try-catch blocks and meaningful error messages
3. **Inconsistent naming**: Follow established naming conventions
4. **Missing null checks**: Always check for null values
5. **Not using DTOs**: Never expose internal models directly
6. **Poor error messages**: Provide clear, actionable error messages
7. **Not testing**: Always test your endpoints before deployment
8. **Ignoring performance**: Consider caching and indexing for large datasets
9. **Security oversights**: Always validate and sanitize user input
10. **Poor documentation**: Document your API for future maintainers

---

## **Architectural Flow Summary**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client        │    │   Controller    │    │   Service       │
│   (Frontend)    │◄──►│   (REST API)    │◄──►│   (Business)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                ▲                        ▲
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   DTO/Mapper    │    │   Repository    │
                       │   (Data Trans)  │    │   (Data Access) │
                       └─────────────────┘    └─────────────────┘
                                                        ▲
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   Firestore     │
                                               │   (Database)    │
                                               └─────────────────┘
```
