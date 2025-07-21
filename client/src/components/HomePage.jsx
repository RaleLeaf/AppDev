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

  // Sample categories array
  const categories = [
    { name: "Beginner", active: true },
    { name: "Intermediate", active: false },
    { name: "Advance", active: false },
  ];

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

            {/* Rest of your existing JSX remains the same */}
            {/* Main Content Area */}
            <div className="flex-1 px-4 sm:px-5 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                
                {/* Left Column - Main Content */}
                <div className="lg:col-span-8">
                  {/* Current Workout Card */}
                  <div 
                    className="bg-zinc-900 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden mb-4 sm:mb-6 lg:mb-8 relative group cursor-pointer transition-transform hover:scale-[1.02] shadow-md"
                    onClick={() => navigate('/exercises')}
                  >
                    <div className="aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/9] w-full relative">
                      <img 
                        src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Day 01 - Warm Up"
                        className="absolute w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 p-3 sm:p-4 lg:p-6 w-full bg-gradient-to-t from-black/90 to-transparent">
                      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold kanit-medium">Day 01 - Warm Up</h2>
                      <p className="text-lime-500 kanit-regular text-xs sm:text-sm lg:text-base">| 07:00 - 08:00 AM</p>
                    </div>
                  </div>

                  {/* Workout Categories Section */}
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
                    
                    {/* Category Pills */}
                    <div className="flex flex-nowrap overflow-x-auto lg:flex-wrap lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide gap-2 -mx-1 px-1">
                      {categories.map((category, index) => (
                        <button 
                          key={index}
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

                  {/* Featured Workout */}
                  <div 
                    className="bg-zinc-900 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden mb-5 sm:mb-6 lg:mb-8 relative group cursor-pointer transition-transform hover:scale-[1.02] shadow-md"
                    onClick={() => navigate('/workout-categories')}
                  >
                    <div className="aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/9] w-full relative">
                      <img 
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Learn the Basic of Training"
                        className="absolute w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 p-3 sm:p-4 lg:p-6 w-full bg-gradient-to-t from-black/90 to-transparent">
                      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold kanit-medium">Learn the Basic of Training</h2>
                      <p className="text-lime-500 kanit-regular text-xs sm:text-sm lg:text-base">| 06 Workouts for Beginner</p>
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

                  {/* Mobile Quick Stats */}
                  <div onClick={() => navigate('/progress')} className="lg:hidden bg-zinc-900 rounded-xl p-4 mb-6 shadow-md z-50">
                    <h3 className="text-base font-bold kanit-medium mb-3">This Week</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex flex-col items-center bg-zinc-800 rounded-lg p-2">
                        <span className="text-gray-400 text-xs">Workouts</span>
                        <span className="text-lime-500 font-semibold kanit-medium">4/5</span>
                      </div>
                      <div className="flex flex-col items-center bg-zinc-800 rounded-lg p-2">
                        <span className="text-gray-400 text-xs">Calories</span>
                        <span className="text-lime-500 font-semibold kanit-medium">1,240</span>
                      </div>
                      <div className="flex flex-col items-center bg-zinc-800 rounded-lg p-2">
                        <span className="text-gray-400 text-xs">Minutes</span>
                        <span className="text-lime-500 font-semibold kanit-medium">180</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Content */}
                  <div onClick={() => navigate('/progress')} className="hidden lg:block space-y-6">
                    <div className="bg-zinc-900 rounded-2xl p-6 shadow-md hover:scale-[1.02]">
                      <h3 className="text-lg font-bold kanit-medium mb-4">This Week</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400 kanit-regular">Workouts</span>
                          <span className="text-lime-500 font-semibold kanit-medium">4/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 kanit-regular">Calories</span>
                          <span className="text-lime-500 font-semibold kanit-medium">1,240</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 kanit-regular">Minutes</span>
                          <span className="text-lime-500 font-semibold kanit-medium">180</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-900 rounded-2xl p-6 shadow-md hover:scale-[1.02]">
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