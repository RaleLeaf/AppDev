package com.basick.app.dto.like;

/**
 * Request DTO for creating a new Like
 */
public class CreateLikeRequest {
    private String userId;
    private String postId;

    // Constructors
    public CreateLikeRequest() {}

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }
}
