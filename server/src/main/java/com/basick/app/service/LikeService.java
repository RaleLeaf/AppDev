package com.basick.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.like.CreateLikeRequest;
import com.basick.app.dto.like.LikeDTO;
import com.basick.app.mapper.LikeMapper;
import com.basick.app.model.Like;
import com.basick.app.repository.LikeRepository;

/**
 * Service class for Like business logic
 */
@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final LikeMapper likeMapper;

    public LikeService(LikeRepository likeRepository, LikeMapper likeMapper) {
        this.likeRepository = likeRepository;
        this.likeMapper = likeMapper;
    }

    /**
     * Get all likes for a post
     */
    public List<LikeDTO> getLikesByPost(String postId) {
        try {
            List<Like> likes = likeRepository.findByPostId(postId);
            return likes.stream()
                    .map(likeMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving likes for post: " + postId, e);
        }
    }

    /**
     * Get all likes by a user
     */
    public List<LikeDTO> getLikesByUser(String userId) {
        try {
            List<Like> likes = likeRepository.findByUserId(userId);
            return likes.stream()
                    .map(likeMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving likes for user: " + userId, e);
        }
    }

    /**
     * Get like by ID
     */
    public LikeDTO getLikeById(String id) {
        try {
            Like like = likeRepository.findById(id);
            return like != null ? likeMapper.toDTO(like) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving like with ID: " + id, e);
        }
    }

    /**
     * Create a new like
     */
    public LikeDTO createLike(CreateLikeRequest request) {
        try {
            // Check if like already exists
            if (hasUserLikedPost(request.getUserId(), request.getPostId())) {
                return null; // Like already exists
            }
            
            Like like = likeMapper.toEntity(request);
            Like savedLike = likeRepository.save(like);
            return likeMapper.toDTO(savedLike);
        } catch (Exception e) {
            throw new RuntimeException("Error creating like", e);
        }
    }

    /**
     * Delete a like
     */
    public boolean deleteLike(String id) {
        try {
            return likeRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting like with ID: " + id, e);
        }
    }

    /**
     * Delete like by user and post
     */
    public boolean deleteLikeByUserAndPost(String userId, String postId) {
        try {
            Like like = likeRepository.findByUserIdAndPostId(userId, postId);
            if (like != null) {
                return likeRepository.deleteById(like.getId());
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting like for user: " + userId + " and post: " + postId, e);
        }
    }

    /**
     * Check if user has liked a post
     */
    public boolean hasUserLikedPost(String userId, String postId) {
        try {
            Like like = likeRepository.findByUserIdAndPostId(userId, postId);
            return like != null;
        } catch (Exception e) {
            throw new RuntimeException("Error checking if user liked post", e);
        }
    }

    /**
     * Get like count for a post
     */
    public long getLikeCountByPost(String postId) {
        try {
            return likeRepository.countByPostId(postId);
        } catch (Exception e) {
            throw new RuntimeException("Error counting likes for post: " + postId, e);
        }
    }

    /**
     * Get recent likes by user
     */
    public List<LikeDTO> getRecentLikesByUser(String userId, int limit) {
        try {
            List<Like> likes = likeRepository.findRecentByUserId(userId, limit);
            return likes.stream()
                    .map(likeMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving recent likes for user: " + userId, e);
        }
    }
}
