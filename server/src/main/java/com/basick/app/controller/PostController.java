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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.basick.app.dto.post.CreatePostRequest;
import com.basick.app.dto.post.PostDTO;
import com.basick.app.dto.post.UpdatePostRequest;
import com.basick.app.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    /**
     * Get all posts with pagination
     */
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        List<PostDTO> posts = postService.getAllPosts(page, size);
        return ResponseEntity.ok(posts);
    }

    /**
     * Get post by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable String id) {
        PostDTO post = postService.getPostById(id);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Get posts by author
     */
    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<PostDTO>> getPostsByAuthor(@PathVariable String authorId) {
        List<PostDTO> posts = postService.getPostsByAuthor(authorId);
        return ResponseEntity.ok(posts);
    }

    /**
     * Get posts by type
     */
    @GetMapping("/type/{postType}")
    public ResponseEntity<List<PostDTO>> getPostsByType(@PathVariable String postType) {
        List<PostDTO> posts = postService.getPostsByType(postType);
        return ResponseEntity.ok(posts);
    }

    /**
     * Create a new post
     */
    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody CreatePostRequest request) {
        try {
            PostDTO createdPost = postService.createPost(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Update a post
     */
    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(
            @PathVariable String id, 
            @RequestBody UpdatePostRequest request) {
        try {
            PostDTO updatedPost = postService.updatePost(id, request);
            if (updatedPost != null) {
                return ResponseEntity.ok(updatedPost);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Delete a post
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        boolean deleted = postService.deletePost(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Like a post
     */
    @PostMapping("/{id}/like")
    public ResponseEntity<PostDTO> likePost(@PathVariable String id, @RequestParam String userId) {
        try {
            PostDTO updatedPost = postService.likePost(id, userId);
            if (updatedPost != null) {
                return ResponseEntity.ok(updatedPost);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Unlike a post
     */
    @DeleteMapping("/{id}/like")
    public ResponseEntity<PostDTO> unlikePost(@PathVariable String id, @RequestParam String userId) {
        try {
            PostDTO updatedPost = postService.unlikePost(id, userId);
            if (updatedPost != null) {
                return ResponseEntity.ok(updatedPost);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Get posts by tags
     */
    @GetMapping("/tags")
    public ResponseEntity<List<PostDTO>> getPostsByTags(@RequestParam List<String> tags) {
        List<PostDTO> posts = postService.getPostsByTags(tags);
        return ResponseEntity.ok(posts);
    }

    /**
     * Get trending posts
     */
    @GetMapping("/trending")
    public ResponseEntity<List<PostDTO>> getTrendingPosts() {
        List<PostDTO> posts = postService.getTrendingPosts();
        return ResponseEntity.ok(posts);
    }

    /**
     * Hide/unhide a post
     */
    @PutMapping("/{id}/visibility")
    public ResponseEntity<PostDTO> togglePostVisibility(@PathVariable String id) {
        try {
            PostDTO updatedPost = postService.togglePostVisibility(id);
            if (updatedPost != null) {
                return ResponseEntity.ok(updatedPost);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Report a post
     */
    @PostMapping("/{id}/report")
    public ResponseEntity<PostDTO> reportPost(@PathVariable String id, @RequestParam String reporterId) {
        try {
            PostDTO updatedPost = postService.reportPost(id, reporterId);
            if (updatedPost != null) {
                return ResponseEntity.ok(updatedPost);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
