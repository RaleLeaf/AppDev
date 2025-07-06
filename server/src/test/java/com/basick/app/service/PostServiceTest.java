package com.basick.app.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.basick.app.dto.post.CreatePostRequest;
import com.basick.app.dto.post.PostDTO;
import com.basick.app.dto.post.UpdatePostRequest;
import com.basick.app.mapper.PostMapper;
import com.basick.app.model.Post;
import com.basick.app.repository.PostRepository;
import com.google.cloud.Timestamp;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private PostMapper postMapper;

    @InjectMocks
    private PostService postService;

    private Post testPost;
    private PostDTO testPostDTO;
    private CreatePostRequest createRequest;
    private UpdatePostRequest updateRequest;

    @BeforeEach
    void setUp() {
        testPost = new Post();
        testPost.setId("post1");
        testPost.setTitle("Test Post");
        testPost.setContent("Test Content");
        testPost.setAuthorId("user1");
        testPost.setCreatedAt(Timestamp.now());
        testPost.setUpdatedAt(Timestamp.now());

        testPostDTO = new PostDTO();
        testPostDTO.setId("post1");
        testPostDTO.setTitle("Test Post");
        testPostDTO.setContent("Test Content");
        testPostDTO.setAuthorId("user1");

        createRequest = new CreatePostRequest();
        createRequest.setTitle("New Post");
        createRequest.setContent("New Content");
        createRequest.setAuthorId("user1");

        updateRequest = new UpdatePostRequest();
        updateRequest.setTitle("Updated Post");
        updateRequest.setContent("Updated Content");
    }

    @Test
    void testGetAllPosts() {
        // Given
        List<Post> posts = Arrays.asList(testPost);
        when(postRepository.findAll(0, 10)).thenReturn(posts);
        when(postMapper.toDTO(testPost)).thenReturn(testPostDTO);

        // When
        List<PostDTO> result = postService.getAllPosts(0, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testPostDTO.getId(), result.get(0).getId());
        verify(postRepository).findAll(0, 10);
        verify(postMapper).toDTO(testPost);
    }

    @Test
    void testGetPostById() {
        // Given
        when(postRepository.findById("post1")).thenReturn(testPost);
        when(postMapper.toDTO(testPost)).thenReturn(testPostDTO);

        // When
        PostDTO result = postService.getPostById("post1");

        // Then
        assertNotNull(result);
        assertEquals(testPostDTO.getId(), result.getId());
        verify(postRepository).findById("post1");
        verify(postMapper).toDTO(testPost);
    }

    @Test
    void testGetPostById_NotFound() {
        // Given
        when(postRepository.findById("nonexistent")).thenReturn(null);

        // When
        PostDTO result = postService.getPostById("nonexistent");

        // Then
        assertNull(result);
        verify(postRepository).findById("nonexistent");
        verify(postMapper, never()).toDTO(any());
    }

    @Test
    void testCreatePost() {
        // Given
        when(postMapper.toEntity(createRequest)).thenReturn(testPost);
        when(postRepository.save(testPost)).thenReturn(testPost);
        when(postMapper.toDTO(testPost)).thenReturn(testPostDTO);

        // When
        PostDTO result = postService.createPost(createRequest);

        // Then
        assertNotNull(result);
        assertEquals(testPostDTO.getId(), result.getId());
        verify(postMapper).toEntity(createRequest);
        verify(postRepository).save(testPost);
        verify(postMapper).toDTO(testPost);
    }

    @Test
    void testUpdatePost() {
        // Given
        when(postRepository.findById("post1")).thenReturn(testPost);
        when(postRepository.update(testPost)).thenReturn(testPost);
        when(postMapper.toDTO(testPost)).thenReturn(testPostDTO);

        // When
        PostDTO result = postService.updatePost("post1", updateRequest);

        // Then
        assertNotNull(result);
        assertEquals(testPostDTO.getId(), result.getId());
        verify(postRepository).findById("post1");
        verify(postMapper).updateEntity(testPost, updateRequest);
        verify(postRepository).update(testPost);
        verify(postMapper).toDTO(testPost);
    }

    @Test
    void testUpdatePost_NotFound() {
        // Given
        when(postRepository.findById("nonexistent")).thenReturn(null);

        // When
        PostDTO result = postService.updatePost("nonexistent", updateRequest);

        // Then
        assertNull(result);
        verify(postRepository).findById("nonexistent");
        verify(postMapper, never()).updateEntity(any(), any());
        verify(postRepository, never()).update(any());
    }

    @Test
    void testDeletePost() {
        // Given
        when(postRepository.deleteById("post1")).thenReturn(true);

        // When
        boolean result = postService.deletePost("post1");

        // Then
        assertTrue(result);
        verify(postRepository).deleteById("post1");
    }

    @Test
    void testGetPostsByAuthor() {
        // Given
        List<Post> posts = Arrays.asList(testPost);
        when(postRepository.findByAuthorId("user1")).thenReturn(posts);
        when(postMapper.toDTO(testPost)).thenReturn(testPostDTO);

        // When
        List<PostDTO> result = postService.getPostsByAuthor("user1");

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(postRepository).findByAuthorId("user1");
        verify(postMapper).toDTO(testPost);
    }
}
