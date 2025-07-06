package com.basick.app.dto.trainer;

import java.util.List;
import java.util.Map;

import jakarta.validation.constraints.NotBlank;

public class CreateTrainerRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Business name is required")
    private String businessName;

    private String bio;
    private String profilePictureUrl;
    private List<String> certifications;
    private List<String> specializations;
    private Integer experienceYears;
    private String phoneNumber;
    private String email;
    private String website;
    private String location;
    private String timezone;
    private Boolean isAvailableOnline;
    private Boolean isAvailableInPerson;
    private Double hourlyRate;
    private Double packageRate;
    private String currency;
    private Map<String, Double> servicePricing;
    private Map<String, List<String>> availability;
    private Boolean isAcceptingNewClients;
    private Integer maxClientsPerSlot;
    private List<String> testimonials;
    private List<String> beforeAfterPhotos;
    private String instagramHandle;
    private String youtubeChannel;
    private List<String> verificationDocuments;
    private Boolean isSubscriptionBased;
    private Double monthlySubscriptionRate;

    // Constructors
    public CreateTrainerRequest() {}

    // Getters and Setters
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

    public List<String> getTestimonials() { return testimonials; }
    public void setTestimonials(List<String> testimonials) { this.testimonials = testimonials; }

    public List<String> getBeforeAfterPhotos() { return beforeAfterPhotos; }
    public void setBeforeAfterPhotos(List<String> beforeAfterPhotos) { this.beforeAfterPhotos = beforeAfterPhotos; }

    public String getInstagramHandle() { return instagramHandle; }
    public void setInstagramHandle(String instagramHandle) { this.instagramHandle = instagramHandle; }

    public String getYoutubeChannel() { return youtubeChannel; }
    public void setYoutubeChannel(String youtubeChannel) { this.youtubeChannel = youtubeChannel; }

    public List<String> getVerificationDocuments() { return verificationDocuments; }
    public void setVerificationDocuments(List<String> verificationDocuments) { this.verificationDocuments = verificationDocuments; }

    public Boolean getIsSubscriptionBased() { return isSubscriptionBased; }
    public void setIsSubscriptionBased(Boolean isSubscriptionBased) { this.isSubscriptionBased = isSubscriptionBased; }

    public Double getMonthlySubscriptionRate() { return monthlySubscriptionRate; }
    public void setMonthlySubscriptionRate(Double monthlySubscriptionRate) { this.monthlySubscriptionRate = monthlySubscriptionRate; }
}
