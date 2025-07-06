package com.basick.app.repository;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Post;
import com.basick.app.service.FirestoreService;

/**
 * Repository for Post data access
 */
@Repository
public class PostRepository {

    private final FirestoreService firestoreService;
    private static final String COLLECTION_NAME = "posts";

    public PostRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new post
     */
    public Post save(Post post) {
        try {
            String id = UUID.randomUUID().toString();
            post.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, post);
            return post;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving post", e);
        }
    }

    /**
     * Update an existing post
     */
    public Post update(Post post) {
        try {
            firestoreService.saveWithId(COLLECTION_NAME, post.getId(), post);
            return post;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating post", e);
        }
    }

    /**
     * Find post by ID
     */
    public Post findById(String id) {
        try {
            return firestoreService.findById(COLLECTION_NAME, id, Post.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding post by ID", e);
        }
    }

    /**
     * Delete post by ID
     */
    public boolean deleteById(String id) {
        try {
            firestoreService.delete(COLLECTION_NAME, id);
            return true;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting post", e);
        }
    }

    /**
     * Find all posts with pagination
     */
    public List<Post> findAll(int page, int size) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .skip((long) page * size)
                    .limit(size)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding all posts", e);
        }
    }

    /**
     * Find posts by author ID
     */
    public List<Post> findByAuthorId(String authorId) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> authorId.equals(post.getAuthorId()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding posts by author ID", e);
        }
    }

    /**
     * Find posts by post type
     */
    public List<Post> findByPostType(String postType) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> postType.equals(post.getPostType()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding posts by post type", e);
        }
    }

    /**
     * Find posts by tags
     */
    public List<Post> findByTags(List<String> tags) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> post.getTags() != null && 
                           post.getTags().stream().anyMatch(tags::contains))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding posts by tags", e);
        }
    }

    /**
     * Find trending posts (most liked/commented)
     */
    public List<Post> findTrendingPosts() {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> post.getLikesCount() != null)
                    .sorted((p1, p2) -> Integer.compare(
                        p2.getLikesCount() + p2.getCommentsCount(),
                        p1.getLikesCount() + p1.getCommentsCount()))
                    .limit(20)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding trending posts", e);
        }
    }

    /**
     * Find posts by location
     */
    public List<Post> findByLocation(String location, double radius) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> location.equals(post.getLocation()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding posts by location", e);
        }
    }

    /**
     * Find recent posts
     */
    public List<Post> findRecentPosts(int limit) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> post.getCreatedAt() != null)
                    .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding recent posts", e);
        }
    }

    /**
     * Find posts by public status
     */
    public List<Post> findByIsPublic(boolean isPublic) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> isPublic == Boolean.TRUE.equals(post.getIsPublic()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding posts by public status", e);
        }
    }

    /**
     * Find posts by moderation status
     */
    public List<Post> findByModerationStatus(String moderationStatus) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> moderationStatus.equals(post.getModerationStatus()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding posts by moderation status", e);
        }
    }

    /**
     * Find posts by workout ID
     */
    public List<Post> findByWorkoutId(String workoutId) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> workoutId.equals(post.getWorkoutId()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding posts by workout ID", e);
        }
    }

    /**
     * Count posts by author
     */
    public long countByAuthorId(String authorId) {
        try {
            List<Post> allPosts = firestoreService.findAll(COLLECTION_NAME, Post.class);
            return allPosts.stream()
                    .filter(post -> authorId.equals(post.getAuthorId()))
                    .count();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting posts by author ID", e);
        }
    }
}
