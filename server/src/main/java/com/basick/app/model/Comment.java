package com.basick.app.model;

import com.google.cloud.Timestamp;

public class Comment {
    private String id;
    private String postId;
    private String userId;
    private String content;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public Comment() {
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public Comment(String postId, String userId, String content) {
        this();
        this.postId = postId;
        this.userId = userId;
        this.content = content;
    }

    public Comment(String id, String postId, String userId, String content, Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    // Business methods
    public void updateContent(String content) {
        this.content = content;
        this.updatedAt = Timestamp.now();
    }

    public boolean belongsToUser(String userId) {
        return this.userId != null && this.userId.equals(userId);
    }

    public boolean belongsToPost(String postId) {
        return this.postId != null && this.postId.equals(postId);
    }

    public boolean isEmpty() {
        return this.content == null || this.content.trim().isEmpty();
    }
}
