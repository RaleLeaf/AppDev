import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const WorkoutCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🚀 FIX: Remember difficulty when navigating back
  const [selectedDifficulty, setSelectedDifficulty] = useState(() => {
    // Check if coming back from ExerciseList with difficulty state
    if (location.state?.difficulty) {
      return location.state.difficulty;
    }
    // Otherwise check localStorage for persisted difficulty
    return localStorage.getItem('selectedDifficulty') || 'BEGINNER';
  });

  // 🏋️ NEW: Environment selector state
  const [selectedEnvironment, setSelectedEnvironment] = useState(() => {
    // Check if coming back with environment state or use localStorage
    if (location.state?.environment) {
      return location.state.environment;
    }
    return localStorage.getItem('selectedEnvironment') || 'GYM';
  });

  // Define difficulty configurations
  const difficultyConfig = {
    'BEGINNER': {
      limit: 6,
      label: 'Beginner',
      description: 'Perfect for starting your fitness journey',
      color: 'bg-green-500 hover:bg-green-400'
    },
    'INTERMEDIATE': {
      limit: 6,
      label: 'Intermediate', 
      description: 'Ready to challenge yourself more',
      color: 'bg-yellow-500 hover:bg-yellow-400'
    },
    'ADVANCED': {
      limit: 6,
      label: 'Advanced',
      description: 'For experienced fitness enthusiasts',
      color: 'bg-red-500 hover:bg-red-400'
    }
  };

  // 🏋️ UPDATED: Environment configurations with descriptions
  const environmentConfig = {
    'GYM': {
      label: 'Gym',
      description: 'Complete gym with all equipment',
      icon: '🏋️',
      equipmentFilter: 'all' // Include all equipment
    },
    'BAKAL_GYM': {
      label: 'Bakal Gym',
      description: 'Free weights only (dumbbells, barbells)',
      icon: '💪',
      equipmentFilter: 'no_machines' // Exclude machines and cables
    },
    'HOME': {
      label: 'Home Workout',
      description: 'Bodyweight and minimal equipment',
      icon: '🏠',
      equipmentFilter: 'bodyweight_only' // Only bodyweight and bands
    }
  };

  // Fetch exercise counts for each category from your API
  useEffect(() => {
    fetchWorkoutCategoriesWithCounts();
  }, [selectedDifficulty, selectedEnvironment]); // Re-fetch when difficulty or environment changes

  const fetchWorkoutCategoriesWithCounts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const currentConfig = difficultyConfig[selectedDifficulty];

      // Updated categories based on your requirements
      const categories = [
        { title: "Wake Up Call", category: "Arms", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1518609571773-39b7d303a87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: false },
        { title: "Full Body Goal Crusher", category: "Full Body", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: true },
        { title: "Lower Body Strength", category: "Lower Body", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: true },
        { title: "Upper Body Focus", category: "Upper Body", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: false },
        { title: "Core Crusher", category: "Abs", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: true },
        { title: "Cardio Blast", category: "Cardio", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: false }
      ];

      // Get counts by making individual API calls with difficulty filtering
      const workoutsWithCounts = await Promise.all(
        categories.map(async (workout) => {
          try {
            // 🏋️ NEW: Add environment parameter to API call
            const response = await fetch(`http://localhost:8080/api/exercises/workout-category/${workout.category}?limit=${currentConfig.limit}&difficulty=${selectedDifficulty}&environment=${selectedEnvironment}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const exercises = await response.json();
              return {
                ...workout,
                count: exercises.length.toString().padStart(2, '0'),
                difficultyLabel: currentConfig.label,
                environment: selectedEnvironment
              };
            } else {
              return { ...workout, count: "00", difficultyLabel: currentConfig.label, environment: selectedEnvironment };
            }
          } catch (error) {
            console.error(`Error fetching exercises for ${workout.title}:`, error);
            return { ...workout, count: "00", difficultyLabel: currentConfig.label, environment: selectedEnvironment };
          }
        })
      );

      setWorkouts(workoutsWithCounts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workout categories:', error);
      // Fallback with current difficulty and environment
      const currentConfig = difficultyConfig[selectedDifficulty];
      const categories = [
        { title: "Wake Up Call", category: "Arms", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1518609571773-39b7d303a87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: false, count: "00", difficultyLabel: currentConfig.label, environment: selectedEnvironment },
        { title: "Full Body Goal Crusher", category: "Full Body", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: true, count: "00", difficultyLabel: currentConfig.label, environment: selectedEnvironment },
        { title: "Lower Body Strength", category: "Lower Body", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: true, count: "00", difficultyLabel: currentConfig.label, environment: selectedEnvironment },
        { title: "Upper Body Focus", category: "Upper Body", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: false, count: "00", difficultyLabel: currentConfig.label, environment: selectedEnvironment },
        { title: "Core Crusher", category: "Abs", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: true, count: "00", difficultyLabel: currentConfig.label, environment: selectedEnvironment },
        { title: "Cardio Blast", category: "Cardio", difficulty: selectedDifficulty, image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", isPro: false, count: "00", difficultyLabel: currentConfig.label, environment: selectedEnvironment }
      ];
      setWorkouts(categories);
      setLoading(false);
    }
  };

  const handleWorkoutClick = (workout) => {
    navigate('/exercises', {
      state: {
        category: workout.category,
        title: workout.title,
        difficulty: workout.difficulty,
        environment: workout.environment,
        limit: difficultyConfig[selectedDifficulty].limit
      }
    });
  };

  // 🚀 FIX: Persist difficulty selection
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    localStorage.setItem('selectedDifficulty', difficulty);
  };

  // 🏋️ NEW: Handle environment selection
  const handleEnvironmentChange = (environment) => {
    setSelectedEnvironment(environment);
    localStorage.setItem('selectedEnvironment', environment);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mb-4"></div>
          <p>Loading workout categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-col md:flex-row md:min-h-screen">
        {/* Sidebar Navigation for desktop */}
        <SideNav />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <div className="p-4 sm:p-6 pt-8 md:pt-10 md:px-10">
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 kanit-medium md:text-left md:text-3xl">Workout Categories</h1>

            {/* 🏋️ UPDATED: Environment Selector - Minimal Tab Style */}
            <div className="flex justify-center md:justify-start gap-1 mb-4 overflow-x-auto pb-2">
              {Object.entries(environmentConfig).map(([environment, config]) => (
                <button 
                  key={environment}
                  onClick={() => handleEnvironmentChange(environment)}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs whitespace-nowrap kanit-regular flex-shrink-0 transition-colors ${
                    selectedEnvironment === environment 
                      ? 'bg-zinc-700 text-white' 
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="mr-1">{config.icon}</span>
                  {config.label}
                </button>
              ))}
            </div>

            {/* Environment Description */}
            <div className="mb-4 text-center md:text-left">
              <p className="text-xs text-zinc-400">
                {environmentConfig[selectedEnvironment].description}
              </p>
            </div>

            {/* Difficulty Tabs - Now Based on Exercise Difficulty */}
            <div className="flex justify-start sm:justify-center md:justify-start gap-2 mb-6 overflow-x-auto pb-2">
              {Object.entries(difficultyConfig).map(([difficulty, config]) => (
                <button 
                  key={difficulty}
                  onClick={() => handleDifficultyChange(difficulty)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap kanit-regular flex-shrink-0 transition-colors ${
                    selectedDifficulty === difficulty 
                      ? 'bg-lime-500 text-black hover:bg-lime-400' 
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>

            {/* Difficulty Description */}
            <div className="mb-4 text-center md:text-left">
              <p className="text-sm text-zinc-400">
                {difficultyConfig[selectedDifficulty].description}
              </p>
            </div>
          </div>

          {/* Workout Cards - Now shows difficulty and environment filtered exercises */}
          <div className="flex-1 px-4 pb-20 md:p-10 md:pt-0 md:pb-10">
            {/* Mobile view - scrollable */}
            <div className="md:hidden flex flex-col overflow-y-auto space-y-4 max-h-[calc(100vh-280px)]">
              {workouts.map((workout, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden relative shadow-lg flex-shrink-0 transition-transform hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleWorkoutClick(workout)}
                >
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-36 sm:h-44 object-cover"
                  />
                  {workout.isPro && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded kanit-bold">PRO</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 p-3 sm:p-4 w-full bg-gradient-to-t from-black/90 to-transparent">
                    <h2 className="text-lg sm:text-xl font-bold kanit-medium">{workout.title}</h2>
                    <p className="text-lime-500 text-xs sm:text-sm kanit-regular">| {workout.count} {workout.difficultyLabel} Exercises</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop view - grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {workouts.map((workout, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden relative shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleWorkoutClick(workout)}
                >
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-60 lg:h-72 xl:h-80 object-cover"
                  />
                  {workout.isPro && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded kanit-bold">PRO</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 p-5 w-full bg-gradient-to-t from-black/90 to-transparent">
                    <h2 className="text-2xl font-bold kanit-medium">{workout.title}</h2>
                    <p className="text-lime-500 text-base kanit-regular">| {workout.count} {workout.difficultyLabel} Exercises</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default WorkoutCategories;