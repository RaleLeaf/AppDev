package com.basick.app.dto.like;

/**
 * Data Transfer Object for Like
 */
public class LikeDTO {
    private String id;
    private String userId;
    private String postId;
    private String createdAt;

    // Constructors
    public LikeDTO() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
