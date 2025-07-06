package com.basick.app.dto.comment;

/**
 * Request DTO for updating a Comment
 */
public class UpdateCommentRequest {
    private String content;

    // Constructors
    public UpdateCommentRequest() {}

    // Getters and Setters
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
