package com.basick.app.dto.user;

import com.google.cloud.Timestamp;

/**
 * Request DTO for creating a new User
 */
public class CreateUserRequest {
    private String firebaseUid;
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String authType;
    private String role;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private Boolean isActive;
    private Boolean pushNotificationsEnabled;
    private Boolean emailNotificationsEnabled;
    private Boolean workoutRemindersEnabled;
    private Boolean socialNotificationsEnabled;
    private String subscriptionType;
    private Timestamp subscriptionExpiresAt;

    // Constructors
    public CreateUserRequest() {}

    // Getters and Setters
    public String getFirebaseUid() { return firebaseUid; }
    public void setFirebaseUid(String firebaseUid) { this.firebaseUid = firebaseUid; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getAuthType() { return authType; }
    public void setAuthType(String authType) { this.authType = authType; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public Boolean getIsEmailVerified() { return isEmailVerified; }
    public void setIsEmailVerified(Boolean isEmailVerified) { this.isEmailVerified = isEmailVerified; }
    
    public Boolean getIsPhoneVerified() { return isPhoneVerified; }
    public void setIsPhoneVerified(Boolean isPhoneVerified) { this.isPhoneVerified = isPhoneVerified; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Boolean getPushNotificationsEnabled() { return pushNotificationsEnabled; }
    public void setPushNotificationsEnabled(Boolean pushNotificationsEnabled) { this.pushNotificationsEnabled = pushNotificationsEnabled; }
    
    public Boolean getEmailNotificationsEnabled() { return emailNotificationsEnabled; }
    public void setEmailNotificationsEnabled(Boolean emailNotificationsEnabled) { this.emailNotificationsEnabled = emailNotificationsEnabled; }
    
    public Boolean getWorkoutRemindersEnabled() { return workoutRemindersEnabled; }
    public void setWorkoutRemindersEnabled(Boolean workoutRemindersEnabled) { this.workoutRemindersEnabled = workoutRemindersEnabled; }
    
    public Boolean getSocialNotificationsEnabled() { return socialNotificationsEnabled; }
    public void setSocialNotificationsEnabled(Boolean socialNotificationsEnabled) { this.socialNotificationsEnabled = socialNotificationsEnabled; }
    
    public String getSubscriptionType() { return subscriptionType; }
    public void setSubscriptionType(String subscriptionType) { this.subscriptionType = subscriptionType; }
    
    public Timestamp getSubscriptionExpiresAt() { return subscriptionExpiresAt; }
    public void setSubscriptionExpiresAt(Timestamp subscriptionExpiresAt) { this.subscriptionExpiresAt = subscriptionExpiresAt; }
}
