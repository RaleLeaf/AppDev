package com.basick.app.dto.user;

import java.util.List;

/**
 * Data Transfer Object for User
 */
public class UserDTO {
    private String id;
    private String firebaseUid;
    private String name;
    private String email;
    private String phoneNumber;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private Boolean isActive;
    private String createdAt;
    private String updatedAt;
    private String lastLoginAt;
    private String authType;
    private String role;
    private List<String> following;
    private List<String> followers;
    private List<String> blockedUsers;
    private Boolean pushNotificationsEnabled;
    private Boolean emailNotificationsEnabled;
    private Boolean workoutRemindersEnabled;
    private Boolean socialNotificationsEnabled;
    private String subscriptionType;
    private String subscriptionExpiresAt;

    // Constructors
    public UserDTO() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFirebaseUid() { return firebaseUid; }
    public void setFirebaseUid(String firebaseUid) { this.firebaseUid = firebaseUid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Boolean getIsEmailVerified() { return isEmailVerified; }
    public void setIsEmailVerified(Boolean isEmailVerified) { this.isEmailVerified = isEmailVerified; }

    public Boolean getIsPhoneVerified() { return isPhoneVerified; }
    public void setIsPhoneVerified(Boolean isPhoneVerified) { this.isPhoneVerified = isPhoneVerified; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

    public String getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(String lastLoginAt) { this.lastLoginAt = lastLoginAt; }

    public String getAuthType() { return authType; }
    public void setAuthType(String authType) { this.authType = authType; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public List<String> getFollowing() { return following; }
    public void setFollowing(List<String> following) { this.following = following; }

    public List<String> getFollowers() { return followers; }
    public void setFollowers(List<String> followers) { this.followers = followers; }

    public List<String> getBlockedUsers() { return blockedUsers; }
    public void setBlockedUsers(List<String> blockedUsers) { this.blockedUsers = blockedUsers; }

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

    public String getSubscriptionExpiresAt() { return subscriptionExpiresAt; }
    public void setSubscriptionExpiresAt(String subscriptionExpiresAt) { this.subscriptionExpiresAt = subscriptionExpiresAt; }
}
