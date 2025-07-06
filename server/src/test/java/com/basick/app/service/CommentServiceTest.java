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

import com.basick.app.dto.comment.CommentDTO;
import com.basick.app.dto.comment.CreateCommentRequest;
import com.basick.app.dto.comment.UpdateCommentRequest;
import com.basick.app.mapper.CommentMapper;
import com.basick.app.model.Comment;
import com.basick.app.repository.CommentRepository;
import com.google.cloud.Timestamp;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private CommentMapper commentMapper;

    @InjectMocks
    private CommentService commentService;

    private Comment testComment;
    private CommentDTO testCommentDTO;
    private CreateCommentRequest createRequest;
    private UpdateCommentRequest updateRequest;

    @BeforeEach
    void setUp() {
        testComment = new Comment();
        testComment.setId("comment1");
        testComment.setPostId("post1");
        testComment.setUserId("user1");
        testComment.setContent("Test Comment");
        testComment.setCreatedAt(Timestamp.now());
        testComment.setUpdatedAt(Timestamp.now());

        testCommentDTO = new CommentDTO();
        testCommentDTO.setId("comment1");
        testCommentDTO.setPostId("post1");
        testCommentDTO.setUserId("user1");
        testCommentDTO.setContent("Test Comment");

        createRequest = new CreateCommentRequest();
        createRequest.setPostId("post1");
        createRequest.setUserId("user1");
        createRequest.setContent("New Comment");

        updateRequest = new UpdateCommentRequest();
        updateRequest.setContent("Updated Comment");
    }

    @Test
    void testGetCommentsByPost() {
        // Given
        List<Comment> comments = Arrays.asList(testComment);
        when(commentRepository.findByPostId("post1")).thenReturn(comments);
        when(commentMapper.toDTO(testComment)).thenReturn(testCommentDTO);

        // When
        List<CommentDTO> result = commentService.getCommentsByPost("post1");

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testCommentDTO.getId(), result.get(0).getId());
        verify(commentRepository).findByPostId("post1");
    }

    @Test
    void testGetCommentById() {
        // Given
        when(commentRepository.findById("comment1")).thenReturn(testComment);
        when(commentMapper.toDTO(testComment)).thenReturn(testCommentDTO);

        // When
        CommentDTO result = commentService.getCommentById("comment1");

        // Then
        assertNotNull(result);
        assertEquals(testCommentDTO.getId(), result.getId());
        verify(commentRepository).findById("comment1");
        verify(commentMapper).toDTO(testComment);
    }

    @Test
    void testCreateComment() {
        // Given
        when(commentMapper.toEntity(createRequest)).thenReturn(testComment);
        when(commentRepository.save(testComment)).thenReturn(testComment);
        when(commentMapper.toDTO(testComment)).thenReturn(testCommentDTO);

        // When
        CommentDTO result = commentService.createComment(createRequest);

        // Then
        assertNotNull(result);
        assertEquals(testCommentDTO.getId(), result.getId());
        verify(commentMapper).toEntity(createRequest);
        verify(commentRepository).save(testComment);
        verify(commentMapper).toDTO(testComment);
    }

    @Test
    void testUpdateComment() {
        // Given
        when(commentRepository.findById("comment1")).thenReturn(testComment);
        when(commentRepository.update(testComment)).thenReturn(testComment);
        when(commentMapper.toDTO(testComment)).thenReturn(testCommentDTO);

        // When
        CommentDTO result = commentService.updateComment("comment1", updateRequest);

        // Then
        assertNotNull(result);
        assertEquals(testCommentDTO.getId(), result.getId());
        verify(commentRepository).findById("comment1");
        verify(commentMapper).updateEntityFromRequest(testComment, updateRequest);
        verify(commentRepository).update(testComment);
        verify(commentMapper).toDTO(testComment);
    }

    @Test
    void testDeleteComment() {
        // Given
        when(commentRepository.deleteById("comment1")).thenReturn(true);

        // When
        boolean result = commentService.deleteComment("comment1");

        // Then
        assertTrue(result);
        verify(commentRepository).deleteById("comment1");
    }

    @Test
    void testGetCommentCountByPost() {
        // Given
        when(commentRepository.countByPostId("post1")).thenReturn(5L);

        // When
        long result = commentService.getCommentCountByPost("post1");

        // Then
        assertEquals(5L, result);
        verify(commentRepository).countByPostId("post1");
    }
}