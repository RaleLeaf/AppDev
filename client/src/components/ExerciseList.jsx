import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import BottomNav from './BottonNav';
import SideNav from './SideNav';
import { userFinishedWorkoutAPI } from '../services/api'; // 👈 Add this import

function ExerciseList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuthStore(); 
  const [finishedExercises, setFinishedExercises] = useState(new Set()); // Track completed exercises
  const [submittingExercise, setSubmittingExercise] = useState(null); // Track which exercise is being submitted
  
  
  // 🆕 NEW: Modal state for exercise instructions
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  // Get category from navigation state or default to all
  const category = location.state?.category || 'Arms';
  const categoryTitle = location.state?.title || 'All Exercises';
  const difficulty = location.state?.difficulty || 'BEGINNER'; // Default to BEGINNER
  const environment = location.state?.environment || 'GYM'; // 🏋️ NEW: Get environment
  const limit = location.state?.limit || 6;

  useEffect(() => {
    if (userId) {
      loadTodaysFinishedExercises();
    }
  }, [userId]);

  useEffect(() => {
    fetchExercises();
  }, [category, difficulty, environment]); // 🏋️ NEW: Add environment dependency

  // 🧹 Helper function to clean exercise description
  const cleanDescription = (description) => {
    if (!description) return '';
    return description
      .replace(/Imported from exercise dataset\.?/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  };
  useEffect(() => {
  // Auto-open exercise modal if coming from AI recommendations
  const autoOpenExercise = location.state?.autoOpenExercise;
  if (autoOpenExercise && exercises.length > 0) {
    // Find the exercise in the loaded exercises or use the passed exercise directly
    const exerciseToOpen = exercises.find(ex => ex.name === autoOpenExercise.name) || autoOpenExercise;
    if (exerciseToOpen) {
      setSelectedExercise(exerciseToOpen);
      setShowInstructionsModal(true);
    }
  }
}, [exercises, location.state?.autoOpenExercise]);

  // 🖼️ FIXED: Helper function that always uses placeholders for variety
  const getExerciseImage = (exercise) => {
    // Check if image exists and is NOT from broken ExerciseDB
    const imageUrl = exercise.image || exercise.imageUrl || exercise.gifUrl || exercise.instructions?.[0];
    
    // 🚫 Skip ExerciseDB URLs since they're broken (404s)
    const isExerciseDbUrl = imageUrl && (imageUrl.includes('exercisedb.io') || imageUrl.includes('v2.exercisedb'));
    
    if (imageUrl && imageUrl.includes('http') && !isExerciseDbUrl) {
      return imageUrl;
    }
    
    // 🎯 FIXED: Always use placeholders with guaranteed variety
    const placeholderImages = [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 0 - Abs workout
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 1 - Upper body
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 2 - Lower body
      'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 3 - Cardio
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 4 - Gym equipment
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 5 - Fitness
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 6 - Gym
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 7 - Weights
      'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 8 - Running
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 9 - Bodyweight
      'https://images.unsplash.com/photo-1506629905853-0c4e690e53a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 10 - Strength training
      'https://images.unsplash.com/photo-1540549262-dd6230106f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // 11 - Push ups
    ];

    // 🎯 Use exercise name + index for consistent hashing
    const exerciseName = exercise.name || 'exercise';
    const exerciseId = exercise.id || exercise.firebaseId || 'default';
    
    // Create a better hash from name + id
    let hash = 0;
    const combined = exerciseName + exerciseId;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert hash to positive number and select image
    const imageIndex = Math.abs(hash) % placeholderImages.length;
    
    // 🐛 DEBUG: Log to understand the data structure
    console.log(`🖼️ Exercise: "${exerciseName}", ID: "${exerciseId}", Hash: ${hash}, Index: ${imageIndex}`);
    console.log(`🔍 Full exercise object:`, exercise);
    
    return placeholderImages[imageIndex];
  };

  // 🆕 NEW: Handle exercise click to show instructions
  const handleExerciseClick = (exercise) => {
    console.log('🔍 Exercise clicked:', exercise);
    console.log('📋 Instructions:', exercise.instructions);
    setSelectedExercise(exercise);
    setShowInstructionsModal(true);
  };

  // 🆕 NEW: Close instructions modal
  const closeInstructionsModal = () => {
    setShowInstructionsModal(false);
    setSelectedExercise(null);
  };

  // 🆕 NEW: Get instructions steps from exercise
  const getInstructionSteps = (exercise) => {
    if (!exercise?.instructions?.steps) return [];
    
    // Handle both array and object format
    if (Array.isArray(exercise.instructions.steps)) {
      return exercise.instructions.steps;
    } else if (typeof exercise.instructions.steps === 'object') {
      // Convert object to array (keys as indices)
      return Object.keys(exercise.instructions.steps)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(key => exercise.instructions.steps[key]);
    }
    
    return [];
  };

  // Update the fetchExercises method to use the new endpoint:
  const fetchExercises = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      // 🏋️ NEW: Add environment parameter to API call
      const url = `http://localhost:8080/api/exercises/workout-category/${category}?limit=${limit}&difficulty=${difficulty}&environment=${environment}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📊 Fetched exercises:', data); // 🐛 DEBUG: Log exercise data
        setExercises(data);
        setError(null);
      } else {
        setError('Failed to fetch exercises');
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  // 🚀 FIX: Navigate back with difficulty and environment state
  const handleBackClick = () => {
    navigate('/workout-categories', {
      state: {
        difficulty: difficulty,
        environment: environment // 🏋️ NEW: Pass environment back
      }
    });
  };

  // Updated function to load today's finished exercises
const loadTodaysFinishedExercises = async () => {
  try {
    const data = await userFinishedWorkoutAPI.getFinishedWorkoutsByUser(userId);
    
    // Get today's date in local timezone format (YYYY-MM-DD)
    const today = new Date();
    const todayString = today.getFullYear() + '-' + 
                       String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(today.getDate()).padStart(2, '0');
    
    // Filter workouts completed today using createdAt and create a Set of exercise names
    const todaysWorkouts = data.filter(workout => {
      if (!workout.createdAt) return false;
      
      let workoutDate;
      // Handle Firestore timestamp format
      if (workout.createdAt.seconds) {
        const localDate = new Date(workout.createdAt.seconds * 1000);
        workoutDate = localDate.getFullYear() + '-' + 
                     String(localDate.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(localDate.getDate()).padStart(2, '0');
      } else {
        // Handle ISO string or regular date
        const localDate = new Date(workout.createdAt);
        workoutDate = localDate.getFullYear() + '-' + 
                     String(localDate.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(localDate.getDate()).padStart(2, '0');
      }
      
      return workoutDate === todayString;
    });
    
    const completedExerciseNames = new Set(todaysWorkouts.map(workout => workout.workoutName));
    setFinishedExercises(completedExerciseNames);
  } catch (error) {
    console.error('Failed to load finished exercises:', error);
  }
};

// Updated function to mark an exercise as completed
const markExerciseAsCompleted = async (exercise, event) => {
  // Stop event propagation to prevent opening the modal when clicking the button
  event.stopPropagation();
  
  // If already completed or submitting, do nothing
  if (finishedExercises.has(exercise.name) || submittingExercise === exercise.name) {
    return;
  }
  
  // Check if userId is available
  if (!userId) {
    console.error('❌ No userId available for workout logging');
    return;
  }
  
  try {
    console.log('🚀 Starting workout logging for:', exercise.name);
    setSubmittingExercise(exercise.name);
    
    // Calculate calories burned based on exercise data
    const calculateCaloriesBurned = (exercise) => {
      if (exercise.caloriesPerRep && exercise.defaultReps && exercise.defaultSets) {
        return exercise.caloriesPerRep * exercise.defaultReps * exercise.defaultSets;
      } else if (exercise.caloriesPerMinute && exercise.defaultDuration) {
        return exercise.caloriesPerMinute * (exercise.defaultDuration / 60); // Convert seconds to minutes
      }
      return 0; // Default if no calorie data available
    };

    const caloriesBurned = calculateCaloriesBurned(exercise);
    
    // Prepare workout data to match CreateUserFinishedWorkoutRequest DTO
    const workoutData = {
      userId: userId,
      workoutId: exercise.id || exercise.firebaseId || null, // Use exercise ID if available
      workoutName: exercise.name,
      workoutDescription: exercise.description || null,
      caloriesBurned: caloriesBurned, // Use calculated calories
      durationMinutes: exercise.defaultDuration ? Math.round(exercise.defaultDuration / 60) : null, // Convert seconds to minutes
      averageHeartRate: null, // Can be null for now
      difficulty: exercise.difficulty === "Easy" ? 1 : exercise.difficulty === "Medium" ? 2 : 3, // Convert to number
      userRating: null, // Can be null for now
      notes: null // Can be null for now
    };
    
    console.log('📤 Sending workout data (with calculated calories):', workoutData);
    
    // Use the API service instead of direct fetch
    const result = await userFinishedWorkoutAPI.recordFinishedWorkout(workoutData);
    console.log('✅ Workout logged successfully:', result);
    console.log('🔍 Returned createdAt:', result.createdAt);
    
    // Update the finished exercises set
    setFinishedExercises(prev => new Set([...prev, exercise.name]));
    
    // Reload today's finished exercises to update the UI
    await loadTodaysFinishedExercises();
    
  } catch (error) {
    console.error('❌ Error saving workout:', error);
    // Show user-friendly error message
    alert('Failed to log workout. Please try again.');
  } finally {
    setSubmittingExercise(null);
  }
};

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation for desktop */}
      <SideNav />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-5 flex items-center">
          <button className="p-2" onClick={handleBackClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">{categoryTitle}</h1>
        </div>

        {/* Exercise list */}
        <div className="space-y-4 px-7 pb-24">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500 mx-auto mb-4"></div>
              <p>Loading exercises...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchExercises}
                className="bg-lime-500 text-black px-4 py-2 rounded hover:bg-lime-400"
              >
                Retry
              </button>
            </div>
          ) : exercises.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No exercises found for this category</p>
            </div>
          ) : (
            exercises.map((exercise, index) => {
              const cleanedDescription = cleanDescription(exercise.description);
              const exerciseImage = getExerciseImage(exercise);
              const hasInstructions = exercise.instructions && exercise.instructions.steps;
              
              return (
                <div 
                  key={exercise.id || exercise.firebaseId || index} 
                  className="bg-zinc-900 p-4 rounded-lg flex cursor-pointer hover:bg-zinc-800 transition-colors duration-200"
                  onClick={() => handleExerciseClick(exercise)}
                >
                  {/* 🖼️ Exercise Image - Left Side */}
                  <div className="w-20 h-20 flex-shrink-0 mr-4">
                    <img 
                      src={exerciseImage}
                      alt={exercise.name || 'Exercise'}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        // 🚫 Prevent infinite loop - only set fallback once
                        if (!e.target.dataset.fallbackSet) {
                          e.target.dataset.fallbackSet = 'true';
                          e.target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                        }
                      }}
                    />
                  </div>
                  
                  {/* Exercise Content - Right Side */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white kanit-medium">{exercise.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-lime-500 text-black px-2 py-1 rounded kanit-regular">
                          {exercise.difficulty}
                        </span>
                        {/* 🆕 NEW: Instructions indicator */}
                        {hasInstructions && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded kanit-regular">
                            📋 Guide
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Tags section with workout button on the right */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                        <span className="bg-zinc-800 px-2 py-1 rounded text-xs kanit-light">
                          {exercise.muscleGroup}
                        </span>
                        {exercise.equipment && (
                          <span className="bg-zinc-800 px-2 py-1 rounded text-xs kanit-light">
                            {exercise.equipment}
                          </span>
                        )}
                      </div>
                      
                      {/* Workout button - right side, theme-matching */}
                      {userId && (
                        <div className="ml-2">
                          {finishedExercises.has(exercise.name) ? (
                            <span className="bg-zinc-700 text-green-400 px-2 py-1 rounded text-xs kanit-light flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Done
                            </span>
                          ) : submittingExercise === exercise.name ? (
                            <span className="bg-zinc-700 text-yellow-400 px-2 py-1 rounded text-xs kanit-light flex items-center">
                              <div className="animate-spin rounded-full h-3 w-3 border-b border-yellow-400 mr-1"></div>
                              Saving
                            </span>
                          ) : (
                            <button
                              onClick={(e) => markExerciseAsCompleted(exercise, e)}
                              className="bg-zinc-700 text-lime-400 px-2 py-1 rounded text-xs kanit-light hover:bg-zinc-600 transition-colors flex items-center"
                            >
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                              Log It
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Sets, Reps, and Calories Info */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-3 text-xs text-gray-400">
                        {exercise.defaultSets && (
                          <span className="flex items-center">
                            <span className="text-blue-400 font-medium mr-1">{exercise.defaultSets}</span>
                            sets
                          </span>
                        )}
                        {exercise.defaultReps && (
                          <span className="flex items-center">
                            <span className="text-green-400 font-medium mr-1">{exercise.defaultReps}</span>
                            reps
                          </span>
                        )}
                        {exercise.caloriesPerRep && exercise.defaultReps && (
                          <span className="flex items-center">
                            <span className="text-orange-400 font-medium mr-1">
                              {(exercise.caloriesPerRep * exercise.defaultReps * (exercise.defaultSets || 1)).toFixed(1)}
                            </span>
                            cal
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Description */}
                    {cleanedDescription && (
                      <p className="text-gray-400 text-sm kanit-light line-clamp-2">
                        {cleanedDescription}
                      </p>
                    )}

                    {/* 🆕 NEW: Click hint */}
                    {hasInstructions && (
                      <p className="text-lime-500 text-xs kanit-light mt-2">
                        💡 Click to view step-by-step instructions
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 🆕 NEW: Instructions Modal */}
      {showInstructionsModal && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-zinc-900 p-6 border-b border-zinc-700 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white kanit-bold">{selectedExercise.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-lime-500 text-black px-2 py-1 rounded kanit-regular">
                    {selectedExercise.difficulty}
                  </span>
                  <span className="text-xs bg-zinc-800 text-white px-2 py-1 rounded kanit-light">
                    {selectedExercise.muscleGroup}
                  </span>
                </div>
              </div>
              <button 
                onClick={closeInstructionsModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Exercise Image */}
              <div className="w-full h-48 mb-6">
                <img 
                  src={getExerciseImage(selectedExercise)}
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Description */}
              {selectedExercise.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white kanit-medium mb-3">Description</h3>
                  <p className="text-gray-300 kanit-light leading-relaxed">
                    {cleanDescription(selectedExercise.description)}
                  </p>
                </div>
              )}

              {/* Step-by-step Instructions */}
              <div>
                <h3 className="text-lg font-semibold text-white kanit-medium mb-4">
                  📋 Step-by-Step Instructions
                </h3>
                
                {getInstructionSteps(selectedExercise).length > 0 ? (
                  <div className="space-y-4">
                    {getInstructionSteps(selectedExercise).map((step, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-zinc-800 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-lime-500 text-black rounded-full flex items-center justify-center text-sm font-bold kanit-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-200 kanit-light leading-relaxed flex-1">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 kanit-light">
                      No step-by-step instructions available for this exercise.
                    </p>
                  </div>
                )}
              </div>

              {/* Equipment Required */}
              {selectedExercise.equipment && (
                <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-white kanit-medium mb-2">Equipment Required</h4>
                  <span className="text-gray-300 kanit-light text-sm">
                    {selectedExercise.equipment}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-zinc-900 p-6 border-t border-zinc-700">
              <div className="flex gap-3">
                {/* Log It Button */}
                {userId && (
                  <div className="flex-1">
                    {finishedExercises.has(selectedExercise.name) ? (
                      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold kanit-medium flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Exercise Completed!
                      </button>
                    ) : submittingExercise === selectedExercise.name ? (
                      <button disabled className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold kanit-medium flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Logging Exercise...
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => markExerciseAsCompleted(selectedExercise, e)}
                        className="w-full bg-lime-500 text-black py-3 rounded-lg font-semibold kanit-medium hover:bg-lime-400 transition-colors flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Log This Exercise
                      </button>
                    )}
                  </div>
                )}
                
                {/* Close Button */}
                <button 
                  onClick={closeInstructionsModal}
                  className="bg-zinc-700 text-white py-3 px-6 rounded-lg font-semibold kanit-medium hover:bg-zinc-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation for mobile */}
      <BottomNav />
    </div>
  );
}

export default ExerciseList;