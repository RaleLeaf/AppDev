package com.basick.app.model;

import com.google.cloud.Date;
import com.google.cloud.firestore.DocumentReference;

public class UserProfileModel {
    private String id;
    private DocumentReference user_id;
    private String gender; // (MALE, FEMALE)
    private Date date_of_birth;
    private Double weightKG;
    private Double heightCM;
    private String difficultyLevel; // (BEGINNER, INTERMEDIATE, EXPERT)

    public UserProfileModel(){
    }

    public UserProfileModel(String id, DocumentReference user_id, String gender, Date date_of_birth, Double weightKG, Double heightCM, String difficultyLevel){
        this.id = id;
        this.user_id = user_id;
        this.gender = gender;
        this.date_of_birth = date_of_birth;
        this.weightKG = weightKG;
        this.heightCM = heightCM;
        this.difficultyLevel = difficultyLevel;
    }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setUserId(DocumentReference user_id) { this.user_id = user_id; }
    public void setGender(String gender) { this.gender = gender; }
    public void setDateOfBirth(Date date_of_birth) { this.date_of_birth = date_of_birth; }
    public void setWeightKG(Double weightKG) { this.weightKG = weightKG; }
    public void setHeightCM(Double heightCM) { this.heightCM = heightCM; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    // Getters
    public String getId() { return this.id; }
    public DocumentReference getUserId() { return this.user_id; }
    public String getGender() { return this.gender; }
    public Date getDateOfBirth() { return this.date_of_birth; }
    public Double getWeightKG() { return this.weightKG; }
    public Double getHeightCM() { return this.heightCM; }
    public String difficultyLevel() { return this.difficultyLevel; }
}
