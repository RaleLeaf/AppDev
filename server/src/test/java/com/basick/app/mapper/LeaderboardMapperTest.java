package com.basick.app.mapper;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.basick.app.dto.leaderboard.CreateLeaderboardRequest;
import com.basick.app.dto.leaderboard.LeaderboardDTO;
import com.basick.app.dto.leaderboard.UpdateLeaderboardRequest;
import com.basick.app.model.Leaderboard;
import com.google.cloud.Timestamp;

class LeaderboardMapperTest {

    private LeaderboardMapper leaderboardMapper;
    private Leaderboard testLeaderboard;
    private CreateLeaderboardRequest createRequest;
    private UpdateLeaderboardRequest updateRequest;

    @BeforeEach
    void setUp() {
        leaderboardMapper = new LeaderboardMapper();

        testLeaderboard = new Leaderboard();
        testLeaderboard.setId("leaderboard1");
        testLeaderboard.setUserId("user1");
        testLeaderboard.setUserName("Test User");
        testLeaderboard.setCategory("STEPS");
        testLeaderboard.setTimeframe("WEEKLY");
        testLeaderboard.setRank(1);
        testLeaderboard.setScore(10000.0);
        testLeaderboard.setUnit("steps");
        testLeaderboard.setIsActive(true);
        testLeaderboard.setCreatedAt(Timestamp.now());
        testLeaderboard.setUpdatedAt(Timestamp.now());

        createRequest = new CreateLeaderboardRequest();
        createRequest.setUserId("user1");
        createRequest.setUserName("Test User");
        createRequest.setCategory("STEPS");
        createRequest.setTimeframe("WEEKLY");
        createRequest.setScore(10000.0);
        createRequest.setUnit("steps");

        updateRequest = new UpdateLeaderboardRequest();
        updateRequest.setRank(2);
        updateRequest.setScore(9500.0);
    }

    @Test
    void toDTO_ShouldMapLeaderboardToDTO() {
        // When
        LeaderboardDTO dto = leaderboardMapper.toDTO(testLeaderboard);

        // Then
        assertNotNull(dto);
        assertEquals(testLeaderboard.getId(), dto.getId());
        assertEquals(testLeaderboard.getUserId(), dto.getUserId());
        assertEquals(testLeaderboard.getUserName(), dto.getUserName());
        assertEquals(testLeaderboard.getCategory(), dto.getCategory());
        assertEquals(testLeaderboard.getTimeframe(), dto.getTimeframe());
        assertEquals(testLeaderboard.getRank(), dto.getRank());
        assertEquals(testLeaderboard.getScore(), dto.getScore());
        assertEquals(testLeaderboard.getUnit(), dto.getUnit());
        assertEquals(testLeaderboard.getIsActive(), dto.getIsActive());
        assertNotNull(dto.getCreatedAt());
        assertNotNull(dto.getUpdatedAt());
    }

    @Test
    void toDTO_WithNull_ShouldReturnNull() {
        // When
        LeaderboardDTO dto = leaderboardMapper.toDTO(null);

        // Then
        assertNull(dto);
    }

    @Test
    void toEntity_ShouldMapCreateRequestToLeaderboard() {
        // When
        Leaderboard leaderboard = leaderboardMapper.toEntity(createRequest);

        // Then
        assertNotNull(leaderboard);
        assertEquals(createRequest.getUserId(), leaderboard.getUserId());
        assertEquals(createRequest.getUserName(), leaderboard.getUserName());
        assertEquals(createRequest.getCategory(), leaderboard.getCategory());
        assertEquals(createRequest.getTimeframe(), leaderboard.getTimeframe());
        assertEquals(createRequest.getScore(), leaderboard.getScore());
        assertEquals(createRequest.getUnit(), leaderboard.getUnit());
        assertTrue(leaderboard.getIsActive());
    }

    @Test
    void toEntity_WithNull_ShouldReturnNull() {
        // When
        CreateLeaderboardRequest nullRequest = null;
        Leaderboard leaderboard = leaderboardMapper.toEntity(nullRequest);

        // Then
        assertNull(leaderboard);
    }

    @Test
    void updateEntityFromRequest_ShouldUpdateLeaderboard() {
        // Given
        Integer originalRank = testLeaderboard.getRank();
        Double originalScore = testLeaderboard.getScore();

        // When
        leaderboardMapper.updateEntityFromRequest(testLeaderboard, updateRequest);

        // Then
        assertEquals(updateRequest.getRank(), testLeaderboard.getRank());
        assertEquals(updateRequest.getScore(), testLeaderboard.getScore());
        assertNotEquals(originalRank, testLeaderboard.getRank());
        assertNotEquals(originalScore, testLeaderboard.getScore());
    }

    @Test
    void updateEntityFromRequest_WithNullValues_ShouldNotUpdate() {
        // Given
        UpdateLeaderboardRequest nullRequest = new UpdateLeaderboardRequest();
        Integer originalRank = testLeaderboard.getRank();
        Double originalScore = testLeaderboard.getScore();

        // When
        leaderboardMapper.updateEntityFromRequest(testLeaderboard, nullRequest);

        // Then
        assertEquals(originalRank, testLeaderboard.getRank());
        assertEquals(originalScore, testLeaderboard.getScore());
    }

    @Test
    void updateEntityFromRequest_WithNullEntity_ShouldNotThrow() {
        // When/Then - should not throw exception
        assertDoesNotThrow(() -> leaderboardMapper.updateEntityFromRequest(null, updateRequest));
    }

    @Test
    void updateEntityFromRequest_WithNullRequest_ShouldNotThrow() {
        // When/Then - should not throw exception
        assertDoesNotThrow(() -> leaderboardMapper.updateEntityFromRequest(testLeaderboard, null));
    }
}
