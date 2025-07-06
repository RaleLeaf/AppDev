package com.basick.app.dto.workout;

/**
 * DTO for WorkoutExercise
 */
public class WorkoutExerciseDTO {
    private String exerciseId;
    private String exerciseName;
    
    // Workout-specific parameters
    private Integer sets;
    private Integer reps;
    private Integer duration;
    private Double weight;
    private Integer restTimeSeconds;
    
    // Exercise order and grouping
    private Integer orderIndex;
    private String superset;
    private String notes;

    // Constructors
    public WorkoutExerciseDTO() {}

    // Getters and Setters
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
