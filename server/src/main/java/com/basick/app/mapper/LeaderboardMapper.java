package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.leaderboard.CreateLeaderboardRequest;
import com.basick.app.dto.leaderboard.LeaderboardDTO;
import com.basick.app.dto.leaderboard.UpdateLeaderboardRequest;
import com.basick.app.model.Leaderboard;
import com.google.cloud.Timestamp;

@Component
public class LeaderboardMapper {

    /**
     * Convert Leaderboard entity to LeaderboardDTO
     */
    public LeaderboardDTO toDTO(Leaderboard leaderboard) {
        if (leaderboard == null) {
            return null;
        }

        LeaderboardDTO dto = new LeaderboardDTO();
        dto.setId(leaderboard.getId());
        dto.setUserId(leaderboard.getUserId());
        dto.setUserName(leaderboard.getUserName());
        dto.setUserProfilePicture(leaderboard.getUserProfilePicture());
        dto.setCategory(leaderboard.getCategory());
        dto.setTimeframe(leaderboard.getTimeframe());
        dto.setRank(leaderboard.getRank());
        dto.setPreviousRank(leaderboard.getPreviousRank());
        dto.setScore(leaderboard.getScore());
        dto.setUnit(leaderboard.getUnit());
        dto.setFormattedScore(leaderboard.getFormattedScore());
        dto.setRankChange(leaderboard.getRankChange());
        dto.setIsActive(leaderboard.getIsActive());
        dto.setCalculatedAt(timestampToString(leaderboard.getCalculatedAt()));
        dto.setCreatedAt(timestampToString(leaderboard.getCreatedAt()));
        dto.setUpdatedAt(timestampToString(leaderboard.getUpdatedAt()));

        return dto;
    }

    /**
     * Convert Leaderboard entity list to LeaderboardDTO list
     */
    public List<LeaderboardDTO> toDTOList(List<Leaderboard> leaderboards) {
        if (leaderboards == null) {
            return null;
        }
        return leaderboards.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert CreateLeaderboardRequest to Leaderboard entity
     */
    public Leaderboard toEntity(CreateLeaderboardRequest request) {
        if (request == null) {
            return null;
        }

        Leaderboard leaderboard = new Leaderboard();
        leaderboard.setUserId(request.getUserId());
        leaderboard.setCategory(request.getCategory());
        leaderboard.setTimeframe(request.getTimeframe());
        leaderboard.setScore(request.getScore());
        leaderboard.setUnit(request.getUnit());
        leaderboard.setUserName(request.getUserName());
        leaderboard.setUserProfilePicture(request.getUserProfilePicture());

        return leaderboard;
    }

    /**
     * Update Leaderboard entity from UpdateLeaderboardRequest
     */
    public void updateEntityFromRequest(Leaderboard leaderboard, UpdateLeaderboardRequest request) {
        if (leaderboard == null || request == null) {
            return;
        }

        if (request.getScore() != null) {
            leaderboard.updateScore(request.getScore());
        }
        if (request.getRank() != null) {
            leaderboard.updateRank(request.getRank());
        }
        if (request.getUserName() != null) {
            leaderboard.setUserName(request.getUserName());
        }
        if (request.getUserProfilePicture() != null) {
            leaderboard.setUserProfilePicture(request.getUserProfilePicture());
        }
        if (request.getIsActive() != null) {
            leaderboard.setIsActive(request.getIsActive());
        }
        leaderboard.setUpdatedAt(Timestamp.now());
    }

    /**
     * Convert LeaderboardDTO to Leaderboard entity
     */
    public Leaderboard toEntity(LeaderboardDTO dto) {
        if (dto == null) {
            return null;
        }

        Leaderboard leaderboard = new Leaderboard();
        leaderboard.setId(dto.getId());
        leaderboard.setUserId(dto.getUserId());
        leaderboard.setUserName(dto.getUserName());
        leaderboard.setUserProfilePicture(dto.getUserProfilePicture());
        leaderboard.setCategory(dto.getCategory());
        leaderboard.setTimeframe(dto.getTimeframe());
        leaderboard.setRank(dto.getRank());
        leaderboard.setPreviousRank(dto.getPreviousRank());
        leaderboard.setScore(dto.getScore());
        leaderboard.setUnit(dto.getUnit());
        leaderboard.setIsActive(dto.getIsActive());
        leaderboard.setCalculatedAt(stringToTimestamp(dto.getCalculatedAt()));
        leaderboard.setCreatedAt(stringToTimestamp(dto.getCreatedAt()));
        leaderboard.setUpdatedAt(stringToTimestamp(dto.getUpdatedAt()));

        return leaderboard;
    }

    /**
     * Convert Timestamp to ISO-8601 String format
     */
    private String timestampToString(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        return timestamp.toDate().toInstant().toString();
    }

    /**
     * Convert ISO-8601 String to Timestamp
     */
    private Timestamp stringToTimestamp(String timestampString) {
        if (timestampString == null) {
            return null;
        }
        try {
            return Timestamp.parseTimestamp(timestampString);
        } catch (Exception e) {
            return Timestamp.now();
        }
    }
}
