package com.basick.app.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.cloud.Timestamp;

public class Post {
    private String id;
    private String title;
    private String content;
    private String authorId;
    private String authorName; // Denormalized for efficiency
    private String authorProfilePicture; // Denormalized for efficiency
    private String postType; // "TEXT", "IMAGE", "VIDEO", "WORKOUT_SHARE", "PROGRESS_UPDATE"
    
    // Media content
    private List<String> imageUrls;
    private String videoUrl;
    private String thumbnailUrl;
    
    // Workout-related content
    private String workoutId; // If sharing a workout
    private Map<String, Object> workoutData; // Denormalized workout info
    private Map<String, Object> progressData; // Progress metrics if progress update
    
    // Social engagement
    private Integer likesCount;
    private Integer commentsCount;
    private Integer sharesCount;
    private List<String> likedBy; // User IDs who liked this post
    private Boolean isPublic; // Privacy setting
    
    // Content moderation
    private Boolean isReported;
    private Boolean isHidden;
    private String moderationStatus; // "PENDING", "APPROVED", "REJECTED"
    private List<String> tags; // Hashtags and searchable tags
    
    // Location data
    private String location;
    private Double latitude;
    private Double longitude;
    
    // Timestamps
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp scheduledAt; // For scheduled posts

    public Post() {
        this.likesCount = 0;
        this.commentsCount = 0;
        this.sharesCount = 0;
        this.isPublic = true;
        this.isReported = false;
        this.isHidden = false;
        this.moderationStatus = "APPROVED";
        this.likedBy = new ArrayList<>();
        this.tags = new ArrayList<>();
        this.imageUrls = new ArrayList<>();
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public Post(String title, String content, String authorId, String postType) {
        this();
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.postType = postType;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getAuthorId() { return authorId; }
    public void setAuthorId(String authorId) { this.authorId = authorId; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getAuthorProfilePicture() { return authorProfilePicture; }
    public void setAuthorProfilePicture(String authorProfilePicture) { this.authorProfilePicture = authorProfilePicture; }
    public String getPostType() { return postType; }
    public void setPostType(String postType) { this.postType = postType; }
    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getWorkoutId() { return workoutId; }
    public void setWorkoutId(String workoutId) { this.workoutId = workoutId; }
    public Map<String, Object> getWorkoutData() { return workoutData; }
    public void setWorkoutData(Map<String, Object> workoutData) { this.workoutData = workoutData; }
    public Map<String, Object> getProgressData() { return progressData; }
    public void setProgressData(Map<String, Object> progressData) { this.progressData = progressData; }
    public Integer getLikesCount() { return likesCount; }
    public void setLikesCount(Integer likesCount) { this.likesCount = likesCount; }
    public Integer getCommentsCount() { return commentsCount; }
    public void setCommentsCount(Integer commentsCount) { this.commentsCount = commentsCount; }
    public Integer getSharesCount() { return sharesCount; }
    public void setSharesCount(Integer sharesCount) { this.sharesCount = sharesCount; }
    public List<String> getLikedBy() { return likedBy; }
    public void setLikedBy(List<String> likedBy) { this.likedBy = likedBy; }
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    public Boolean getIsReported() { return isReported; }
    public void setIsReported(Boolean isReported) { this.isReported = isReported; }
    public Boolean getIsHidden() { return isHidden; }
    public void setIsHidden(Boolean isHidden) { this.isHidden = isHidden; }
    public String getModerationStatus() { return moderationStatus; }
    public void setModerationStatus(String moderationStatus) { this.moderationStatus = moderationStatus; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
    public Timestamp getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(Timestamp scheduledAt) { this.scheduledAt = scheduledAt; }

    // Business methods
    public void incrementLikesCount() {
        this.likesCount = (this.likesCount != null ? this.likesCount : 0) + 1;
        this.updatedAt = Timestamp.now();
    }

    public void decrementLikesCount() {
        this.likesCount = Math.max(0, (this.likesCount != null ? this.likesCount : 0) - 1);
        this.updatedAt = Timestamp.now();
    }

    public void incrementCommentsCount() {
        this.commentsCount = (this.commentsCount != null ? this.commentsCount : 0) + 1;
        this.updatedAt = Timestamp.now();
    }

    public void decrementCommentsCount() {
        this.commentsCount = Math.max(0, (this.commentsCount != null ? this.commentsCount : 0) - 1);
        this.updatedAt = Timestamp.now();
    }

    public void incrementSharesCount() {
        this.sharesCount = (this.sharesCount != null ? this.sharesCount : 0) + 1;
        this.updatedAt = Timestamp.now();
    }

    public void addLike(String userId) {
        if (this.likedBy == null) {
            this.likedBy = new ArrayList<>();
        }
        if (!this.likedBy.contains(userId)) {
            this.likedBy.add(userId);
            incrementLikesCount();
        }
    }

    public void removeLike(String userId) {
        if (this.likedBy != null && this.likedBy.contains(userId)) {
            this.likedBy.remove(userId);
            decrementLikesCount();
        }
    }

    public boolean isLikedBy(String userId) {
        return this.likedBy != null && this.likedBy.contains(userId);
    }

    public void addTag(String tag) {
        if (this.tags == null) {
            this.tags = new ArrayList<>();
        }
        if (!this.tags.contains(tag)) {
            this.tags.add(tag);
            this.updatedAt = Timestamp.now();
        }
    }

    public void addImageUrl(String imageUrl) {
        if (this.imageUrls == null) {
            this.imageUrls = new ArrayList<>();
        }
        this.imageUrls.add(imageUrl);
        this.updatedAt = Timestamp.now();
    }

    public void updateContent(String content) {
        this.content = content;
        this.updatedAt = Timestamp.now();
    }

    public void hide() {
        this.isHidden = true;
        this.updatedAt = Timestamp.now();
    }

    public void unhide() {
        this.isHidden = false;
        this.updatedAt = Timestamp.now();
    }

    public void report() {
        this.isReported = true;
        this.moderationStatus = "PENDING";
        this.updatedAt = Timestamp.now();
    }

    public boolean isScheduled() {
        return this.scheduledAt != null && this.scheduledAt.toDate().toInstant().isAfter(java.time.Instant.now());
    }

    public boolean isPublished() {
        return !isScheduled() && !this.isHidden;
    }
}
