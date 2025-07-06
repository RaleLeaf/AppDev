package com.basick.app.dto.userprofile;

/**
 * Request DTO for updating privacy settings
 */
public class UpdatePrivacySettingsRequest {
    private Boolean isProfilePublic;
    private Boolean shareWorkouts;
    private Boolean shareProgress;

    public UpdatePrivacySettingsRequest() {}

    // Getters and Setters
    public Boolean getIsProfilePublic() { return isProfilePublic; }
    public void setIsProfilePublic(Boolean isProfilePublic) { this.isProfilePublic = isProfilePublic; }

    public Boolean getShareWorkouts() { return shareWorkouts; }
    public void setShareWorkouts(Boolean shareWorkouts) { this.shareWorkouts = shareWorkouts; }

    public Boolean getShareProgress() { return shareProgress; }
    public void setShareProgress(Boolean shareProgress) { this.shareProgress = shareProgress; }
}
