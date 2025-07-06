package com.basick.app.model;

import java.util.List;
import java.util.Map;

import com.google.cloud.Timestamp;

public class Trainer {
    private String id;
    private String userId; // Reference to User entity
    private String businessName;
    private String bio;
    private String profilePictureUrl;
    private List<String> certifications;
    private List<String> specializations; // e.g., ["WEIGHT_LOSS", "MUSCLE_BUILDING", "YOGA"]
    private Integer experienceYears;
    
    // Contact and location
    private String phoneNumber;
    private String email;
    private String website;
    private String location;
    private String timezone;
    private Boolean isAvailableOnline;
    private Boolean isAvailableInPerson;
    
    // Pricing
    private Double hourlyRate;
    private Double packageRate; // For package deals
    private String currency;
    private Map<String, Double> servicePricing; // Different service types and prices
    
    // Availability
    private Map<String, List<String>> availability; // Day of week -> time slots
    private Boolean isAcceptingNewClients;
    private Integer maxClientsPerSlot;
    
    // Ratings and reviews
    private Double averageRating;
    private Integer totalReviews;
    private Integer totalClients;
    private Integer totalSessions;
    
    // Social proof
    private List<String> testimonials;
    private List<String> beforeAfterPhotos;
    private String instagramHandle;
    private String youtubeChannel;
    
    // Verification status
    private Boolean isVerified; // Platform verified
    private Boolean isBackgroundChecked;
    private String verificationStatus; // "PENDING", "VERIFIED", "REJECTED"
    private List<String> verificationDocuments;
    
    // Content
    private List<String> createdWorkouts; // Workout IDs created by this trainer
    private List<String> createdPrograms; // Program IDs created by this trainer
    private Integer contentViews;
    private Integer contentLikes;
    
    // Subscription and payment
    private Boolean isSubscriptionBased;
    private Double monthlySubscriptionRate;
    private String stripeAccountId; // For payments
    private Boolean isPayoutEnabled;
    
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp lastActiveAt;

    public Trainer() {
        this.averageRating = 0.0;
        this.totalReviews = 0;
        this.totalClients = 0;
        this.totalSessions = 0;
        this.isAcceptingNewClients = true;
        this.maxClientsPerSlot = 1;
        this.isVerified = false;
        this.isBackgroundChecked = false;
        this.verificationStatus = "PENDING";
        this.isAvailableOnline = true;
        this.isAvailableInPerson = false;
        this.contentViews = 0;
        this.contentLikes = 0;
        this.isSubscriptionBased = false;
        this.isPayoutEnabled = false;
        this.currency = "USD";
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public Trainer(String userId, String businessName, String bio) {
        this();
        this.userId = userId;
        this.businessName = businessName;
        this.bio = bio;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }
    public List<String> getCertifications() { return certifications; }
    public void setCertifications(List<String> certifications) { this.certifications = certifications; }
    public List<String> getSpecializations() { return specializations; }
    public void setSpecializations(List<String> specializations) { this.specializations = specializations; }
    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }
    public Boolean getIsAvailableOnline() { return isAvailableOnline; }
    public void setIsAvailableOnline(Boolean isAvailableOnline) { this.isAvailableOnline = isAvailableOnline; }
    public Boolean getIsAvailableInPerson() { return isAvailableInPerson; }
    public void setIsAvailableInPerson(Boolean isAvailableInPerson) { this.isAvailableInPerson = isAvailableInPerson; }
    public Double getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Double hourlyRate) { this.hourlyRate = hourlyRate; }
    public Double getPackageRate() { return packageRate; }
    public void setPackageRate(Double packageRate) { this.packageRate = packageRate; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public Map<String, Double> getServicePricing() { return servicePricing; }
    public void setServicePricing(Map<String, Double> servicePricing) { this.servicePricing = servicePricing; }
    public Map<String, List<String>> getAvailability() { return availability; }
    public void setAvailability(Map<String, List<String>> availability) { this.availability = availability; }
    public Boolean getIsAcceptingNewClients() { return isAcceptingNewClients; }
    public void setIsAcceptingNewClients(Boolean isAcceptingNewClients) { this.isAcceptingNewClients = isAcceptingNewClients; }
    public Integer getMaxClientsPerSlot() { return maxClientsPerSlot; }
    public void setMaxClientsPerSlot(Integer maxClientsPerSlot) { this.maxClientsPerSlot = maxClientsPerSlot; }
    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
    public Integer getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Integer totalReviews) { this.totalReviews = totalReviews; }
    public Integer getTotalClients() { return totalClients; }
    public void setTotalClients(Integer totalClients) { this.totalClients = totalClients; }
    public Integer getTotalSessions() { return totalSessions; }
    public void setTotalSessions(Integer totalSessions) { this.totalSessions = totalSessions; }
    public List<String> getTestimonials() { return testimonials; }
    public void setTestimonials(List<String> testimonials) { this.testimonials = testimonials; }
    public List<String> getBeforeAfterPhotos() { return beforeAfterPhotos; }
    public void setBeforeAfterPhotos(List<String> beforeAfterPhotos) { this.beforeAfterPhotos = beforeAfterPhotos; }
    public String getInstagramHandle() { return instagramHandle; }
    public void setInstagramHandle(String instagramHandle) { this.instagramHandle = instagramHandle; }
    public String getYoutubeChannel() { return youtubeChannel; }
    public void setYoutubeChannel(String youtubeChannel) { this.youtubeChannel = youtubeChannel; }
    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }
    public Boolean getIsBackgroundChecked() { return isBackgroundChecked; }
    public void setIsBackgroundChecked(Boolean isBackgroundChecked) { this.isBackgroundChecked = isBackgroundChecked; }
    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
    public List<String> getVerificationDocuments() { return verificationDocuments; }
    public void setVerificationDocuments(List<String> verificationDocuments) { this.verificationDocuments = verificationDocuments; }
    public List<String> getCreatedWorkouts() { return createdWorkouts; }
    public void setCreatedWorkouts(List<String> createdWorkouts) { this.createdWorkouts = createdWorkouts; }
    public List<String> getCreatedPrograms() { return createdPrograms; }
    public void setCreatedPrograms(List<String> createdPrograms) { this.createdPrograms = createdPrograms; }
    public Integer getContentViews() { return contentViews; }
    public void setContentViews(Integer contentViews) { this.contentViews = contentViews; }
    public Integer getContentLikes() { return contentLikes; }
    public void setContentLikes(Integer contentLikes) { this.contentLikes = contentLikes; }
    public Boolean getIsSubscriptionBased() { return isSubscriptionBased; }
    public void setIsSubscriptionBased(Boolean isSubscriptionBased) { this.isSubscriptionBased = isSubscriptionBased; }
    public Double getMonthlySubscriptionRate() { return monthlySubscriptionRate; }
    public void setMonthlySubscriptionRate(Double monthlySubscriptionRate) { this.monthlySubscriptionRate = monthlySubscriptionRate; }
    public String getStripeAccountId() { return stripeAccountId; }
    public void setStripeAccountId(String stripeAccountId) { this.stripeAccountId = stripeAccountId; }
    public Boolean getIsPayoutEnabled() { return isPayoutEnabled; }
    public void setIsPayoutEnabled(Boolean isPayoutEnabled) { this.isPayoutEnabled = isPayoutEnabled; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
    public Timestamp getLastActiveAt() { return lastActiveAt; }
    public void setLastActiveAt(Timestamp lastActiveAt) { this.lastActiveAt = lastActiveAt; }

    // Business methods
    public void updateTimestamp() {
        this.updatedAt = Timestamp.now();
    }

    public void updateLastActive() {
        this.lastActiveAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public void verify() {
        this.isVerified = true;
        this.verificationStatus = "VERIFIED";
        this.updateTimestamp();
    }

    public void rejectVerification() {
        this.isVerified = false;
        this.verificationStatus = "REJECTED";
        this.updateTimestamp();
    }

    public void completeBackgroundCheck() {
        this.isBackgroundChecked = true;
        this.updateTimestamp();
    }

    public void addReview(Double rating) {
        if (rating != null && rating >= 1 && rating <= 5) {
            Double totalRating = this.averageRating * this.totalReviews;
            this.totalReviews++;
            this.averageRating = (totalRating + rating) / this.totalReviews;
            this.updateTimestamp();
        }
    }

    public void incrementSessionCount() {
        this.totalSessions = (this.totalSessions != null) ? this.totalSessions + 1 : 1;
        this.updateTimestamp();
    }

    public void incrementClientCount() {
        this.totalClients = (this.totalClients != null) ? this.totalClients + 1 : 1;
        this.updateTimestamp();
    }

    public void incrementContentViews() {
        this.contentViews = (this.contentViews != null) ? this.contentViews + 1 : 1;
        this.updateTimestamp();
    }

    public void incrementContentLikes() {
        this.contentLikes = (this.contentLikes != null) ? this.contentLikes + 1 : 1;
        this.updateTimestamp();
    }

    public void setNotAcceptingNewClients() {
        this.isAcceptingNewClients = false;
        this.updateTimestamp();
    }

    public void setAcceptingNewClients() {
        this.isAcceptingNewClients = true;
        this.updateTimestamp();
    }

    public boolean isActiveTrainer() {
        return this.isVerified && this.isAcceptingNewClients && "VERIFIED".equals(this.verificationStatus);
    }

    public boolean canAcceptPayments() {
        return this.isPayoutEnabled && this.stripeAccountId != null && !this.stripeAccountId.isEmpty();
    }

    public String getDisplayName() {
        return this.businessName != null && !this.businessName.isEmpty() ? this.businessName : "Personal Trainer";
    }

    public Double getEffectiveHourlyRate() {
        return this.hourlyRate != null ? this.hourlyRate : 0.0;
    }
}
