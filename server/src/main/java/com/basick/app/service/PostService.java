package com.basick.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.post.CreatePostRequest;
import com.basick.app.dto.post.PostDTO;
import com.basick.app.dto.post.UpdatePostRequest;
import com.basick.app.mapper.PostMapper;
import com.basick.app.model.Post;
import com.basick.app.repository.PostRepository;

/**
 * Service class for Post business logic
 */
@Service
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public PostService(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    /**
     * Get all posts with pagination
     */
    public List<PostDTO> getAllPosts(int page, int size) {
        try {
            List<Post> posts = postRepository.findAll(page, size);
            return posts.stream()
                    .map(postMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving posts", e);
        }
    }

    /**
     * Get post by ID
     */
    public PostDTO getPostById(String id) {
        try {
            Post post = postRepository.findById(id);
            return post != null ? postMapper.toDTO(post) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving post with ID: " + id, e);
        }
    }

    /**
     * Get posts by author
     */
    public List<PostDTO> getPostsByAuthor(String authorId) {
        try {
            List<Post> posts = postRepository.findByAuthorId(authorId);
            return posts.stream()
                    .map(postMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving posts for author: " + authorId, e);
        }
    }

    /**
     * Get posts by type
     */
    public List<PostDTO> getPostsByType(String postType) {
        try {
            List<Post> posts = postRepository.findByPostType(postType);
            return posts.stream()
                    .map(postMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving posts of type: " + postType, e);
        }
    }

    /**
     * Create a new post
     */
    public PostDTO createPost(CreatePostRequest request) {
        try {
            Post post = postMapper.toEntity(request);
            Post savedPost = postRepository.save(post);
            return postMapper.toDTO(savedPost);
        } catch (Exception e) {
            throw new RuntimeException("Error creating post", e);
        }
    }

    /**
     * Update a post
     */
    public PostDTO updatePost(String id, UpdatePostRequest request) {
        try {
            Post existingPost = postRepository.findById(id);
            if (existingPost == null) {
                return null;
            }
            
            postMapper.updateEntity(existingPost, request);
            Post updatedPost = postRepository.update(existingPost);
            return postMapper.toDTO(updatedPost);
        } catch (Exception e) {
            throw new RuntimeException("Error updating post with ID: " + id, e);
        }
    }

    /**
     * Delete a post
     */
    public boolean deletePost(String id) {
        try {
            return postRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting post with ID: " + id, e);
        }
    }

    /**
     * Like a post
     */
    public PostDTO likePost(String id, String userId) {
        try {
            Post post = postRepository.findById(id);
            if (post == null) {
                return null;
            }
            
            post.addLike(userId);
            Post updatedPost = postRepository.update(post);
            return postMapper.toDTO(updatedPost);
        } catch (Exception e) {
            throw new RuntimeException("Error liking post with ID: " + id, e);
        }
    }

    /**
     * Unlike a post
     */
    public PostDTO unlikePost(String id, String userId) {
        try {
            Post post = postRepository.findById(id);
            if (post == null) {
                return null;
            }
            
            post.removeLike(userId);
            Post updatedPost = postRepository.update(post);
            return postMapper.toDTO(updatedPost);
        } catch (Exception e) {
            throw new RuntimeException("Error unliking post with ID: " + id, e);
        }
    }

    /**
     * Get posts by tags
     */
    public List<PostDTO> getPostsByTags(List<String> tags) {
        try {
            List<Post> posts = postRepository.findByTags(tags);
            return posts.stream()
                    .map(postMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving posts by tags", e);
        }
    }

    /**
     * Get trending posts
     */
    public List<PostDTO> getTrendingPosts() {
        try {
            List<Post> posts = postRepository.findTrendingPosts();
            return posts.stream()
                    .map(postMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving trending posts", e);
        }
    }

    /**
     * Toggle post visibility
     */
    public PostDTO togglePostVisibility(String id) {
        try {
            Post post = postRepository.findById(id);
            if (post == null) {
                return null;
            }
            
            if (post.getIsHidden()) {
                post.unhide();
            } else {
                post.hide();
            }
            
            Post updatedPost = postRepository.update(post);
            return postMapper.toDTO(updatedPost);
        } catch (Exception e) {
            throw new RuntimeException("Error toggling visibility for post with ID: " + id, e);
        }
    }

    /**
     * Report a post
     */
    public PostDTO reportPost(String id, String reporterId) {
        try {
            Post post = postRepository.findById(id);
            if (post == null) {
                return null;
            }
            
            post.report();
            Post updatedPost = postRepository.update(post);
            return postMapper.toDTO(updatedPost);
        } catch (Exception e) {
            throw new RuntimeException("Error reporting post with ID: " + id, e);
        }
    }

    /**
     * Get posts by location
     */
    public List<PostDTO> getPostsByLocation(String location, double radius) {
        try {
            List<Post> posts = postRepository.findByLocation(location, radius);
            return posts.stream()
                    .map(postMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving posts by location: " + location, e);
        }
    }

    /**
     * Get recent posts
     */
    public List<PostDTO> getRecentPosts(int limit) {
        try {
            List<Post> posts = postRepository.findRecentPosts(limit);
            return posts.stream()
                    .map(postMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving recent posts", e);
        }
    }
}
