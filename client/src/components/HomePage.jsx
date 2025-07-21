import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';
import useAuthStore from '../store/authStore'; // Import your existing auth store

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore(); // Get user from your auth store
  const [userName, setUserName] = useState('User');
  const [greeting, setGreeting] = useState('Good morning');
  const [currentDate, setCurrentDate] = useState('');
  
  // 🆕 NEW: State for workout categories
  const [selectedDifficulty, setSelectedDifficulty] = useState(() => {
    return localStorage.getItem('selectedDifficulty') || 'BEGINNER';
  });
  const [selectedEnvironment, setSelectedEnvironment] = useState(() => {
    return localStorage.getItem('selectedEnvironment') || 'GYM';
  });

  // 🆕 NEW: State for real fitness stats
  const [todayStats, setTodayStats] = useState({
    numberOfWorkouts: 0,
    caloriesBurned: 0,
    steps: 0,
    activeMinutes: 0,
    totalExercises: 0,
    completedExercises: 0
  });
  const [userId, setUserId] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Function to get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Function to get current date formatted
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  // 🔧 UPDATED: Load user ID and fetch stats with proper timing
  useEffect(() => {
    const loadUserAndStats = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const [, payloadB64] = token.split('.');
        const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
        const uid = payload.user_id || payload.sub;
        if (!uid) return;

        const res = await fetch(`/api/users/firebase/${uid}`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUserId(userData.firebaseUid);
          
          // 🔧 FIX: Load workout first, then fetch stats
          let currentWorkout = null;
          try {
            const savedWorkout = localStorage.getItem('activeWorkout');
            if (savedWorkout) {
              currentWorkout = JSON.parse(savedWorkout);
            }
          } catch (error) {
            console.error('Error loading workout for stats:', error);
          }
          
          // Fetch stats with workout data
          fetchTodayStats(userData.firebaseUid, token, currentWorkout);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    };

    loadUserAndStats();
  }, []);

  // 🆕 NEW: Load active workout from localStorage
  useEffect(() => {
    try {
      const savedWorkout = localStorage.getItem('activeWorkout');
      if (savedWorkout) {
        const workoutData = JSON.parse(savedWorkout);
        setActiveWorkout(workoutData);
        console.log('🏋️ Loaded active workout on HomePage:', workoutData);
      }
    } catch (error) {
      console.error('Error loading active workout:', error);
    }
  }, []);

  // 🆕 NEW: Fetch today's fitness stats
  const fetchTodayStats = async (userIdParam = null, tokenParam = null, workoutData = null) => {
    const finalUserId = userIdParam || userId;
    const token = tokenParam || localStorage.getItem('authToken');
    
    if (!finalUserId || !token) return;

    setStatsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      const res = await fetch(
        `/api/user-fitness-tracker/user/${finalUserId}/date-range?startDate=${today}&endDate=${today}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.ok) {
        const data = await res.json();
        const entry = Array.isArray(data) ? data[0] : data;
        
        if (entry) {
          // Calculate exercise progress from workout data (parameter first, then state, then localStorage)
          let currentWorkout = workoutData || activeWorkout;
          if (!currentWorkout) {
            try {
              const savedWorkout = localStorage.getItem('activeWorkout');
              if (savedWorkout) {
                currentWorkout = JSON.parse(savedWorkout);
              }
            } catch (error) {
              console.error('Error loading workout for stats:', error);
            }
          }
          
          const completedCount = (entry.doneExercises || []).length;
          const totalCount = currentWorkout?.exercises?.length || 0;
          
          setTodayStats({
            numberOfWorkouts: entry.numberOfWorkouts || 0,
            caloriesBurned: entry.caloriesBurned || 0,
            steps: entry.steps || 0,
            activeMinutes: entry.activeMinutes || 0,
            totalExercises: totalCount,
            completedExercises: completedCount
          });
          
          console.log('📊 Today\'s stats loaded:', {
            workouts: entry.numberOfWorkouts,
            calories: entry.caloriesBurned,
            steps: entry.steps,
            minutes: entry.activeMinutes,
            exercises: `${completedCount}/${totalCount}`
          });
        } else {
          // No data for today, use defaults but include workout info
          let currentWorkout = workoutData || activeWorkout;
          if (!currentWorkout) {
            try {
              const savedWorkout = localStorage.getItem('activeWorkout');
              if (savedWorkout) {
                currentWorkout = JSON.parse(savedWorkout);
              }
            } catch (error) {
              console.error('Error loading workout for stats:', error);
            }
          }
          
          const totalCount = currentWorkout?.exercises?.length || 0;
          setTodayStats({
            numberOfWorkouts: 0,
            caloriesBurned: 0,
            steps: 0,
            activeMinutes: 0,
            totalExercises: totalCount,
            completedExercises: 0
          });
        }
      } else {
        console.error('Failed to fetch stats:', res.status);
      }
    } catch (error) {
      console.error('Error fetching today\'s stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  // 🆕 NEW: Refresh stats when active workout changes
  useEffect(() => {
    if (userId && activeWorkout) {
      fetchTodayStats();
    }
  }, [activeWorkout, userId]);

  // 🆕 NEW: Listen for localStorage changes and page focus
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'activeWorkout' && userId) {
        console.log('🔄 Active workout changed in localStorage, refreshing stats');
        fetchTodayStats();
      }
    };

    const handleFocus = () => {
      if (userId) {
        console.log('🔄 Page focused, refreshing stats');
        fetchTodayStats();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [userId]);

  // Load user data on component mount
  useEffect(() => {
    // Set dynamic greeting and date
    setGreeting(getGreeting());
    setCurrentDate(getCurrentDate());

    // Get user name from various sources (in order of priority)
    const getUserName = () => {
      // 1. Try to get from your auth store user first
      if (user) {
        const name = user.displayName || 
                    user.name || 
                    user.firstName || 
                    user.username || 
                    (user.email ? user.email.split('@')[0] : null);
        
        if (name) {
          console.log('Found name from auth store:', name);
          setUserName(name);
          // Also store in localStorage for persistence
          localStorage.setItem('userName', name);
          return;
        }
      }

      // 2. Try to get from localStorage (fallback)
      const storedName = localStorage.getItem('userName') || localStorage.getItem('name');
      if (storedName) {
        console.log('Found stored name:', storedName);
        setUserName(storedName);
        return;
      }

      // 3. Try to get from sessionStorage
      const sessionName = sessionStorage.getItem('userName') || sessionStorage.getItem('name');
      if (sessionName) {
        console.log('Found session name:', sessionName);
        setUserName(sessionName);
        return;
      }

      // 4. Try to get from stored user object
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData && (userData.name || userData.firstName || userData.displayName || userData.username || userData.email)) {
            const foundName = userData.name || userData.firstName || userData.displayName || userData.username || userData.email.split('@')[0];
            console.log('Found name from user data:', foundName);
            setUserName(foundName);
            return;
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
        }
      }

      // 5. Try to get from Firebase user data
      const firebaseUser = localStorage.getItem('firebaseUser');
      if (firebaseUser) {
        try {
          const fbUser = JSON.parse(firebaseUser);
          if (fbUser && (fbUser.displayName || fbUser.name || fbUser.email)) {
            const foundName = fbUser.displayName || fbUser.name || fbUser.email.split('@')[0];
            console.log('Found name from Firebase user:', foundName);
            setUserName(foundName);
            return;
          }
        } catch (error) {
          console.error('Error parsing Firebase user data:', error);
        }
      }

      // 6. If user is authenticated but no name found, try API
      if (isAuthenticated) {
        fetchUserFromAPI();
      } else {
        // 7. Final fallback - set default name
        console.log('No authentication found, using default name');
        setUserName('Fitness Enthusiast');
      }
    };

    getUserName();

    // Add test functions to window for easy testing
    if (typeof window !== 'undefined') {
      window.setUserName = (name) => {
        localStorage.setItem('userName', name);
        setUserName(name);
        console.log(`Name set to: ${name}`);
      };

      window.simulateLogin = (displayName = 'Sarah', uid = '123456789') => {
        console.log(`Simulating login for: ${displayName}`);
        localStorage.setItem('firebaseUid', uid);
        localStorage.setItem('authToken', 'test-token-12345');
        localStorage.setItem('userName', displayName);
        
        // Create proper user object structure
        const userData = {
          id: uid,
          firebaseUid: uid,
          name: displayName,
          firstName: displayName.split(' ')[0],
          lastName: displayName.split(' ')[1] || '',
          displayName: displayName,
          email: `${displayName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          isActive: true,
          role: 'USER',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('firebaseUser', JSON.stringify({
          displayName,
          email: userData.email,
          uid
        }));
        setUserName(displayName);
      };

      window.clearLogin = () => {
        localStorage.removeItem('firebaseUid');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('name');
        localStorage.removeItem('userData');
        localStorage.removeItem('firebaseUser');
        console.log('Cleared all login data');
        setUserName('Fitness Enthusiast');
      };

      // Debug function to check stored data
      window.checkStoredData = () => {
        console.log('=== Stored Data Check ===');
        console.log('Auth Store User:', user);
        console.log('Is Authenticated:', isAuthenticated);
        console.log('userName:', localStorage.getItem('userName'));
        console.log('userData:', localStorage.getItem('userData'));
        console.log('firebaseUser:', localStorage.getItem('firebaseUser'));
        console.log('firebaseUid:', localStorage.getItem('firebaseUid'));
        console.log('authToken:', localStorage.getItem('authToken'));
      };

      // 🆕 NEW: Debug function for stats
      window.refreshStats = () => {
        console.log('🔄 Refreshing stats...');
        fetchTodayStats();
      };
    }

    // Update greeting every minute
    const interval = setInterval(() => {
      setGreeting(getGreeting());
      setCurrentDate(getCurrentDate());
    }, 60000);

    return () => clearInterval(interval);
  }, [user, isAuthenticated]); // Re-run when user or auth state changes

  // Function to fetch user data from API using the server's endpoint
  const fetchUserFromAPI = async () => {
    try {
      // Check if we have auth data from your auth store or localStorage
      const firebaseUid = localStorage.getItem('firebaseUid') || user?.uid || user?.firebaseUid;
      const authToken = localStorage.getItem('authToken') || user?.accessToken;
      
      if (!firebaseUid || !authToken) {
        // No auth data available
        console.log('No Firebase UID or auth token found, using default name');
        setUserName('Fitness Enthusiast'); // Changed default name
        return;
      }

      console.log('Attempting to fetch user data from API...');
      
      // Use the exact endpoint from your server API documentation
      const response = await fetch(`http://localhost:8080/api/users/firebase/${firebaseUid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('User data received from API:', userData);
        
        // Based on your server's UserDTO structure
        const name = userData.name || 
                    userData.firstName || 
                    userData.displayName || 
                    userData.username || 
                    (userData.email ? userData.email.split('@')[0] : 'User');
        
        setUserName(name);
        
        // Store in localStorage for future use
        localStorage.setItem('userName', name);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        console.log('Name set from API:', name);
      } else if (response.status === 404) {
        console.log('User not found in backend, using fallback');
        
        // Try to get user info from your auth store or Firebase
        if (user && user.displayName) {
          console.log('Using auth store display name:', user.displayName);
          setUserName(user.displayName);
        } else if (user && user.email) {
          const emailName = user.email.split('@')[0];
          console.log('Using email username:', emailName);
          setUserName(emailName);
        } else {
          console.log('No fallback data available, using default');
          setUserName('Fitness Enthusiast');
        }
      } else {
        console.error('API Error:', response.status, response.statusText);
        
        // Use auth store data as fallback
        if (user && user.displayName) {
          console.log('Using auth store display name as fallback:', user.displayName);
          setUserName(user.displayName);
        } else if (user && user.email) {
          const emailName = user.email.split('@')[0];
          console.log('Using email username as fallback:', emailName);
          setUserName(emailName);
        } else {
          setUserName('Fitness Enthusiast');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      
      // Try auth store fallback first
      if (user && user.displayName) {
        console.log('Using auth store display name as fallback:', user.displayName);
        setUserName(user.displayName);
      } else if (user && user.email) {
        const emailName = user.email.split('@')[0];
        console.log('Using email username as fallback:', emailName);
        setUserName(emailName);
      } else {
        // Final fallback to default name
        console.log('Using final fallback name');
        setUserName('Fitness Enthusiast');
      }
    }
  };

  // 🆕 NEW: Category configurations from WorkoutCategories.jsx
  const difficultyCategories = [
    { 
      key: 'BEGINNER', 
      name: "Beginner", 
      active: selectedDifficulty === 'BEGINNER',
      color: 'bg-green-500 hover:bg-green-400'
    },
    { 
      key: 'INTERMEDIATE', 
      name: "Intermediate", 
      active: selectedDifficulty === 'INTERMEDIATE',
      color: 'bg-yellow-500 hover:bg-yellow-400'
    },
    { 
      key: 'ADVANCED', 
      name: "Advanced", 
      active: selectedDifficulty === 'ADVANCED',
      color: 'bg-red-500 hover:bg-red-400'
    }
  ];

  const environmentCategories = [
    { 
      key: 'GYM', 
      name: "Gym", 
      active: selectedEnvironment === 'GYM',
      icon: '🏋️'
    },
    { 
      key: 'BAKAL_GYM', 
      name: "Bakal Gym", 
      active: selectedEnvironment === 'BAKAL_GYM',
      icon: '💪'
    },
    { 
      key: 'HOME', 
      name: "Home Workout", 
      active: selectedEnvironment === 'HOME',
      icon: '🏠'
    }
  ];

  // 🆕 NEW: Handle category selection and navigation
  const handleCategoryClick = (category) => {
    if (difficultyCategories.some(c => c.key === category.key)) {
      setSelectedDifficulty(category.key);
      localStorage.setItem('selectedDifficulty', category.key);
    } else {
      setSelectedEnvironment(category.key);
      localStorage.setItem('selectedEnvironment', category.key);
    }
    
    // Navigate to workout categories with selected filters
    navigate('/workout-categories', {
      state: {
        difficulty: difficultyCategories.some(c => c.key === category.key) ? category.key : selectedDifficulty,
        environment: environmentCategories.some(c => c.key === category.key) ? category.key : selectedEnvironment
      }
    });
  };

  // 🆕 NEW: Handle workout card clicks - navigate to specific exercises
  const handleWorkoutCardClick = (workoutType, category, title) => {
    navigate('/exercises', {
      state: {
        category: category,
        title: title,
        difficulty: 'BEGINNER', // Always use beginner for homepage cards
        environment: selectedEnvironment,
        limit: 6
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex min-h-screen bg-black">
        {/* SideNav - Only visible on medium screens and up */}
        <SideNav />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col pb-24 md:pb-0 bg-black">
          {/* Content Container - Centered properly for all screen sizes */}
          <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto bg-black">
            {/* Header with Greeting */}
            <div className="p-4 sm:p-5 lg:p-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold kanit-bold mb-1">
                HELLO {userName.toUpperCase()},
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-gray-300 kanit-light text-sm sm:text-base lg:text-lg">{greeting}.</p>
                <p className="text-lime-500 kanit-regular text-xs sm:text-sm lg:text-base">{currentDate}</p>
              </div>
              
              {/* Fitness Helper Notice */}
              <div className="mt-4 sm:mt-5 lg:mt-8 mb-3 sm:mb-4 lg:mb-6">
                <p className="text-white kanit-regular text-sm sm:text-base lg:text-lg max-w-2xl">
                  Ask Fitness Helper to have your own customized Fitness Programs!
                </p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 px-4 sm:px-5 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                
                {/* Left Column - Main Content */}
                <div className="lg:col-span-8">
                  {/* First Beginner Workout Card - Wake Up Call (Arms) */}
                  <div 
                    className="bg-zinc-900 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden mb-4 sm:mb-6 lg:mb-8 relative group cursor-pointer transition-transform hover:scale-[1.02] shadow-md"
                    onClick={() => handleWorkoutCardClick('warmup', 'Arms', 'Wake Up Call')}
                  >
                    <div className="aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/9] w-full relative">
                      <img 
                        src="https://images.unsplash.com/photo-1518609571773-39b7d303a87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Wake Up Call"
                        className="absolute w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 p-3 sm:p-4 lg:p-6 w-full bg-gradient-to-t from-black/90 to-transparent">
                      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold kanit-medium">Wake Up Call</h2>
                      <p className="text-lime-500 kanit-regular text-xs sm:text-sm lg:text-base">| Arms Exercises - Beginner</p>
                    </div>
                  </div>

                  {/* Workout Categories Section - UPDATED with real categories */}
                  <div className="mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4">
                      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold kanit-medium">Workout Categories</h2>
                      <button 
                        onClick={() => navigate('/workout-categories')}
                        className="text-lime-500 kanit-regular text-xs sm:text-sm lg:text-base hover:underline transition-colors"
                      >
                        See All
                      </button>
                    </div>
                    
                    {/* Difficulty Category Pills */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-400 mb-2 kanit-light">Difficulty Level</p>
                      <div className="flex flex-nowrap overflow-x-auto lg:flex-wrap lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide gap-2 -mx-1 px-1">
                        {difficultyCategories.map((category, index) => (
                          <button 
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                            className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full ${
                              category.active 
                                ? 'bg-lime-500 text-black' 
                                : 'bg-zinc-800 text-white hover:bg-zinc-700'
                            } kanit-regular text-xs sm:text-sm lg:text-base whitespace-nowrap flex-shrink-0 transition-colors`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Environment Category Pills */}
                    <div>
                      <p className="text-xs text-gray-400 mb-2 kanit-light">Workout Environment</p>
                      <div className="flex flex-nowrap overflow-x-auto lg:flex-wrap lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide gap-2 -mx-1 px-1">
                        {environmentCategories.map((category, index) => (
                          <button 
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                            className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full ${
                              category.active 
                                ? 'bg-lime-500 text-black' 
                                : 'bg-zinc-800 text-white hover:bg-zinc-700'
                            } kanit-regular text-xs sm:text-sm lg:text-base whitespace-nowrap flex-shrink-0 transition-colors`}
                          >
                            <span className="mr-1">{category.icon}</span>
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Second Beginner Workout Card - Full Body Goal Crusher */}
                  <div 
                    className="bg-zinc-900 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden mb-5 sm:mb-6 lg:mb-8 relative group cursor-pointer transition-transform hover:scale-[1.02] shadow-md"
                    onClick={() => handleWorkoutCardClick('fullbody', 'Full Body', 'Full Body Goal Crusher')}
                  >
                    <div className="aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/9] w-full relative">
                      <img 
                        src="https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Full Body Goal Crusher"
                        className="absolute w-full h-full object-cover"
                      />
                      {/* PRO Badge */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded kanit-bold">PRO</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-3 sm:p-4 lg:p-6 w-full bg-gradient-to-t from-black/90 to-transparent">
                      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold kanit-medium">Full Body Goal Crusher</h2>
                      <p className="text-lime-500 kanit-regular text-xs sm:text-sm lg:text-base">| Full Body Exercises - Beginner</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Sidebar content */}
                <div className="lg:col-span-4">
                  {/* Leaderboard Section */}
                  <div className="mb-5 sm:mb-6 lg:mb-8">
                    <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4">
                      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold kanit-medium">Show Leaderboard</h2>
                      <button 
                        onClick={() => navigate('/leaderboard')}
                        className="text-lime-500 kanit-regular text-xs sm:text-sm lg:text-base hover:underline transition-colors"
                      >
                        See All
                      </button>
                    </div>
                    
                    <div 
                      onClick={() => navigate('/leaderboard')}
                      className="rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden relative group cursor-pointer transition-transform hover:scale-[1.02] shadow-md"
                    >
                      <div className="aspect-[3/1] sm:aspect-[4/1] lg:aspect-[16/9] w-full relative">
                        <img 
                          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                          alt="Leaderboard"
                          className="absolute w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* 🔧 UPDATED: Mobile Quick Stats with Real Data */}
                  <div onClick={() => navigate('/progress')} className="lg:hidden bg-zinc-900 rounded-xl p-4 mb-6 shadow-md z-50 cursor-pointer hover:bg-zinc-800 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-base font-bold kanit-medium">Today's Progress</h3>
                      {statsLoading && (
                        <div className="w-4 h-4 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                    
                    {/* Exercise Progress - Only show if there's an active workout */}
                    {activeWorkout && (
                      <div className="mb-3 p-2 bg-zinc-800 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-400">Current Workout</span>
                          <span className="text-xs text-lime-500 font-semibold">
                            {todayStats.completedExercises}/{todayStats.totalExercises}
                          </span>
                        </div>
                        <p className="text-xs text-white truncate">{activeWorkout.title}</p>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-lime-500 h-1.5 rounded-full transition-all duration-300" 
                            style={{ 
                              width: `${todayStats.totalExercises > 0 ? (todayStats.completedExercises / todayStats.totalExercises) * 100 : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex flex-col items-center bg-zinc-800 rounded-lg p-2">
                        <span className="text-gray-400 text-xs">Calories</span>
                        <span className="text-lime-500 font-semibold kanit-medium">
                          {todayStats.caloriesBurned.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-zinc-800 rounded-lg p-2">
                        <span className="text-gray-400 text-xs">Steps</span>
                        <span className="text-lime-500 font-semibold kanit-medium">
                          {todayStats.steps.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-zinc-800 rounded-lg p-2">
                        <span className="text-gray-400 text-xs">Minutes</span>
                        <span className="text-lime-500 font-semibold kanit-medium">
                          {todayStats.activeMinutes}
                        </span>
                      </div>
                    </div>
                    
                    {/* Tap to view more indicator */}
                    <div className="mt-2 text-center">
                      <span className="text-xs text-gray-500">Tap to view full progress</span>
                    </div>
                  </div>

                  {/* 🔧 UPDATED: Desktop Content with Real Data */}
                  <div onClick={() => navigate('/progress')} className="hidden lg:block space-y-6 cursor-pointer">
                    <div className="bg-zinc-900 rounded-2xl p-6 shadow-md hover:scale-[1.02] transition-transform">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold kanit-medium">Today's Progress</h3>
                        {statsLoading && (
                          <div className="w-5 h-5 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                        )}
                      </div>
                      
                      {/* Active Workout Progress */}
                      {activeWorkout && (
                        <div className="mb-4 p-3 bg-zinc-800 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">Current Workout</span>
                            <span className="text-sm text-lime-500 font-semibold">
                              {todayStats.completedExercises}/{todayStats.totalExercises}
                            </span>
                          </div>
                          <p className="text-sm text-white mb-2 truncate">{activeWorkout.title}</p>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-lime-500 h-2 rounded-full transition-all duration-300" 
                              style={{ 
                                width: `${todayStats.totalExercises > 0 ? (todayStats.completedExercises / todayStats.totalExercises) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400 kanit-regular">Calories Burned</span>
                          <span className="text-lime-500 font-semibold kanit-medium">
                            {todayStats.caloriesBurned.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 kanit-regular">Steps</span>
                          <span className="text-lime-500 font-semibold kanit-medium">
                            {todayStats.steps.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 kanit-regular">Active Minutes</span>
                          <span className="text-lime-500 font-semibold kanit-medium">
                            {todayStats.activeMinutes}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-900 rounded-2xl p-6 shadow-md hover:scale-[1.02] transition-transform">
                      <h3 className="text-lg font-bold kanit-medium mb-4">Up Next</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-lime-500 rounded-lg flex-shrink-0"></div>
                          <div>
                            <p className="font-medium kanit-medium">Upper Body</p>
                            <p className="text-sm text-gray-400 kanit-light">Tomorrow 9:00 AM</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex-shrink-0"></div>
                          <div>
                            <p className="font-medium kanit-medium">Cardio</p>
                            <p className="text-sm text-gray-400 kanit-light">Wed 7:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Up Next */}
                  <div className="lg:hidden mb-10">
                    <h3 className="text-base font-bold kanit-medium mb-3">Up Next</h3>
                    <div className="space-y-2">
                      <div className="bg-zinc-900 rounded-xl p-3 flex items-center space-x-3 shadow-md">
                        <div className="w-8 h-8 bg-lime-500 rounded-md flex-shrink-0"></div>
                        <div>
                          <p className="font-medium kanit-medium text-sm">Upper Body</p>
                          <p className="text-xs text-gray-400 kanit-light">Tomorrow 9:00 AM</p>
                        </div>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-3 flex items-center space-x-3 shadow-md">
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex-shrink-0"></div>
                        <div>
                          <p className="font-medium kanit-medium text-sm">Cardio</p>
                          <p className="text-xs text-gray-400 kanit-light">Wed 7:00 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-black">
        <BottomNav />
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;