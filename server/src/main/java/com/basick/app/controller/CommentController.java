package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basick.app.dto.comment.CommentDTO;
import com.basick.app.dto.comment.CreateCommentRequest;
import com.basick.app.dto.comment.UpdateCommentRequest;
import com.basick.app.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    /**
     * Get all comments for a post
     */
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPost(@PathVariable String postId) {
        List<CommentDTO> comments = commentService.getCommentsByPost(postId);
        return ResponseEntity.ok(comments);
    }

    /**
     * Get all comments by a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByUser(@PathVariable String userId) {
        List<CommentDTO> comments = commentService.getCommentsByUser(userId);
        return ResponseEntity.ok(comments);
    }

    /**
     * Get comment by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable String id) {
        CommentDTO comment = commentService.getCommentById(id);
        if (comment != null) {
            return ResponseEntity.ok(comment);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Create a new comment
     */
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@RequestBody CreateCommentRequest request) {
        try {
            CommentDTO createdComment = commentService.createComment(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Update a comment
     */
    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> updateComment(
            @PathVariable String id, 
            @RequestBody UpdateCommentRequest request) {
        try {
            CommentDTO updatedComment = commentService.updateComment(id, request);
            if (updatedComment != null) {
                return ResponseEntity.ok(updatedComment);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Delete a comment
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {
        boolean deleted = commentService.deleteComment(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Get comment count for a post
     */
    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> getCommentCountByPost(@PathVariable String postId) {
        long count = commentService.getCommentCountByPost(postId);
        return ResponseEntity.ok(count);
    }

    /**
     * Get recent comments by user
     */
    @GetMapping("/user/{userId}/recent")
    public ResponseEntity<List<CommentDTO>> getRecentCommentsByUser(@PathVariable String userId) {
        List<CommentDTO> comments = commentService.getRecentCommentsByUser(userId, 10);
        return ResponseEntity.ok(comments);
    }
}
