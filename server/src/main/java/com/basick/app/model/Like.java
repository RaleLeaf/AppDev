package com.basick.app.model;

import com.google.cloud.Timestamp;

public class Like {
    private String id;
    private String userId;
    private String postId;
    private Timestamp createdAt;

    public Like() {
        this.createdAt = Timestamp.now();
    }

    public Like(String userId, String postId) {
        this();
        this.userId = userId;
        this.postId = postId;
    }

    public Like(String id, String userId, String postId, Timestamp createdAt) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    // Business methods
    public boolean belongsToUser(String userId) {
        return this.userId != null && this.userId.equals(userId);
    }

    public boolean belongsToPost(String postId) {
        return this.postId != null && this.postId.equals(postId);
    }
}
