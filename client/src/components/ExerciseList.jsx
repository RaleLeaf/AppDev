import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

function ExerciseList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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

  // 🆕 NEW: Handle Use Workout button click
  // 🆕 NEW: Handle Use Workout button click
const handleUseWorkout = async () => {
  if (exercises.length === 0) {
    alert('No exercises available to use as workout');
    return;
  }

  // Create workout data with time slots
  const timeSlots = ['10:00', '12:00', '15:00', '17:00', '19:00', '21:00'];
  
  const workoutData = {
    title: categoryTitle,
    category: category,
    difficulty: difficulty,
    environment: environment,
    exercises: exercises.map((exercise, index) => ({
      name: exercise.name,
      time: timeSlots[index % timeSlots.length] // Cycle through time slots
    })),
    createdAt: new Date().toISOString()
  };

  // Save to localStorage (replace any existing workout)
  localStorage.setItem('activeWorkout', JSON.stringify(workoutData));
  
  // 🔧 NEW: Reset progress tracker data for the new workout
  try {
    const token = localStorage.getItem('authToken');
    
    // Get current user ID
    if (token) {
      const [, payloadB64] = token.split('.');
      const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
      const uid = payload.user_id || payload.sub;
      
      if (uid) {
        // Get user's firebaseUid
        const userRes = await fetch(`/api/users/firebase/${uid}`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        
        if (userRes.ok) {
          const userData = await userRes.json();
          const userId = userData.firebaseUid;
          const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
          
          // Check if there's existing progress for today
          const existingRes = await fetch(
            `/api/user-fitness-tracker/user/${userId}/date-range?startDate=${today}&endDate=${today}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          if (existingRes.ok) {
            const existingData = await existingRes.json();
            const existingEntry = Array.isArray(existingData) ? existingData[0] : existingData;
            
            if (existingEntry) {
              // Reset progress: clear doneExercises and set numberOfWorkouts to 0
              const resetPayload = {
                userId: userId,
                trackingDate: new Date().toISOString(),
                numberOfWorkouts: 0, // 🔧 Reset to 0
                caloriesBurned: existingEntry.caloriesBurned || 0,
                caloriesConsumed: existingEntry.caloriesConsumed || 0,
                steps: existingEntry.steps || 0,
                activeMinutes: existingEntry.activeMinutes || 0,
                averageHeartRate: existingEntry.averageHeartRate || 0,
                doneExercises: [] // 🔧 Clear completed exercises
              };
              
              // Update existing entry
              await fetch(`/api/user-fitness-tracker/${existingEntry.id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(resetPayload)
              });
              
              console.log('🔄 Progress reset for new workout');
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error resetting progress:', error);
    // Don't block the workout selection if progress reset fails
  }
  
  console.log('🏋️ Workout saved:', workoutData);
  
  // Show confirmation and navigate
  alert(`✅ "${categoryTitle}" workout has been set as your active workout! Progress has been reset.`);
  navigate('/progress');
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

        {/* 🆕 NEW: Use Workout Button */}
        {!loading && !error && exercises.length > 0 && (
          <div className="px-7 mb-4">
            <button
              onClick={handleUseWorkout}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg kanit-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>📋</span>
              Use This Workout ({exercises.length} exercises)
            </button>
            <p className="text-xs text-gray-400 text-center mt-2 kanit-light">
              This will replace your current active workout and take you to the progress tracker
            </p>
          </div>
        )}

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
                    
                    <div className="flex flex-wrap gap-2 text-sm text-gray-300 mb-3">
                      <span className="bg-zinc-800 px-2 py-1 rounded text-xs kanit-light">
                        {exercise.muscleGroup}
                      </span>
                      {exercise.equipment && (
                        <span className="bg-zinc-800 px-2 py-1 rounded text-xs kanit-light">
                          {exercise.equipment}
                        </span>
                      )}
                    </div>
                    
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
              <button 
                onClick={closeInstructionsModal}
                className="w-full bg-lime-500 text-black py-3 rounded-lg font-semibold kanit-medium hover:bg-lime-400 transition-colors"
              >
                Got it! 💪
              </button>
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