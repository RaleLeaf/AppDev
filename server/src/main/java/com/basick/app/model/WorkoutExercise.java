package com.basick.app.model;

import com.google.cloud.firestore.DocumentReference;

public class WorkoutExercise {
    private DocumentReference exerciseRef; // Reference to the Exercise document
    private String exerciseId; // Exercise ID for easier access
    private String exerciseName; // Cached name for display
    
    // Workout-specific parameters (can override exercise defaults)
    private Integer sets;
    private Integer reps;
    private Integer duration; // in seconds for time-based exercises
    private Double weight; // weight used in kg
    private Integer restTimeSeconds; // rest time after this exercise
    
    // Exercise order and grouping
    private Integer orderIndex; // Order within the workout
    private String superset; // Superset group identifier (optional)
    private String notes; // Custom notes for this exercise in the workout
    
    public WorkoutExercise() {
    }

    public WorkoutExercise(DocumentReference exerciseRef, String exerciseId, String exerciseName) {
        this.exerciseRef = exerciseRef;
        this.exerciseId = exerciseId;
        this.exerciseName = exerciseName;
    }

    // Getters and Setters
    public DocumentReference getExerciseRef() { return exerciseRef; }
    public void setExerciseRef(DocumentReference exerciseRef) { this.exerciseRef = exerciseRef; }
    public String getExerciseId() { return exerciseId; }
    public void setExerciseId(String exerciseId) { this.exerciseId = exerciseId; }
    public String getExerciseName() { return exerciseName; }
    public void setExerciseName(String exerciseName) { this.exerciseName = exerciseName; }
    
    public Integer getSets() { return sets; }
    public void setSets(Integer sets) { this.sets = sets; }
    public Integer getReps() { return reps; }
    public void setReps(Integer reps) { this.reps = reps; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    public Integer getRestTimeSeconds() { return restTimeSeconds; }
    public void setRestTimeSeconds(Integer restTimeSeconds) { this.restTimeSeconds = restTimeSeconds; }
    
    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
    public String getSuperset() { return superset; }
    public void setSuperset(String superset) { this.superset = superset; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
