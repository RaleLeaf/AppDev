package com.basick.app.model;

import com.google.cloud.Timestamp;

public class UserModel {
    private String id;
    private String name;
    private String email;
    private String password;
    private Timestamp createdAt;

    // To be tested
    private String authType; // ("EMAIL", "GOOGLE", "APPLE")
    private String role; // ("USER", "TRAINER", "ADMIN")

    public UserModel() {
    }

    public UserModel(String id, String name, String email, String password, Timestamp createdAt, String authType, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.authType = authType;
        this.role = role;
    }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public void setAuthType(String authType) { this.authType = authType; }
    public void setRole(String role) { this.role = role; }
    
    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public Timestamp getCreatedAt() { return createdAt; }
    public String getAuthType() { return authType; }
}
