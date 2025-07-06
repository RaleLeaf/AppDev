package com.basick.app.dto.user;

/**
 * Request DTO for updating user notification preferences
 */
public class NotificationPreferencesRequest {
    private Boolean pushNotificationsEnabled;
    private Boolean emailNotificationsEnabled;
    private Boolean workoutRemindersEnabled;
    private Boolean socialNotificationsEnabled;

    // Constructors
    public NotificationPreferencesRequest() {}

    public NotificationPreferencesRequest(Boolean pushNotificationsEnabled, 
                                        Boolean emailNotificationsEnabled,
                                        Boolean workoutRemindersEnabled, 
                                        Boolean socialNotificationsEnabled) {
        this.pushNotificationsEnabled = pushNotificationsEnabled;
        this.emailNotificationsEnabled = emailNotificationsEnabled;
        this.workoutRemindersEnabled = workoutRemindersEnabled;
        this.socialNotificationsEnabled = socialNotificationsEnabled;
    }

    // Getters and Setters
    public Boolean getPushNotificationsEnabled() { 
        return pushNotificationsEnabled; 
    }
    
    public void setPushNotificationsEnabled(Boolean pushNotificationsEnabled) { 
        this.pushNotificationsEnabled = pushNotificationsEnabled; 
    }

    public Boolean getEmailNotificationsEnabled() { 
        return emailNotificationsEnabled; 
    }
    
    public void setEmailNotificationsEnabled(Boolean emailNotificationsEnabled) { 
        this.emailNotificationsEnabled = emailNotificationsEnabled; 
    }

    public Boolean getWorkoutRemindersEnabled() { 
        return workoutRemindersEnabled; 
    }
    
    public void setWorkoutRemindersEnabled(Boolean workoutRemindersEnabled) { 
        this.workoutRemindersEnabled = workoutRemindersEnabled; 
    }

    public Boolean getSocialNotificationsEnabled() { 
        return socialNotificationsEnabled; 
    }
    
    public void setSocialNotificationsEnabled(Boolean socialNotificationsEnabled) { 
        this.socialNotificationsEnabled = socialNotificationsEnabled; 
    }
}
