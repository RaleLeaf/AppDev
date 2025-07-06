package com.basick.app.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import com.basick.app.dto.exercise.CreateExerciseRequest;
import com.basick.app.dto.exercise.ExerciseDTO;
import com.basick.app.dto.exercise.UpdateExerciseRequest;
import com.basick.app.model.Exercise;
import com.google.cloud.Timestamp;

@ActiveProfiles("test")
class ExerciseMapperTest {

    private ExerciseMapper exerciseMapper;

    @BeforeEach
    void setUp() {
        exerciseMapper = new ExerciseMapper();
    }

    @Test
    void testToDTO_WithValidExercise_ShouldMapCorrectly() {
        // Given
        Exercise exercise = new Exercise();
        exercise.setId("1");
        exercise.setName("Push-up");
        exercise.setDescription("Basic push-up exercise");
        exercise.setCategories(Arrays.asList("strength", "bodyweight"));
        exercise.setDifficulty("beginner");
        exercise.setMuscleGroup("chest");
        exercise.setSecondaryMuscleGroups(Arrays.asList("triceps", "shoulders"));
        exercise.setEquipmentRequired(Arrays.asList("none"));
        
        Map<String, Object> instructions = new HashMap<>();
        instructions.put("step1", "Get into plank position");
        instructions.put("step2", "Lower body");
        instructions.put("step3", "Push up");
        exercise.setInstructions(instructions);
        
        exercise.setDefaultSets(3);
        exercise.setDefaultReps(15);
        exercise.setIsPublic(true);
        exercise.setIsVerified(true);
        exercise.setCreatedBy("user123");
        exercise.setCreatedAt(Timestamp.now());
        exercise.setUpdatedAt(Timestamp.now());

        // When
        ExerciseDTO dto = exerciseMapper.toDTO(exercise);

        // Then
        assertNotNull(dto);
        assertEquals("1", dto.getId());
        assertEquals("Push-up", dto.getName());
        assertEquals("Basic push-up exercise", dto.getDescription());
        assertEquals(Arrays.asList("strength", "bodyweight"), dto.getCategories());
        assertEquals("beginner", dto.getDifficulty());
        assertEquals("chest", dto.getMuscleGroup());
        assertEquals(Arrays.asList("triceps", "shoulders"), dto.getSecondaryMuscleGroups());
        assertEquals(Arrays.asList("none"), dto.getEquipmentRequired());
        assertEquals(instructions, dto.getInstructions());
        assertEquals(3, dto.getDefaultSets());
        assertEquals(15, dto.getDefaultReps());
        assertTrue(dto.getIsPublic());
        assertTrue(dto.getIsVerified());
        assertEquals("user123", dto.getCreatedBy());
        assertNotNull(dto.getCreatedAt());
        assertNotNull(dto.getUpdatedAt());
    }

    @Test
    void testToDTO_WithNullExercise_ShouldReturnNull() {
        // When
        ExerciseDTO dto = exerciseMapper.toDTO(null);

        // Then
        assertNull(dto);
    }

    @Test
    void testFromCreateRequest_WithValidRequest_ShouldMapCorrectly() {
        // Given
        CreateExerciseRequest request = new CreateExerciseRequest();
        request.setName("Squat");
        request.setDescription("Basic squat exercise");
        request.setCategories(Arrays.asList("strength", "compound"));
        request.setDifficulty("intermediate");
        request.setMuscleGroup("quadriceps");
        request.setSecondaryMuscleGroups(Arrays.asList("glutes", "hamstrings"));
        request.setEquipmentRequired(Arrays.asList("none"));
        
        Map<String, Object> instructions = new HashMap<>();
        instructions.put("step1", "Stand with feet apart");
        instructions.put("step2", "Lower down");
        instructions.put("step3", "Stand up");
        request.setInstructions(instructions);
        
        request.setDefaultSets(4);
        request.setDefaultReps(12);
        request.setIsPublic(true);
        request.setCreatedBy("user456");

        // When
        Exercise exercise = exerciseMapper.fromCreateRequest(request);

        // Then
        assertNotNull(exercise);
        assertNull(exercise.getId()); // ID should be null initially
        assertEquals("Squat", exercise.getName());
        assertEquals("Basic squat exercise", exercise.getDescription());
        assertEquals(Arrays.asList("strength", "compound"), exercise.getCategories());
        assertEquals("intermediate", exercise.getDifficulty());
        assertEquals("quadriceps", exercise.getMuscleGroup());
        assertEquals(Arrays.asList("glutes", "hamstrings"), exercise.getSecondaryMuscleGroups());
        assertEquals(Arrays.asList("none"), exercise.getEquipmentRequired());
        assertEquals(instructions, exercise.getInstructions());
        assertEquals(4, exercise.getDefaultSets());
        assertEquals(12, exercise.getDefaultReps());
        assertTrue(exercise.getIsPublic());
        assertEquals("user456", exercise.getCreatedBy());
        assertNotNull(exercise.getCreatedAt());
        assertNotNull(exercise.getUpdatedAt());
        assertEquals(0, exercise.getUsageCount());
        assertEquals(0.0, exercise.getAverageRating(), 0.001);
        assertEquals(0, exercise.getTotalRatings());
    }

    @Test
    void testUpdateFromRequest_WithValidRequest_ShouldUpdateExercise() throws InterruptedException {
        // Given
        Exercise exercise = new Exercise();
        exercise.setId("1");
        exercise.setName("Old Name");
        exercise.setDescription("Old description");
        exercise.setDifficulty("beginner");
        exercise.setDefaultSets(2);
        exercise.setDefaultReps(10);
        exercise.setIsPublic(false);
        Timestamp originalCreatedAt = Timestamp.now();
        exercise.setCreatedAt(originalCreatedAt);
        exercise.setUpdatedAt(originalCreatedAt);

        // Add delay to ensure timestamp difference
        Thread.sleep(10);

        UpdateExerciseRequest request = new UpdateExerciseRequest();
        request.setName("New Name");
        request.setDescription("New description");
        request.setDifficulty("advanced");
        request.setDefaultSets(5);
        request.setDefaultReps(20);
        request.setIsPublic(true);

        // When
        exerciseMapper.updateFromRequest(request, exercise);

        // Then
        assertEquals("1", exercise.getId()); // ID should remain unchanged
        assertEquals("New Name", exercise.getName());
        assertEquals("New description", exercise.getDescription());
        assertEquals("advanced", exercise.getDifficulty());
        assertEquals(5, exercise.getDefaultSets());
        assertEquals(20, exercise.getDefaultReps());
        assertTrue(exercise.getIsPublic());
        assertEquals(originalCreatedAt, exercise.getCreatedAt()); // Created at should not change
        assertTrue(exercise.getUpdatedAt().compareTo(originalCreatedAt) > 0); // Updated at should be newer
    }

    @Test
    void testToDTOList_WithValidExercises_ShouldMapAll() {
        // Given
        Exercise exercise1 = new Exercise();
        exercise1.setId("1");
        exercise1.setName("Push-up");
        exercise1.setIsPublic(true);

        Exercise exercise2 = new Exercise();
        exercise2.setId("2");
        exercise2.setName("Squat");
        exercise2.setIsPublic(true);

        List<Exercise> exercises = Arrays.asList(exercise1, exercise2);

        // When
        List<ExerciseDTO> dtos = exerciseMapper.toDTOList(exercises);

        // Then
        assertNotNull(dtos);
        assertEquals(2, dtos.size());
        assertEquals("1", dtos.get(0).getId());
        assertEquals("Push-up", dtos.get(0).getName());
        assertEquals("2", dtos.get(1).getId());
        assertEquals("Squat", dtos.get(1).getName());
    }

    @Test
    void testToDTOList_WithNullList_ShouldReturnNull() {
        // When
        List<ExerciseDTO> dtos = exerciseMapper.toDTOList(null);

        // Then
        assertNull(dtos);
    }
}
