package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.like.CreateLikeRequest;
import com.basick.app.dto.like.LikeDTO;
import com.basick.app.model.Like;
import com.google.cloud.Timestamp;

/**
 * Mapper for converting between Like entities and DTOs
 */
@Component
public class LikeMapper {

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
     * Convert Like entity to LikeDTO
     */
    public LikeDTO toDTO(Like like) {
        if (like == null) {
            return null;
        }

        LikeDTO likeDTO = new LikeDTO();
        likeDTO.setId(like.getId());
        likeDTO.setUserId(like.getUserId());
        likeDTO.setPostId(like.getPostId());
        likeDTO.setCreatedAt(timestampToString(like.getCreatedAt()));

        return likeDTO;
    }

    /**
     * Convert list of Like entities to list of LikeDTOs
     */
    public List<LikeDTO> toDTOList(List<Like> likes) {
        if (likes == null) {
            return null;
        }
        return likes.stream()
                   .map(this::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Convert CreateLikeRequest to Like entity
     */
    public Like toEntity(CreateLikeRequest request) {
        if (request == null) {
            return null;
        }

        Like like = new Like();
        like.setUserId(request.getUserId());
        like.setPostId(request.getPostId());

        return like;
    }
}
