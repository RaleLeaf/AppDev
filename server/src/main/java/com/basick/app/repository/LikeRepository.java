package com.basick.app.repository;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Like;
import com.basick.app.service.FirestoreService;

/**
 * Repository for Like data access
 */
@Repository
public class LikeRepository {

    private final FirestoreService firestoreService;
    private static final String COLLECTION_NAME = "likes";

    public LikeRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new like
     */
    public Like save(Like like) {
        try {
            String id = UUID.randomUUID().toString();
            like.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, like);
            return like;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving like", e);
        }
    }

    /**
     * Find like by ID
     */
    public Like findById(String id) {
        try {
            return firestoreService.findById(COLLECTION_NAME, id, Like.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding like by ID", e);
        }
    }

    /**
     * Delete like by ID
     */
    public boolean deleteById(String id) {
        try {
            firestoreService.delete(COLLECTION_NAME, id);
            return true;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting like", e);
        }
    }

    /**
     * Find likes by post ID
     */
    public List<Like> findByPostId(String postId) {
        try {
            List<Like> allLikes = firestoreService.findAll(COLLECTION_NAME, Like.class);
            return allLikes.stream()
                    .filter(like -> postId.equals(like.getPostId()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding likes by post ID", e);
        }
    }

    /**
     * Find likes by user ID
     */
    public List<Like> findByUserId(String userId) {
        try {
            List<Like> allLikes = firestoreService.findAll(COLLECTION_NAME, Like.class);
            return allLikes.stream()
                    .filter(like -> userId.equals(like.getUserId()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding likes by user ID", e);
        }
    }

    /**
     * Find like by user ID and post ID
     */
    public Like findByUserIdAndPostId(String userId, String postId) {
        try {
            List<Like> allLikes = firestoreService.findAll(COLLECTION_NAME, Like.class);
            return allLikes.stream()
                    .filter(like -> userId.equals(like.getUserId()) && postId.equals(like.getPostId()))
                    .findFirst()
                    .orElse(null);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding like by user and post ID", e);
        }
    }

    /**
     * Count likes by post ID
     */
    public long countByPostId(String postId) {
        try {
            List<Like> allLikes = firestoreService.findAll(COLLECTION_NAME, Like.class);
            return allLikes.stream()
                    .filter(like -> postId.equals(like.getPostId()))
                    .count();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting likes by post ID", e);
        }
    }

    /**
     * Find recent likes by user ID
     */
    public List<Like> findRecentByUserId(String userId, int limit) {
        try {
            List<Like> allLikes = firestoreService.findAll(COLLECTION_NAME, Like.class);
            return allLikes.stream()
                    .filter(like -> userId.equals(like.getUserId()))
                    .filter(like -> like.getCreatedAt() != null)
                    .sorted((l1, l2) -> l2.getCreatedAt().compareTo(l1.getCreatedAt()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding recent likes by user ID", e);
        }
    }

    /**
     * Find all likes
     */
    public List<Like> findAll() {
        try {
            return firestoreService.findAll(COLLECTION_NAME, Like.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding all likes", e);
        }
    }

    /**
     * Count likes by user ID
     */
    public long countByUserId(String userId) {
        try {
            List<Like> allLikes = firestoreService.findAll(COLLECTION_NAME, Like.class);
            return allLikes.stream()
                    .filter(like -> userId.equals(like.getUserId()))
                    .count();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting likes by user ID", e);
        }
    }
}
