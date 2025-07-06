package com.basick.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.comment.CommentDTO;
import com.basick.app.dto.comment.CreateCommentRequest;
import com.basick.app.dto.comment.UpdateCommentRequest;
import com.basick.app.mapper.CommentMapper;
import com.basick.app.model.Comment;
import com.basick.app.repository.CommentRepository;

/**
 * Service class for Comment business logic
 */
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    /**
     * Get all comments for a post
     */
    public List<CommentDTO> getCommentsByPost(String postId) {
        try {
            List<Comment> comments = commentRepository.findByPostId(postId);
            return comments.stream()
                    .map(commentMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving comments for post: " + postId, e);
        }
    }

    /**
     * Get all comments by a user
     */
    public List<CommentDTO> getCommentsByUser(String userId) {
        try {
            List<Comment> comments = commentRepository.findByUserId(userId);
            return comments.stream()
                    .map(commentMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving comments for user: " + userId, e);
        }
    }

    /**
     * Get comment by ID
     */
    public CommentDTO getCommentById(String id) {
        try {
            Comment comment = commentRepository.findById(id);
            return comment != null ? commentMapper.toDTO(comment) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving comment with ID: " + id, e);
        }
    }

    /**
     * Create a new comment
     */
    public CommentDTO createComment(CreateCommentRequest request) {
        try {
            Comment comment = commentMapper.toEntity(request);
            Comment savedComment = commentRepository.save(comment);
            return commentMapper.toDTO(savedComment);
        } catch (Exception e) {
            throw new RuntimeException("Error creating comment", e);
        }
    }

    /**
     * Update a comment
     */
    public CommentDTO updateComment(String id, UpdateCommentRequest request) {
        try {
            Comment existingComment = commentRepository.findById(id);
            if (existingComment == null) {
                return null;
            }
            
            commentMapper.updateEntityFromRequest(existingComment, request);
            Comment updatedComment = commentRepository.update(existingComment);
            return commentMapper.toDTO(updatedComment);
        } catch (Exception e) {
            throw new RuntimeException("Error updating comment with ID: " + id, e);
        }
    }

    /**
     * Delete a comment
     */
    public boolean deleteComment(String id) {
        try {
            return commentRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting comment with ID: " + id, e);
        }
    }

    /**
     * Get comment count for a post
     */
    public long getCommentCountByPost(String postId) {
        try {
            return commentRepository.countByPostId(postId);
        } catch (Exception e) {
            throw new RuntimeException("Error counting comments for post: " + postId, e);
        }
    }

    /**
     * Get recent comments by user
     */
    public List<CommentDTO> getRecentCommentsByUser(String userId, int limit) {
        try {
            List<Comment> comments = commentRepository.findRecentByUserId(userId, limit);
            return comments.stream()
                    .map(commentMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving recent comments for user: " + userId, e);
        }
    }

    /**
     * Get comment count by user
     */
    public long getCommentCountByUser(String userId) {
        try {
            return commentRepository.countByUserId(userId);
        } catch (Exception e) {
            throw new RuntimeException("Error counting comments for user: " + userId, e);
        }
    }
}
