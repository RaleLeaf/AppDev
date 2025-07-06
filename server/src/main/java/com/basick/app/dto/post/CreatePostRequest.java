package com.basick.app.dto.post;

import java.util.List;
import java.util.Map;
import com.google.cloud.Timestamp;

/**
 * Request DTO for creating a new Post
 */
public class CreatePostRequest {
    private String title;
    private String content;
    private String authorId;
    private String authorName;
    private String authorProfilePicture;
    private String postType; // "TEXT", "IMAGE", "VIDEO", "WORKOUT_SHARE", "PROGRESS_UPDATE"
    private List<String> imageUrls;
    private String videoUrl;
    private String thumbnailUrl;
    private String workoutId;
    private Map<String, Object> workoutData;
    private Map<String, Object> progressData;
    private Boolean isPublic;
    private List<String> tags;
    private String location;
    private Double latitude;
    private Double longitude;
    private Timestamp scheduledAt;

    // Constructors
    public CreatePostRequest() {}

    // Getters and Setters
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

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Timestamp getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(Timestamp scheduledAt) { this.scheduledAt = scheduledAt; }
}
