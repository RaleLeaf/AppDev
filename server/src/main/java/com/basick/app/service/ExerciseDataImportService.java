package com.basick.app.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.basick.app.model.Exercise;
import com.basick.app.repository.ExerciseRepository;

/**
 * Service for importing exercise data from CSV files
 */
@Service
public class ExerciseDataImportService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseDataImportService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    /**
     * Import exercise data from CSV file (randomly selects 100 exercises)
     */
    public ImportResult importExerciseDataFromCsv(String csvFilePath) {
        ImportResult result = new ImportResult();
        Set<String> existingExerciseNames = new HashSet<>();
        final int MAX_EXERCISES_TO_IMPORT = 100;

        try {
            // Get existing exercise names to prevent duplicates
            existingExerciseNames = getExistingExerciseNames();

            // First, read all valid exercises from the CSV
            List<String> allValidLines = new ArrayList<>();

            try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {
                String line;
                boolean isFirstLine = true;

                while ((line = reader.readLine()) != null) {
                    if (isFirstLine) {
                        isFirstLine = false;
                        continue; // Skip header
                    }

                    // Check if the line can be parsed into a valid exercise
                    try {
                        Exercise testExercise = parseCsvLineToExercise(line);
                        if (testExercise != null && testExercise.getName() != null) {
                            String exerciseName = testExercise.getName().toLowerCase().trim();
                            // Only add if not a duplicate
                            if (!existingExerciseNames.contains(exerciseName)) {
                                allValidLines.add(line);
                            }
                        }
                    } catch (Exception e) {
                        // Skip invalid lines
                    }
                }
            }

            // Randomly shuffle the valid lines and take up to MAX_EXERCISES_TO_IMPORT
            Collections.shuffle(allValidLines);
            int exercisesToProcess = Math.min(allValidLines.size(), MAX_EXERCISES_TO_IMPORT);

            // Process the randomly selected exercises
            for (int i = 0; i < exercisesToProcess; i++) {
                String line = allValidLines.get(i);

                try {
                    Exercise exercise = parseCsvLineToExercise(line);
                    if (exercise != null && exercise.getName() != null) {
                        String exerciseName = exercise.getName().toLowerCase().trim();

                        // Double-check for duplicates (shouldn't happen with our pre-filtering)
                        if (!existingExerciseNames.contains(exerciseName)) {
                            Exercise savedExercise = exerciseRepository.save(exercise);
                            if (savedExercise != null) {
                                existingExerciseNames.add(exerciseName);
                                result.successCount++;
                            } else {
                                result.errorCount++;
                            }
                        } else {
                            result.duplicateCount++;
                        }
                    } else {
                        result.errorCount++;
                    }
                } catch (Exception e) {
                    result.errorCount++;
                    System.err.println("Error processing line: " + line + " - " + e.getMessage());
                }
            }

        } catch (IOException e) {
            throw new RuntimeException("Error reading CSV file: " + e.getMessage(), e);
        }

        return result;
    }

    /**
     * Parse a CSV line into an Exercise object
     */
    private Exercise parseCsvLineToExercise(String csvLine) {
        try {
            String[] fields = parseCsvLine(csvLine);

            if (fields.length < 7) { // Minimum required fields
                return null;
            }

            Exercise exercise = new Exercise();

            // Basic information
            exercise.setName(capitalizeWords(cleanString(fields[4]))); // name column
            exercise.setMuscleGroup(capitalizeWords(cleanString(fields[5]))); // target column
            exercise.setGifUrl(cleanString(fields[2])); // gifUrl column
            exercise.setDescription("Imported from exercise dataset");

            // Categories based on body part
            List<String> categories = mapBodyPartToCategories(cleanString(fields[0])); // bodyPart column
            exercise.setCategories(categories);

            // Equipment required
            List<String> equipment = mapEquipmentToList(cleanString(fields[1])); // equipment column
            exercise.setEquipmentRequired(equipment);

            // Secondary muscle groups
            List<String> secondaryMuscles = parseSecondaryMuscles(fields);
            exercise.setSecondaryMuscleGroups(secondaryMuscles);

            // Instructions
            Map<String, Object> instructions = parseInstructions(fields);
            exercise.setInstructions(instructions);

            // Set defaults
            exercise.setDifficulty(determineDifficulty(exercise.getName(), exercise.getEquipmentRequired()));
            exercise.setDefaultSets(3);
            exercise.setDefaultReps(12);
            exercise.setRestTimeSeconds(60);
            exercise.setCaloriesPerRep(0.5); // Default estimate
            exercise.setCaloriesPerMinute(5.0); // Default estimate

            // Set metadata
            exercise.setIsPublic(true);
            exercise.setIsVerified(true);
            exercise.setUsageCount(0);

            // Set tags for better searchability
            List<String> tags = generateTags(exercise);
            exercise.setTags(tags);

            return exercise;

        } catch (Exception e) {
            System.err.println("Error parsing CSV line: " + csvLine + " - " + e.getMessage());
            return null;
        }
    }

    /**
     * Parse CSV line handling quoted fields and commas
     */
    private String[] parseCsvLine(String line) {
        // Simple CSV parser that handles basic cases
        return line.split(",");
    }

    /**
     * Clean string values and capitalize first letters of words
     */
    private String cleanString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        
        return value.trim().replaceAll("\"", "");
    }

    /**
     * Capitalize the first letter of each word
     */
    private String capitalizeWords(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        
        StringBuilder result = new StringBuilder();
        boolean capitalizeNext = true;
        
        for (char c : input.toCharArray()) {
            if (Character.isWhitespace(c) || c == '-' || c == '_') {
                result.append(c);
                capitalizeNext = true;
            } else if (capitalizeNext) {
                result.append(Character.toUpperCase(c));
                capitalizeNext = false;
            } else {
                result.append(Character.toLowerCase(c));
            }
        }
        
        return result.toString();
    }

    /**
     * Map body part to exercise categories
     */
    private List<String> mapBodyPartToCategories(String bodyPart) {
        List<String> categories = new ArrayList<>();
        
        if (bodyPart == null) {
            categories.add("STRENGTH");
            return categories;
        }
        
        String part = bodyPart.toLowerCase();
        categories.add("STRENGTH"); // Default category
        
        if (part.contains("cardio")) {
            categories.add("CARDIO");
        }
        if (part.contains("waist") || part.contains("core")) {
            categories.add("CORE");
        }
        if (part.contains("flexibility") || part.contains("stretch")) {
            categories.add("FLEXIBILITY");
        }
        
        return categories;
    }

    /**
     * Map equipment string to list
     */
    private List<String> mapEquipmentToList(String equipment) {
        List<String> equipmentList = new ArrayList<>();
        
        if (equipment == null || equipment.trim().isEmpty()) {
            equipmentList.add("NONE");
            return equipmentList;
        }
        
        String eq = equipment.toLowerCase();
        
        if (eq.contains("body weight") || eq.contains("bodyweight")) {
            equipmentList.add("BODY_WEIGHT");
        } else if (eq.contains("dumbbell")) {
            equipmentList.add("DUMBBELLS");
        } else if (eq.contains("barbell")) {
            equipmentList.add("BARBELL");
        } else if (eq.contains("cable")) {
            equipmentList.add("CABLE_MACHINE");
        } else if (eq.contains("machine") || eq.contains("leverage")) {
            equipmentList.add("MACHINE");
        } else if (eq.contains("medicine ball")) {
            equipmentList.add("MEDICINE_BALL");
        } else if (eq.contains("assisted")) {
            equipmentList.add("ASSISTED");
        } else {
            equipmentList.add(capitalizeWords(equipment));
        }
        
        return equipmentList;
    }

    /**
     * Parse secondary muscles from CSV fields
     */
    private List<String> parseSecondaryMuscles(String[] fields) {
        List<String> secondaryMuscles = new ArrayList<>();
        
        // Secondary muscles are in fields 6, 7, 16, 18, 20, 22
        int[] secondaryMuscleIndices = {6, 7, 16, 18, 20, 22};
        
        for (int index : secondaryMuscleIndices) {
            if (index < fields.length && fields[index] != null && !fields[index].trim().isEmpty()) {
                String muscle = capitalizeWords(cleanString(fields[index]));
                if (muscle != null && !secondaryMuscles.contains(muscle)) {
                    secondaryMuscles.add(muscle);
                }
            }
        }
        
        return secondaryMuscles;
    }

    /**
     * Parse instructions from CSV fields
     */
    private Map<String, Object> parseInstructions(String[] fields) {
        Map<String, Object> instructions = new HashMap<>();
        List<String> steps = new ArrayList<>();
        
        // Instructions are in fields 8-15, 17, 19, 21, 23
        int[] instructionIndices = {8, 9, 10, 11, 12, 13, 14, 15, 17, 19, 21, 23};
        
        for (int index : instructionIndices) {
            if (index < fields.length && fields[index] != null && !fields[index].trim().isEmpty()) {
                String step = cleanString(fields[index]);
                if (step != null && !step.trim().isEmpty()) {
                    steps.add(step);
                }
            }
        }
        
        instructions.put("steps", steps);
        instructions.put("type", "step-by-step");
        
        return instructions;
    }

    /**
     * Determine difficulty based on exercise name and equipment
     */
    private String determineDifficulty(String exerciseName, List<String> equipment) {
        if (exerciseName == null) return "BEGINNER";
        
        String name = exerciseName.toLowerCase();
        
        // Advanced exercises
        if (name.contains("archer") || name.contains("assisted") || name.contains("hanging") || 
            name.contains("lever") || name.contains("muscle up")) {
            return "ADVANCED";
        }
        
        // Intermediate exercises
        if (name.contains("pull-up") || name.contains("chin-up") || name.contains("dip") ||
            equipment.contains("CABLE_MACHINE") || equipment.contains("MACHINE")) {
            return "INTERMEDIATE";
        }
        
        // Default to beginner
        return "BEGINNER";
    }

    /**
     * Generate tags for better searchability
     */
    private List<String> generateTags(Exercise exercise) {
        Set<String> tagSet = new HashSet<>();
        
        // Add muscle group tags
        if (exercise.getMuscleGroup() != null) {
            tagSet.add(exercise.getMuscleGroup().toLowerCase());
        }
        
        // Add secondary muscle tags
        if (exercise.getSecondaryMuscleGroups() != null) {
            for (String muscle : exercise.getSecondaryMuscleGroups()) {
                tagSet.add(muscle.toLowerCase());
            }
        }
        
        // Add equipment tags
        if (exercise.getEquipmentRequired() != null) {
            for (String eq : exercise.getEquipmentRequired()) {
                tagSet.add(eq.toLowerCase().replace("_", " "));
            }
        }
        
        // Add category tags
        if (exercise.getCategories() != null) {
            for (String category : exercise.getCategories()) {
                tagSet.add(category.toLowerCase());
            }
        }
        
        return new ArrayList<>(tagSet);
    }

    /**
     * Get existing exercise names to prevent duplicates
     */
    private Set<String> getExistingExerciseNames() {
        try {
            return exerciseRepository.getAllExerciseNames();
        } catch (Exception e) {
            System.err.println("Error getting existing exercise names: " + e.getMessage());
            return new HashSet<>();
        }
    }

    /**
     * Import result class
     */
    public static class ImportResult {
        public int successCount = 0;
        public int errorCount = 0;
        public int duplicateCount = 0;

        public String getSummary() {
            return String.format("Import completed: %d successful, %d errors, %d duplicates",
                                successCount, errorCount, duplicateCount);
        }
    }
}
