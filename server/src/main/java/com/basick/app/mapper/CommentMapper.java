package com.basick.app.mapper;

import com.basick.app.dto.comment.CommentDTO;
import com.basick.app.dto.comment.CreateCommentRequest;
import com.basick.app.dto.comment.UpdateCommentRequest;
import com.basick.app.model.Comment;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {
    
    /**
     * Convert Comment entity to CommentDTO
     */
    public CommentDTO toDTO(Comment comment) {
        if (comment == null) {
            return null;
        }
        
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setPostId(comment.getPostId());
        dto.setUserId(comment.getUserId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(timestampToString(comment.getCreatedAt()));
        dto.setUpdatedAt(timestampToString(comment.getUpdatedAt()));
        
        return dto;
    }
    
    /**
     * Convert CreateCommentRequest to Comment entity
     */
    public Comment toEntity(CreateCommentRequest request) {
        if (request == null) {
            return null;
        }
        
        Comment comment = new Comment();
        comment.setPostId(request.getPostId());
        comment.setUserId(request.getUserId());
        comment.setContent(request.getContent());
        comment.setCreatedAt(Timestamp.now());
        comment.setUpdatedAt(Timestamp.now());
        
        return comment;
    }
    
    /**
     * Update Comment entity from UpdateCommentRequest
     */
    public void updateEntityFromRequest(Comment comment, UpdateCommentRequest request) {
        if (comment == null || request == null) {
            return;
        }
        
        if (request.getContent() != null) {
            comment.setContent(request.getContent());
        }
        comment.setUpdatedAt(Timestamp.now());
    }
    
    /**
     * Convert CommentDTO to Comment entity
     */
    public Comment toEntity(CommentDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Comment comment = new Comment();
        comment.setId(dto.getId());
        comment.setPostId(dto.getPostId());
        comment.setUserId(dto.getUserId());
        comment.setContent(dto.getContent());
        comment.setCreatedAt(stringToTimestamp(dto.getCreatedAt()));
        comment.setUpdatedAt(stringToTimestamp(dto.getUpdatedAt()));
        
        return comment;
    }
    
    /**
     * Convert Timestamp to ISO-8601 String format
     */
    private String timestampToString(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        return timestamp.toDate().toInstant().toString();
    }
    
    /**
     * Convert ISO-8601 String to Timestamp
     */
    private Timestamp stringToTimestamp(String timestampString) {
        if (timestampString == null) {
            return null;
        }
        try {
            return Timestamp.parseTimestamp(timestampString);
        } catch (Exception e) {
            return Timestamp.now();
        }
    }
}
