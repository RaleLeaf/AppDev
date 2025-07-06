package com.basick.app.dto.userprofile;

/**
 * Request DTO for updating profile picture
 */
public class UpdateProfilePictureRequest {
    private String profilePictureUrl;

    public UpdateProfilePictureRequest() {}

    public UpdateProfilePictureRequest(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    // Getters and Setters
    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }
}
