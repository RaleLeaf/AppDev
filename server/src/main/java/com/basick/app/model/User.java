package com.basick.app.model;

import java.util.List;

import com.google.cloud.Timestamp;

public class User {
    protected String firebaseUid; // Firebase authentication UID
    protected String name;
    protected String email;
    protected String phoneNumber;
    protected Boolean isEmailVerified;
    protected Boolean isPhoneVerified;
    protected Boolean isActive;
    protected Timestamp createdAt;
    protected Timestamp updatedAt;
    protected Timestamp lastLoginAt;

    // Authentication and Authorization
    protected String authType; // ("EMAIL", "GOOGLE", "APPLE", "FACEBOOK")
    protected String role; // ("USER", "TRAINER", "ADMIN", "PREMIUM_USER")
    
    // Social features
    protected List<String> following; // User IDs this user follows
    protected List<String> followers; // User IDs that follow this user
    protected List<String> blockedUsers; // Blocked user IDs
    
    // Notification preferences
    protected Boolean pushNotificationsEnabled;
    protected Boolean emailNotificationsEnabled;
    protected Boolean workoutRemindersEnabled;
    protected Boolean socialNotificationsEnabled;

    // Account status
    protected String subscriptionType; // ("FREE", "PREMIUM", "TRAINER")
    protected Timestamp subscriptionExpiresAt;

    public User() {
        this.isEmailVerified = false;
        this.isPhoneVerified = false;
        this.isActive = true;
        this.pushNotificationsEnabled = true;
        this.emailNotificationsEnabled = true;
        this.workoutRemindersEnabled = true;
        this.socialNotificationsEnabled = true;
        this.subscriptionType = "FREE";
    }

    public User(String firebaseUid, String name, String email, String authType, String role) {
        this();
        this.firebaseUid = firebaseUid;
        this.name = name;
        this.email = email;
        this.authType = authType;
        this.role = role;
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    // Setters
    public void setFirebaseUid(String firebaseUid) { this.firebaseUid = firebaseUid; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setIsEmailVerified(Boolean isEmailVerified) { this.isEmailVerified = isEmailVerified; }
    public void setIsPhoneVerified(Boolean isPhoneVerified) { this.isPhoneVerified = isPhoneVerified; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
    public void setLastLoginAt(Timestamp lastLoginAt) { this.lastLoginAt = lastLoginAt; }
    public void setAuthType(String authType) { this.authType = authType; }
    public void setRole(String role) { this.role = role; }
    public void setFollowing(List<String> following) { this.following = following; }
    public void setFollowers(List<String> followers) { this.followers = followers; }
    public void setBlockedUsers(List<String> blockedUsers) { this.blockedUsers = blockedUsers; }
    public void setPushNotificationsEnabled(Boolean pushNotificationsEnabled) { this.pushNotificationsEnabled = pushNotificationsEnabled; }
    public void setEmailNotificationsEnabled(Boolean emailNotificationsEnabled) { this.emailNotificationsEnabled = emailNotificationsEnabled; }
    public void setWorkoutRemindersEnabled(Boolean workoutRemindersEnabled) { this.workoutRemindersEnabled = workoutRemindersEnabled; }
    public void setSocialNotificationsEnabled(Boolean socialNotificationsEnabled) { this.socialNotificationsEnabled = socialNotificationsEnabled; }
    public void setSubscriptionType(String subscriptionType) { this.subscriptionType = subscriptionType; }
    public void setSubscriptionExpiresAt(Timestamp subscriptionExpiresAt) { this.subscriptionExpiresAt = subscriptionExpiresAt; }
    
    // Getters
    public String getFirebaseUid() { return firebaseUid; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public Boolean getIsEmailVerified() { return isEmailVerified; }
    public Boolean getIsPhoneVerified() { return isPhoneVerified; }
    public Boolean getIsActive() { return isActive; }
    public Timestamp getCreatedAt() { return createdAt; }
    public Timestamp getUpdatedAt() { return updatedAt; }
    public Timestamp getLastLoginAt() { return lastLoginAt; }
    public String getAuthType() { return authType; }
    public String getRole() { return role; }
    public List<String> getFollowing() { return following; }
    public List<String> getFollowers() { return followers; }
    public List<String> getBlockedUsers() { return blockedUsers; }
    public Boolean getPushNotificationsEnabled() { return pushNotificationsEnabled; }
    public Boolean getEmailNotificationsEnabled() { return emailNotificationsEnabled; }
    public Boolean getWorkoutRemindersEnabled() { return workoutRemindersEnabled; }
    public Boolean getSocialNotificationsEnabled() { return socialNotificationsEnabled; }
    public String getSubscriptionType() { return subscriptionType; }
    public Timestamp getSubscriptionExpiresAt() { return subscriptionExpiresAt; }
}
