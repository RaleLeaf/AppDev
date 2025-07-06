package com.basick.app.repository;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Comment;
import com.basick.app.service.FirestoreService;

/**
 * Repository for Comment data access
 */
@Repository
public class CommentRepository {

    private final FirestoreService firestoreService;
    private static final String COLLECTION_NAME = "comments";

    public CommentRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new comment
     */
    public Comment save(Comment comment) {
        try {
            String id = UUID.randomUUID().toString();
            comment.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, comment);
            return comment;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving comment", e);
        }
    }

    /**
     * Update an existing comment
     */
    public Comment update(Comment comment) {
        try {
            firestoreService.saveWithId(COLLECTION_NAME, comment.getId(), comment);
            return comment;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating comment", e);
        }
    }

    /**
     * Find comment by ID
     */
    public Comment findById(String id) {
        try {
            return firestoreService.findById(COLLECTION_NAME, id, Comment.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding comment by ID", e);
        }
    }

    /**
     * Delete comment by ID
     */
    public boolean deleteById(String id) {
        try {
            firestoreService.delete(COLLECTION_NAME, id);
            return true;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting comment", e);
        }
    }

    /**
     * Find comments by post ID
     */
    public List<Comment> findByPostId(String postId) {
        try {
            List<Comment> allComments = firestoreService.findAll(COLLECTION_NAME, Comment.class);
            return allComments.stream()
                    .filter(comment -> postId.equals(comment.getPostId()))
                    .sorted((c1, c2) -> c1.getCreatedAt().compareTo(c2.getCreatedAt()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding comments by post ID", e);
        }
    }

    /**
     * Find comments by user ID
     */
    public List<Comment> findByUserId(String userId) {
        try {
            List<Comment> allComments = firestoreService.findAll(COLLECTION_NAME, Comment.class);
            return allComments.stream()
                    .filter(comment -> userId.equals(comment.getUserId()))
                    .sorted((c1, c2) -> c2.getCreatedAt().compareTo(c1.getCreatedAt()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding comments by user ID", e);
        }
    }

    /**
     * Count comments by post ID
     */
    public long countByPostId(String postId) {
        try {
            List<Comment> allComments = firestoreService.findAll(COLLECTION_NAME, Comment.class);
            return allComments.stream()
                    .filter(comment -> postId.equals(comment.getPostId()))
                    .count();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting comments by post ID", e);
        }
    }

    /**
     * Find recent comments by user ID
     */
    public List<Comment> findRecentByUserId(String userId, int limit) {
        try {
            List<Comment> allComments = firestoreService.findAll(COLLECTION_NAME, Comment.class);
            return allComments.stream()
                    .filter(comment -> userId.equals(comment.getUserId()))
                    .filter(comment -> comment.getCreatedAt() != null)
                    .sorted((c1, c2) -> c2.getCreatedAt().compareTo(c1.getCreatedAt()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding recent comments by user ID", e);
        }
    }

    /**
     * Count comments by user ID
     */
    public long countByUserId(String userId) {
        try {
            List<Comment> allComments = firestoreService.findAll(COLLECTION_NAME, Comment.class);
            return allComments.stream()
                    .filter(comment -> userId.equals(comment.getUserId()))
                    .count();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting comments by user ID", e);
        }
    }

    /**
     * Find all comments
     */
    public List<Comment> findAll() {
        try {
            return firestoreService.findAll(COLLECTION_NAME, Comment.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding all comments", e);
        }
    }
}
