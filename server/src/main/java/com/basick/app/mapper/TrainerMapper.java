package com.basick.app.mapper;

import com.basick.app.dto.trainer.TrainerDTO;
import com.basick.app.dto.trainer.CreateTrainerRequest;
import com.basick.app.dto.trainer.UpdateTrainerRequest;
import com.basick.app.model.Trainer;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Component
public class TrainerMapper {
    
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public TrainerDTO toDTO(Trainer trainer) {
        if (trainer == null) {
            return null;
        }
        
        TrainerDTO dto = new TrainerDTO();
        dto.setId(trainer.getId());
        dto.setUserId(trainer.getUserId());
        dto.setBusinessName(trainer.getBusinessName());
        dto.setBio(trainer.getBio());
        dto.setProfilePictureUrl(trainer.getProfilePictureUrl());
        dto.setCertifications(trainer.getCertifications());
        dto.setSpecializations(trainer.getSpecializations());
        dto.setExperienceYears(trainer.getExperienceYears());
        dto.setPhoneNumber(trainer.getPhoneNumber());
        dto.setEmail(trainer.getEmail());
        dto.setWebsite(trainer.getWebsite());
        dto.setLocation(trainer.getLocation());
        dto.setTimezone(trainer.getTimezone());
        dto.setIsAvailableOnline(trainer.getIsAvailableOnline());
        dto.setIsAvailableInPerson(trainer.getIsAvailableInPerson());
        dto.setHourlyRate(trainer.getHourlyRate());
        dto.setPackageRate(trainer.getPackageRate());
        dto.setCurrency(trainer.getCurrency());
        dto.setServicePricing(trainer.getServicePricing());
        dto.setAvailability(trainer.getAvailability());
        dto.setIsAcceptingNewClients(trainer.getIsAcceptingNewClients());
        dto.setMaxClientsPerSlot(trainer.getMaxClientsPerSlot());
        dto.setAverageRating(trainer.getAverageRating());
        dto.setTotalReviews(trainer.getTotalReviews());
        dto.setTotalClients(trainer.getTotalClients());
        dto.setTotalSessions(trainer.getTotalSessions());
        dto.setTestimonials(trainer.getTestimonials());
        dto.setBeforeAfterPhotos(trainer.getBeforeAfterPhotos());
        dto.setInstagramHandle(trainer.getInstagramHandle());
        dto.setYoutubeChannel(trainer.getYoutubeChannel());
        dto.setIsVerified(trainer.getIsVerified());
        dto.setIsBackgroundChecked(trainer.getIsBackgroundChecked());
        dto.setVerificationStatus(trainer.getVerificationStatus());
        dto.setVerificationDocuments(trainer.getVerificationDocuments());
        dto.setCreatedWorkouts(trainer.getCreatedWorkouts());
        dto.setCreatedPrograms(trainer.getCreatedPrograms());
        dto.setContentViews(trainer.getContentViews());
        dto.setContentLikes(trainer.getContentLikes());
        dto.setIsSubscriptionBased(trainer.getIsSubscriptionBased());
        dto.setMonthlySubscriptionRate(trainer.getMonthlySubscriptionRate());
        dto.setStripeAccountId(trainer.getStripeAccountId());
        dto.setIsPayoutEnabled(trainer.getIsPayoutEnabled());
        dto.setCreatedAt(timestampToString(trainer.getCreatedAt()));
        dto.setUpdatedAt(timestampToString(trainer.getUpdatedAt()));
        dto.setLastActiveAt(timestampToString(trainer.getLastActiveAt()));
        
        return dto;
    }
    
    public Trainer toEntity(CreateTrainerRequest request) {
        if (request == null) {
            return null;
        }
        
        Trainer trainer = new Trainer();
        trainer.setUserId(request.getUserId());
        trainer.setBusinessName(request.getBusinessName());
        trainer.setBio(request.getBio());
        trainer.setProfilePictureUrl(request.getProfilePictureUrl());
        trainer.setCertifications(request.getCertifications());
        trainer.setSpecializations(request.getSpecializations());
        trainer.setExperienceYears(request.getExperienceYears());
        trainer.setPhoneNumber(request.getPhoneNumber());
        trainer.setEmail(request.getEmail());
        trainer.setWebsite(request.getWebsite());
        trainer.setLocation(request.getLocation());
        trainer.setTimezone(request.getTimezone());
        trainer.setIsAvailableOnline(request.getIsAvailableOnline());
        trainer.setIsAvailableInPerson(request.getIsAvailableInPerson());
        trainer.setHourlyRate(request.getHourlyRate());
        trainer.setPackageRate(request.getPackageRate());
        trainer.setCurrency(request.getCurrency());
        trainer.setServicePricing(request.getServicePricing());
        trainer.setAvailability(request.getAvailability());
        trainer.setIsAcceptingNewClients(request.getIsAcceptingNewClients());
        trainer.setMaxClientsPerSlot(request.getMaxClientsPerSlot());
        trainer.setTestimonials(request.getTestimonials());
        trainer.setBeforeAfterPhotos(request.getBeforeAfterPhotos());
        trainer.setInstagramHandle(request.getInstagramHandle());
        trainer.setYoutubeChannel(request.getYoutubeChannel());
        trainer.setIsSubscriptionBased(request.getIsSubscriptionBased());
        trainer.setMonthlySubscriptionRate(request.getMonthlySubscriptionRate());
        
        return trainer;
    }
    
    public void updateEntityFromRequest(Trainer trainer, UpdateTrainerRequest request) {
        if (trainer == null || request == null) {
            return;
        }
        
        if (request.getBusinessName() != null) {
            trainer.setBusinessName(request.getBusinessName());
        }
        if (request.getBio() != null) {
            trainer.setBio(request.getBio());
        }
        if (request.getProfilePictureUrl() != null) {
            trainer.setProfilePictureUrl(request.getProfilePictureUrl());
        }
        if (request.getCertifications() != null) {
            trainer.setCertifications(request.getCertifications());
        }
        if (request.getSpecializations() != null) {
            trainer.setSpecializations(request.getSpecializations());
        }
        if (request.getExperienceYears() != null) {
            trainer.setExperienceYears(request.getExperienceYears());
        }
        if (request.getPhoneNumber() != null) {
            trainer.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getEmail() != null) {
            trainer.setEmail(request.getEmail());
        }
        if (request.getWebsite() != null) {
            trainer.setWebsite(request.getWebsite());
        }
        if (request.getLocation() != null) {
            trainer.setLocation(request.getLocation());
        }
        if (request.getTimezone() != null) {
            trainer.setTimezone(request.getTimezone());
        }
        if (request.getIsAvailableOnline() != null) {
            trainer.setIsAvailableOnline(request.getIsAvailableOnline());
        }
        if (request.getIsAvailableInPerson() != null) {
            trainer.setIsAvailableInPerson(request.getIsAvailableInPerson());
        }
        if (request.getHourlyRate() != null) {
            trainer.setHourlyRate(request.getHourlyRate());
        }
        if (request.getPackageRate() != null) {
            trainer.setPackageRate(request.getPackageRate());
        }
        if (request.getCurrency() != null) {
            trainer.setCurrency(request.getCurrency());
        }
        if (request.getServicePricing() != null) {
            trainer.setServicePricing(request.getServicePricing());
        }
        if (request.getAvailability() != null) {
            trainer.setAvailability(request.getAvailability());
        }
        if (request.getIsAcceptingNewClients() != null) {
            trainer.setIsAcceptingNewClients(request.getIsAcceptingNewClients());
        }
        if (request.getMaxClientsPerSlot() != null) {
            trainer.setMaxClientsPerSlot(request.getMaxClientsPerSlot());
        }
        if (request.getTestimonials() != null) {
            trainer.setTestimonials(request.getTestimonials());
        }
        if (request.getBeforeAfterPhotos() != null) {
            trainer.setBeforeAfterPhotos(request.getBeforeAfterPhotos());
        }
        if (request.getInstagramHandle() != null) {
            trainer.setInstagramHandle(request.getInstagramHandle());
        }
        if (request.getYoutubeChannel() != null) {
            trainer.setYoutubeChannel(request.getYoutubeChannel());
        }
        if (request.getIsSubscriptionBased() != null) {
            trainer.setIsSubscriptionBased(request.getIsSubscriptionBased());
        }
        if (request.getMonthlySubscriptionRate() != null) {
            trainer.setMonthlySubscriptionRate(request.getMonthlySubscriptionRate());
        }
        
        trainer.updateTimestamp();
    }
    
    private String timestampToString(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        Instant instant = Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos());
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime.format(FORMATTER);
    }
}
