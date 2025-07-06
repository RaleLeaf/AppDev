package com.basick.app.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import com.basick.app.dto.workout.CreateWorkoutRequest;
import com.basick.app.dto.workout.UpdateWorkoutRequest;
import com.basick.app.dto.workout.WorkoutDTO;
import com.basick.app.dto.workout.WorkoutExerciseDTO;
import com.basick.app.model.Workout;
import com.basick.app.model.WorkoutExercise;
import com.google.cloud.Timestamp;

@ActiveProfiles("test")
class WorkoutMapperTest {

    private WorkoutMapper workoutMapper;

    @BeforeEach
    void setUp() {
        workoutMapper = new WorkoutMapper();
    }

    @Test
    void testToDTO_WithValidWorkout_ShouldMapCorrectly() {
        // Given
        Workout workout = new Workout();
        workout.setId("1");
        workout.setName("Push Day Workout");
        workout.setDescription("Upper body push workout");
        workout.setDifficulty("intermediate");
        workout.setCategories(Arrays.asList("strength"));
        workout.setEstimatedDuration(45);
        workout.setIsCustom(false);
        workout.setIsPublic(true);
        workout.setCreatedBy("user123");
        workout.setCreatedAt(Timestamp.now());
        workout.setUpdatedAt(Timestamp.now());

        WorkoutExercise exercise1 = new WorkoutExercise();
        exercise1.setExerciseId("ex1");
        exercise1.setSets(3);
        exercise1.setReps(10);
        exercise1.setOrderIndex(0);

        WorkoutExercise exercise2 = new WorkoutExercise();
        exercise2.setExerciseId("ex2");
        exercise2.setSets(4);
        exercise2.setReps(12);
        exercise2.setOrderIndex(1);

        workout.setExercises(Arrays.asList(exercise1, exercise2));

        // When
        WorkoutDTO dto = workoutMapper.toDTO(workout);

        // Then
        assertNotNull(dto);
        assertEquals("1", dto.getId());
        assertEquals("Push Day Workout", dto.getName());
        assertEquals("Upper body push workout", dto.getDescription());
        assertEquals("intermediate", dto.getDifficulty());
        assertEquals(Arrays.asList("strength"), dto.getCategories());
        assertEquals(45, dto.getEstimatedDuration());
        assertFalse(dto.getIsCustom());
        assertTrue(dto.getIsPublic());
        assertEquals("user123", dto.getCreatedBy());
        assertNotNull(dto.getCreatedAt());
        assertNotNull(dto.getUpdatedAt());
        
        assertNotNull(dto.getExercises());
        assertEquals(2, dto.getExercises().size());
        assertEquals("ex1", dto.getExercises().get(0).getExerciseId());
        assertEquals(3, dto.getExercises().get(0).getSets());
        assertEquals(10, dto.getExercises().get(0).getReps());
        assertEquals(0, dto.getExercises().get(0).getOrderIndex());
    }

    @Test
    void testToDTO_WithNullWorkout_ShouldReturnNull() {
        // When
        WorkoutDTO dto = workoutMapper.toDTO(null);

        // Then
        assertNull(dto);
    }

    @Test
    void testFromCreateRequest_WithValidRequest_ShouldMapCorrectly() {
        // Given
        CreateWorkoutRequest request = new CreateWorkoutRequest();
        request.setName("Leg Day Workout");
        request.setDescription("Lower body workout");
        request.setDifficulty("advanced");
        request.setCategories(Arrays.asList("strength"));
        request.setEstimatedDuration(60);
        request.setIsCustom(true);
        request.setIsPublic(false);
        request.setCreatedBy("user456");

        // When
        Workout workout = workoutMapper.fromCreateRequest(request);

        // Then
        assertNotNull(workout);
        assertNull(workout.getId()); // ID should be null initially
        assertEquals("Leg Day Workout", workout.getName());
        assertEquals("Lower body workout", workout.getDescription());
        assertEquals("advanced", workout.getDifficulty());
        assertEquals(Arrays.asList("strength"), workout.getCategories());
        assertEquals(60, workout.getEstimatedDuration());
        assertTrue(workout.getIsCustom());
        assertFalse(workout.getIsPublic());
        assertEquals("user456", workout.getCreatedBy());
        assertNotNull(workout.getCreatedAt());
        assertNotNull(workout.getUpdatedAt());
        assertEquals(0, workout.getCompletionCount());
        assertEquals(0.0, workout.getAverageRating(), 0.001);
        assertEquals(0, workout.getReviewCount());
        assertNotNull(workout.getExercises());
        assertTrue(workout.getExercises().isEmpty());
    }

    @Test
    void testUpdateFromRequest_WithValidRequest_ShouldUpdateWorkout() throws InterruptedException {
        // Given
        Workout workout = new Workout();
        workout.setId("1");
        workout.setName("Old Name");
        workout.setDescription("Old description");
        workout.setDifficulty("beginner");
        workout.setCategories(Arrays.asList("cardio"));
        workout.setEstimatedDuration(30);
        workout.setIsPublic(false);
        Timestamp originalCreatedAt = Timestamp.now();
        workout.setCreatedAt(originalCreatedAt);
        workout.setUpdatedAt(originalCreatedAt);

        // Add delay to ensure timestamp difference
        Thread.sleep(10);

        UpdateWorkoutRequest request = new UpdateWorkoutRequest();
        request.setName("New Name");
        request.setDescription("New description");
        request.setDifficulty("advanced");
        request.setCategories(Arrays.asList("strength"));
        request.setEstimatedDuration(90);
        request.setIsPublic(true);

        // When
        workoutMapper.updateFromRequest(request, workout);

        // Then
        assertEquals("1", workout.getId()); // ID should remain unchanged
        assertEquals("New Name", workout.getName());
        assertEquals("New description", workout.getDescription());
        assertEquals("advanced", workout.getDifficulty());
        assertEquals(Arrays.asList("strength"), workout.getCategories());
        assertEquals(90, workout.getEstimatedDuration());
        assertTrue(workout.getIsPublic());
        assertEquals(originalCreatedAt, workout.getCreatedAt()); // Created at should not change
        assertTrue(workout.getUpdatedAt().compareTo(originalCreatedAt) > 0); // Updated at should be newer
    }

    @Test
    void testWorkoutExerciseToDTO_WithValidWorkoutExercise_ShouldMapCorrectly() {
        // Given
        WorkoutExercise workoutExercise = new WorkoutExercise();
        workoutExercise.setExerciseId("ex123");
        workoutExercise.setSets(3);
        workoutExercise.setReps(15);
        workoutExercise.setWeight(50.5);
        workoutExercise.setDuration(30);
        workoutExercise.setRestTimeSeconds(60);
        workoutExercise.setOrderIndex(2);

        // When
        WorkoutExerciseDTO dto = workoutMapper.workoutExerciseToDTO(workoutExercise);

        // Then
        assertNotNull(dto);
        assertEquals("ex123", dto.getExerciseId());
        assertEquals(3, dto.getSets());
        assertEquals(15, dto.getReps());
        assertEquals(50.5, dto.getWeight(), 0.001);
        assertEquals(30, dto.getDuration());
        assertEquals(60, dto.getRestTimeSeconds());
        assertEquals(2, dto.getOrderIndex());
    }

    @Test
    void testWorkoutExerciseToDTO_WithNullWorkoutExercise_ShouldReturnNull() {
        // When
        WorkoutExerciseDTO dto = workoutMapper.workoutExerciseToDTO(null);

        // Then
        assertNull(dto);
    }

    @Test
    void testToDTOList_WithValidWorkouts_ShouldMapAll() {
        // Given
        Workout workout1 = new Workout();
        workout1.setId("1");
        workout1.setName("Workout 1");
        workout1.setIsPublic(true);

        Workout workout2 = new Workout();
        workout2.setId("2");
        workout2.setName("Workout 2");
        workout2.setIsPublic(true);

        List<Workout> workouts = Arrays.asList(workout1, workout2);

        // When
        List<WorkoutDTO> dtos = workoutMapper.toDTOList(workouts);

        // Then
        assertNotNull(dtos);
        assertEquals(2, dtos.size());
        assertEquals("1", dtos.get(0).getId());
        assertEquals("Workout 1", dtos.get(0).getName());
        assertEquals("2", dtos.get(1).getId());
        assertEquals("Workout 2", dtos.get(1).getName());
    }

    @Test
    void testToDTOList_WithNullList_ShouldReturnNull() {
        // When
        List<WorkoutDTO> dtos = workoutMapper.toDTOList(null);

        // Then
        assertNull(dtos);
    }
}
