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

import com.basick.app.dto.like.CreateLikeRequest;
import com.basick.app.dto.like.LikeDTO;
import com.basick.app.mapper.LikeMapper;
import com.basick.app.model.Like;
import com.basick.app.repository.LikeRepository;
import com.google.cloud.Timestamp;

@ExtendWith(MockitoExtension.class)
class LikeServiceTest {

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private LikeMapper likeMapper;

    @InjectMocks
    private LikeService likeService;

    private Like testLike;
    private LikeDTO testLikeDTO;
    private CreateLikeRequest createRequest;

    @BeforeEach
    void setUp() {
        testLike = new Like();
        testLike.setId("like1");
        testLike.setPostId("post1");
        testLike.setUserId("user1");
        testLike.setCreatedAt(Timestamp.now());

        testLikeDTO = new LikeDTO();
        testLikeDTO.setId("like1");
        testLikeDTO.setPostId("post1");
        testLikeDTO.setUserId("user1");

        createRequest = new CreateLikeRequest();
        createRequest.setPostId("post1");
        createRequest.setUserId("user1");
    }

    @Test
    void testGetLikesByPost() {
        // Given
        List<Like> likes = Arrays.asList(testLike);
        when(likeRepository.findByPostId("post1")).thenReturn(likes);
        when(likeMapper.toDTO(testLike)).thenReturn(testLikeDTO);

        // When
        List<LikeDTO> result = likeService.getLikesByPost("post1");

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testLikeDTO.getId(), result.get(0).getId());
        verify(likeRepository).findByPostId("post1");
    }

    @Test
    void testGetLikeById() {
        // Given
        when(likeRepository.findById("like1")).thenReturn(testLike);
        when(likeMapper.toDTO(testLike)).thenReturn(testLikeDTO);

        // When
        LikeDTO result = likeService.getLikeById("like1");

        // Then
        assertNotNull(result);
        assertEquals(testLikeDTO.getId(), result.getId());
        verify(likeRepository).findById("like1");
        verify(likeMapper).toDTO(testLike);
    }

    @Test
    void testCreateLike() {
        // Given
        when(likeMapper.toEntity(createRequest)).thenReturn(testLike);
        when(likeRepository.save(testLike)).thenReturn(testLike);
        when(likeMapper.toDTO(testLike)).thenReturn(testLikeDTO);

        // When
        LikeDTO result = likeService.createLike(createRequest);

        // Then
        assertNotNull(result);
        assertEquals(testLikeDTO.getId(), result.getId());
        verify(likeMapper).toEntity(createRequest);
        verify(likeRepository).save(testLike);
        verify(likeMapper).toDTO(testLike);
    }

    @Test
    void testDeleteLike() {
        // Given
        when(likeRepository.deleteById("like1")).thenReturn(true);

        // When
        boolean result = likeService.deleteLike("like1");

        // Then
        assertTrue(result);
        verify(likeRepository).deleteById("like1");
    }

    @Test
    void testGetLikeCountByPost() {
        // Given
        when(likeRepository.countByPostId("post1")).thenReturn(10L);

        // When
        long result = likeService.getLikeCountByPost("post1");

        // Then
        assertEquals(10L, result);
        verify(likeRepository).countByPostId("post1");
    }

    @Test
    void testHasUserLikedPost() {
        // Given
        when(likeRepository.findByUserIdAndPostId("user1", "post1")).thenReturn(testLike);

        // When
        boolean result = likeService.hasUserLikedPost("user1", "post1");

        // Then
        assertTrue(result);
        verify(likeRepository).findByUserIdAndPostId("user1", "post1");
    }

    @Test
    void testHasUserLikedPost_NotLiked() {
        // Given
        when(likeRepository.findByUserIdAndPostId("user1", "post1")).thenReturn(null);

        // When
        boolean result = likeService.hasUserLikedPost("user1", "post1");

        // Then
        assertFalse(result);
        verify(likeRepository).findByUserIdAndPostId("user1", "post1");
    }

    @Test
    void testDeleteLikeByUserAndPost() {
        // Given
        when(likeRepository.findByUserIdAndPostId("user1", "post1")).thenReturn(testLike);
        when(likeRepository.deleteById("like1")).thenReturn(true);

        // When
        boolean result = likeService.deleteLikeByUserAndPost("user1", "post1");

        // Then
        assertTrue(result);
        verify(likeRepository).findByUserIdAndPostId("user1", "post1");
        verify(likeRepository).deleteById("like1");
    }

    @Test
    void testDeleteLikeByUserAndPost_NotFound() {
        // Given
        when(likeRepository.findByUserIdAndPostId("user1", "post1")).thenReturn(null);

        // When
        boolean result = likeService.deleteLikeByUserAndPost("user1", "post1");

        // Then
        assertFalse(result);
        verify(likeRepository).findByUserIdAndPostId("user1", "post1");
        verify(likeRepository, never()).deleteById(any());
    }
}