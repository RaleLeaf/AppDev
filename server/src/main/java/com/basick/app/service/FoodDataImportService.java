package com.basick.app.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.basick.app.model.Food;
import com.basick.app.repository.FoodRepository;

/**
 * Service for importing food data from CSV files
 */
@Service
public class FoodDataImportService {

    private final FoodRepository foodRepository;

    public FoodDataImportService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }    /**
     * Import food data from CSV file (limited to 50 foods)
     */
    public ImportResult importFoodDataFromCsv(String csvFilePath) {
        ImportResult result = new ImportResult();
        Set<String> existingFoodNames = new HashSet<>();
        final int MAX_FOODS_TO_IMPORT = 50;

        try {
            // Get existing food names to prevent duplicates
            existingFoodNames = getExistingFoodNames();

            try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {
                String line;
                boolean isFirstLine = true;

                while ((line = reader.readLine()) != null && result.successCount < MAX_FOODS_TO_IMPORT) {
                    if (isFirstLine) {
                        isFirstLine = false;
                        continue; // Skip header
                    }

                    try {
                        Food food = parseCsvLineToFood(line);
                        if (food != null && food.getName() != null) {
                            String foodName = food.getName().toLowerCase().trim();

                            // Check for duplicates
                            if (!existingFoodNames.contains(foodName)) {
                                Food savedFood = foodRepository.save(food);
                                if (savedFood != null) {
                                    existingFoodNames.add(foodName);
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
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading CSV file: " + e.getMessage(), e);
        }

        return result;
    }    /**
     * Parse a CSV line into a Food object
     */
    private Food parseCsvLineToFood(String csvLine) {
        try {
            String[] fields = parseCsvLine(csvLine);

            if (fields.length < 34) { // Minimum required fields based on CSV structure
                return null;
            }

            Food food = new Food();

            // Basic information - only map what exists in Food model
            food.setName(cleanString(fields[2])); // food column (index 2)
            food.setCategory(categorizeFood(food.getName()));
            food.setDescription("Imported from nutritional dataset");

            // Nutritional information per 100g - map only the core macros in Food model
            food.setCaloriesPer100g(parseDouble(fields[3])); // Caloric Value
            food.setProteinPer100g(parseDouble(fields[9])); // Protein
            food.setCarbsPer100g(parseDouble(fields[7])); // Carbohydrates
            food.setFatsPer100g(parseDouble(fields[4])); // Fat
            food.setFiberPer100g(parseDouble(fields[10])); // Dietary Fiber
            food.setSugarPer100g(parseDouble(fields[8])); // Sugars
            food.setSodiumPer100g(convertSodiumToMg(parseDouble(fields[12]))); // Sodium (convert from g to mg)

            // Vitamins and minerals - only include if they have meaningful values
            Map<String, Double> vitamins = new HashMap<>();
            Map<String, Double> minerals = new HashMap<>();

            // Vitamins - using standard names
            addIfNotNull(vitamins, "Vitamin_A", parseDouble(fields[14])); // Vitamin A
            addIfNotNull(vitamins, "Vitamin_B1", parseDouble(fields[15])); // Vitamin B1
            addIfNotNull(vitamins, "Vitamin_B11", parseDouble(fields[16])); // Vitamin B11
            addIfNotNull(vitamins, "Vitamin_B12", parseDouble(fields[17])); // Vitamin B12
            addIfNotNull(vitamins, "Vitamin_B2", parseDouble(fields[18])); // Vitamin B2
            addIfNotNull(vitamins, "Vitamin_B3", parseDouble(fields[19])); // Vitamin B3
            addIfNotNull(vitamins, "Vitamin_B5", parseDouble(fields[20])); // Vitamin B5
            addIfNotNull(vitamins, "Vitamin_B6", parseDouble(fields[21])); // Vitamin B6
            addIfNotNull(vitamins, "Vitamin_C", parseDouble(fields[22])); // Vitamin C
            addIfNotNull(vitamins, "Vitamin_D", parseDouble(fields[23])); // Vitamin D
            addIfNotNull(vitamins, "Vitamin_E", parseDouble(fields[24])); // Vitamin E
            addIfNotNull(vitamins, "Vitamin_K", parseDouble(fields[25])); // Vitamin K

            // Minerals
            addIfNotNull(minerals, "Calcium", parseDouble(fields[26])); // Calcium
            addIfNotNull(minerals, "Copper", parseDouble(fields[27])); // Copper
            addIfNotNull(minerals, "Iron", parseDouble(fields[28])); // Iron
            addIfNotNull(minerals, "Magnesium", parseDouble(fields[29])); // Magnesium
            addIfNotNull(minerals, "Manganese", parseDouble(fields[30])); // Manganese
            addIfNotNull(minerals, "Phosphorus", parseDouble(fields[31])); // Phosphorus
            addIfNotNull(minerals, "Potassium", parseDouble(fields[32])); // Potassium
            addIfNotNull(minerals, "Selenium", parseDouble(fields[33])); // Selenium
            addIfNotNull(minerals, "Zinc", parseDouble(fields[34])); // Zinc

            // Only set vitamins/minerals if they contain data
            if (!vitamins.isEmpty()) {
                food.setVitaminsPer100g(vitamins);
            }
            if (!minerals.isEmpty()) {
                food.setMineralsPer100g(minerals);
            }

            // Set verified status since this is from a dataset
            food.setIsVerified(true);
            food.setIsUserSubmitted(false);
            food.setUsageCount(0);

            // Set dietary flags based on food name
            setDietaryFlags(food);

            return food;

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
     * Parse double value from string, handling null/empty cases
     */
    private Double parseDouble(String value) {
        if (value == null || value.trim().isEmpty() || "0.0".equals(value.trim())) {
            return null;
        }
        try {
            return Double.parseDouble(value.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    /**
     * Clean string values and capitalize first letters of words
     */
    private String cleanString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        
        String cleaned = value.trim().replaceAll("\"", "");
        
        // Capitalize first letter of each word
        return capitalizeWords(cleaned);
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
     * Categorize food based on name
     */
    private String categorizeFood(String foodName) {
        if (foodName == null) return "OTHER";

        String name = foodName.toLowerCase();

        if (name.contains("cheese") || name.contains("milk") || name.contains("yogurt") ||
            name.contains("cream") || name.contains("butter")) {
            return "DAIRY";
        } else if (name.contains("fish") || name.contains("salmon") || name.contains("tuna") ||
                   name.contains("cod") || name.contains("shrimp") || name.contains("crab") ||
                   name.contains("lobster") || name.contains("oyster")) {
            return "SEAFOOD";
        } else if (name.contains("chicken") || name.contains("beef") || name.contains("pork") ||
                   name.contains("turkey") || name.contains("ham") || name.contains("meat")) {
            return "MEAT";
        } else if (name.contains("pizza") || name.contains("burger") || name.contains("sandwich") ||
                   name.contains("taco") || name.contains("burrito")) {
            return "PREPARED_FOODS";
        } else if (name.contains("soup") || name.contains("broth")) {
            return "SOUPS";
        } else if (name.contains("pasta") || name.contains("noodle") || name.contains("spaghetti")) {
            return "GRAINS";
        } else if (name.contains("honey") || name.contains("jam") || name.contains("syrup")) {
            return "SWEETENERS";
        } else {
            return "OTHER";
        }
    }

    /**
     * Set dietary flags based on food characteristics
     */
    private void setDietaryFlags(Food food) {
        String name = food.getName() != null ? food.getName().toLowerCase() : "";

        // Basic vegan/vegetarian classification
        boolean containsMeat = name.contains("chicken") || name.contains("beef") ||
                              name.contains("pork") || name.contains("fish") ||
                              name.contains("turkey") || name.contains("ham") ||
                              name.contains("salmon") || name.contains("tuna");

        boolean containsDairy = name.contains("cheese") || name.contains("milk") ||
                               name.contains("cream") || name.contains("butter");

        food.setIsVegan(!containsMeat && !containsDairy);
        food.setIsVegetarian(!containsMeat);
        food.setIsDairyFree(!containsDairy);

        // Conservative approach for other dietary flags
        food.setIsGlutenFree(false); // Would need more detailed analysis
        food.setIsKeto(false); // Would need carb analysis
        food.setIsPaleo(false); // Would need detailed ingredient analysis
        food.setIsOrganic(false); // Not specified in dataset
    }

    /**
     * Get existing food names to prevent duplicates
     */
    private Set<String> getExistingFoodNames() {
        try {
            return foodRepository.getAllFoodNames();
        } catch (Exception e) {
            System.err.println("Error getting existing food names: " + e.getMessage());
            return new HashSet<>();
        }
    }

    /**
     * Add value to map only if it's not null and meaningful
     */
    private void addIfNotNull(Map<String, Double> map, String key, Double value) {
        if (value != null && value > 0) {
            map.put(key, value);
        }
    }

    /**
     * Convert sodium from grams to milligrams
     */
    private Double convertSodiumToMg(Double sodiumInGrams) {
        if (sodiumInGrams == null) return null;
        return sodiumInGrams * 1000; // Convert grams to milligrams
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
