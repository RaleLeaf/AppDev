package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.post.CreatePostRequest;
import com.basick.app.dto.post.PostDTO;
import com.basick.app.dto.post.UpdatePostRequest;
import com.basick.app.model.Post;
import com.google.cloud.Timestamp;

/**
 * Mapper for converting between Post entities and DTOs
 */
@Component
public class PostMapper {

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
     * Convert Post entity to PostDTO
     */
    public PostDTO toDTO(Post post) {
        if (post == null) {
            return null;
        }

        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setAuthorId(post.getAuthorId());
        postDTO.setAuthorName(post.getAuthorName());
        postDTO.setAuthorProfilePicture(post.getAuthorProfilePicture());
        postDTO.setPostType(post.getPostType());
        postDTO.setImageUrls(post.getImageUrls());
        postDTO.setVideoUrl(post.getVideoUrl());
        postDTO.setThumbnailUrl(post.getThumbnailUrl());
        postDTO.setWorkoutId(post.getWorkoutId());
        postDTO.setWorkoutData(post.getWorkoutData());
        postDTO.setProgressData(post.getProgressData());
        postDTO.setLikesCount(post.getLikesCount());
        postDTO.setCommentsCount(post.getCommentsCount());
        postDTO.setSharesCount(post.getSharesCount());
        postDTO.setLikedBy(post.getLikedBy());
        postDTO.setIsPublic(post.getIsPublic());
        postDTO.setIsReported(post.getIsReported());
        postDTO.setIsHidden(post.getIsHidden());
        postDTO.setModerationStatus(post.getModerationStatus());
        postDTO.setTags(post.getTags());
        postDTO.setLocation(post.getLocation());
        postDTO.setLatitude(post.getLatitude());
        postDTO.setLongitude(post.getLongitude());
        postDTO.setCreatedAt(timestampToString(post.getCreatedAt()));
        postDTO.setUpdatedAt(timestampToString(post.getUpdatedAt()));
        postDTO.setScheduledAt(timestampToString(post.getScheduledAt()));

        return postDTO;
    }

    /**
     * Convert list of Post entities to list of PostDTOs
     */
    public List<PostDTO> toDTOList(List<Post> posts) {
        if (posts == null) {
            return null;
        }
        return posts.stream()
                   .map(this::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Convert CreatePostRequest to Post entity
     */
    public Post toEntity(CreatePostRequest request) {
        if (request == null) {
            return null;
        }

        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthorId(request.getAuthorId());
        post.setAuthorName(request.getAuthorName());
        post.setAuthorProfilePicture(request.getAuthorProfilePicture());
        post.setPostType(request.getPostType());
        post.setImageUrls(request.getImageUrls());
        post.setVideoUrl(request.getVideoUrl());
        post.setThumbnailUrl(request.getThumbnailUrl());
        post.setWorkoutId(request.getWorkoutId());
        post.setWorkoutData(request.getWorkoutData());
        post.setProgressData(request.getProgressData());
        post.setIsPublic(request.getIsPublic());
        post.setTags(request.getTags());
        post.setLocation(request.getLocation());
        post.setLatitude(request.getLatitude());
        post.setLongitude(request.getLongitude());
        post.setScheduledAt(request.getScheduledAt());

        return post;
    }

    /**
     * Update Post entity from UpdatePostRequest
     */
    public void updateEntity(Post post, UpdatePostRequest request) {
        if (request == null || post == null) {
            return;
        }

        if (request.getTitle() != null) {
            post.setTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            post.updateContent(request.getContent());
        }
        if (request.getPostType() != null) {
            post.setPostType(request.getPostType());
        }
        if (request.getImageUrls() != null) {
            post.setImageUrls(request.getImageUrls());
        }
        if (request.getVideoUrl() != null) {
            post.setVideoUrl(request.getVideoUrl());
        }
        if (request.getThumbnailUrl() != null) {
            post.setThumbnailUrl(request.getThumbnailUrl());
        }
        if (request.getWorkoutId() != null) {
            post.setWorkoutId(request.getWorkoutId());
        }
        if (request.getWorkoutData() != null) {
            post.setWorkoutData(request.getWorkoutData());
        }
        if (request.getProgressData() != null) {
            post.setProgressData(request.getProgressData());
        }
        if (request.getIsPublic() != null) {
            post.setIsPublic(request.getIsPublic());
        }
        if (request.getTags() != null) {
            post.setTags(request.getTags());
        }
        if (request.getLocation() != null) {
            post.setLocation(request.getLocation());
        }
        if (request.getLatitude() != null) {
            post.setLatitude(request.getLatitude());
        }
        if (request.getLongitude() != null) {
            post.setLongitude(request.getLongitude());
        }
        if (request.getScheduledAt() != null) {
            post.setScheduledAt(request.getScheduledAt());
        }

        post.setUpdatedAt(Timestamp.now());
    }
}
