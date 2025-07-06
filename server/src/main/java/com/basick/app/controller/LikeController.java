package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basick.app.dto.like.CreateLikeRequest;
import com.basick.app.dto.like.LikeDTO;
import com.basick.app.service.LikeService;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    /**
     * Get all likes for a post
     */
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<LikeDTO>> getLikesByPost(@PathVariable String postId) {
        List<LikeDTO> likes = likeService.getLikesByPost(postId);
        return ResponseEntity.ok(likes);
    }

    /**
     * Get all likes by a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LikeDTO>> getLikesByUser(@PathVariable String userId) {
        List<LikeDTO> likes = likeService.getLikesByUser(userId);
        return ResponseEntity.ok(likes);
    }

    /**
     * Get like by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<LikeDTO> getLikeById(@PathVariable String id) {
        LikeDTO like = likeService.getLikeById(id);
        if (like != null) {
            return ResponseEntity.ok(like);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Create a new like
     */
    @PostMapping
    public ResponseEntity<LikeDTO> createLike(@RequestBody CreateLikeRequest request) {
        try {
            LikeDTO createdLike = likeService.createLike(request);
            if (createdLike != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdLike);
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // Like already exists
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Delete a like
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLike(@PathVariable String id) {
        boolean deleted = likeService.deleteLike(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Delete like by user and post
     */
    @DeleteMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<Void> deleteLikeByUserAndPost(
            @PathVariable String userId, 
            @PathVariable String postId) {
        boolean deleted = likeService.deleteLikeByUserAndPost(userId, postId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Check if user has liked a post
     */
    @GetMapping("/user/{userId}/post/{postId}/exists")
    public ResponseEntity<Boolean> hasUserLikedPost(
            @PathVariable String userId, 
            @PathVariable String postId) {
        boolean hasLiked = likeService.hasUserLikedPost(userId, postId);
        return ResponseEntity.ok(hasLiked);
    }

    /**
     * Get like count for a post
     */
    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> getLikeCountByPost(@PathVariable String postId) {
        long count = likeService.getLikeCountByPost(postId);
        return ResponseEntity.ok(count);
    }
}
