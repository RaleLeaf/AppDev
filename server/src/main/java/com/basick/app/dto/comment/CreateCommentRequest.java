package com.basick.app.dto.comment;

/**
 * Request DTO for creating a new Comment
 */
public class CreateCommentRequest {
    private String postId;
    private String userId;
    private String content;

    // Constructors
    public CreateCommentRequest() {}

    // Getters and Setters
    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
