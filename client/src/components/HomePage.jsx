import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from './BottonNav';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sample categories array to demonstrate scrolling
  const categories = [
    { name: "Beginner", active: true },
    { name: "Intermediate", active: false },
    { name: "Advance", active: false },
    { name: "HIIT", active: false },
    { name: "Cardio", active: false },
    { name: "Strength", active: false },
    { name: "Mobility", active: false }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop Sidebar Navigation */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-black md:border-r md:border-zinc-800 md:p-6 md:z-50">
        <h1 className="text-2xl font-bold mb-10 kanit-medium">baSICK</h1>
        
        <nav className="flex-1">
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/home')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                location.pathname === '/home' 
                  ? 'bg-zinc-900 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="kanit-medium">Home</span>
            </button>
            
            <button 
              onClick={() => navigate('/leaderboard')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                location.pathname === '/leaderboard' 
                  ? 'bg-zinc-900 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="kanit-medium">Statistics</span>
            </button>
            
            <button 
              onClick={() => navigate('/workout-categories')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                location.pathname === '/workout-categories' 
                  ? 'bg-zinc-900 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="kanit-medium">Workouts</span>
            </button>
          </div>
          
          <div className="mt-auto pt-20">
            <button 
              onClick={() => navigate('/profile')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                location.pathname === '/profile' 
                  ? 'bg-zinc-900 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="kanit-medium relative">
                Profile
                <span className="absolute top-0 right-0 h-2 w-2 bg-lime-500 rounded-full"></span>
              </span>
            </button>
            
            <button 
              onClick={() => navigate('/settings')}
              className={`flex items-center w-full p-3 rounded-lg group mt-2 ${
                location.pathname === '/settings' 
                  ? 'bg-zinc-900 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="kanit-medium">Settings</span>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main Content - Responsive layout */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Header with Greeting */}
        <div className="p-5 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold kanit-bold mb-1">HELLO SARAH,</h1>
            <div className="flex justify-between items-center">
              <p className="text-gray-300 kanit-light text-base lg:text-lg">Good morning.</p>
              <p className="text-lime-500 kanit-regular text-sm lg:text-base">Mon 26 Apr</p>
            </div>
            
            {/* Fitness Helper Notice */}
            <div className="mt-5 lg:mt-8 mb-4 lg:mb-6">
              <p className="text-white kanit-regular text-base lg:text-lg max-w-2xl">
                Ask Fitness Helper to have your own customized Fitness Programs!
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Grid Layout for larger screens */}
        <div className="flex-1 px-5 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              
              {/* Left Column - Main Content */}
              <div className="lg:col-span-8">
                {/* Current Workout Card */}
                <div className="rounded-xl lg:rounded-2xl overflow-hidden mb-6 lg:mb-8 relative group cursor-pointer transition-transform hover:scale-[1.02]">
                  <img 
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Day 01 - Warm Up"
                    className="w-full h-36 lg:h-48 xl:h-56 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-4 lg:p-6 w-full bg-gradient-to-t from-black/90 to-transparent">
                    <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold kanit-medium">Day 01 - Warm Up</h2>
                    <p className="text-lime-500 kanit-regular text-sm lg:text-base">| 07:00 - 08:00 AM</p>
                  </div>
                </div>

                {/* Workout Categories Section */}
                <div className="mb-6 lg:mb-8">
                  <div className="flex justify-between items-center mb-3 lg:mb-4">
                    <h2 className="text-lg lg:text-xl xl:text-2xl font-bold kanit-medium">Workout Categories</h2>
                    <button 
                      onClick={() => navigate('/workout-categories')}
                      className="text-lime-500 kanit-regular text-sm lg:text-base hover:underline transition-colors"
                    >
                      See All
                    </button>
                  </div>
                  
                  {/* Category Pills - Responsive layout */}
                  <div className="flex overflow-x-auto lg:flex-wrap lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide space-x-2 lg:gap-2 lg:space-x-0">
                    {categories.map((category, index) => (
                      <button 
                        key={index}
                        className={`px-4 lg:px-6 py-1.5 lg:py-2 rounded-full ${
                          category.active 
                            ? 'bg-lime-500 text-black' 
                            : 'bg-zinc-800 text-white hover:bg-zinc-700'
                        } kanit-regular text-sm lg:text-base whitespace-nowrap flex-shrink-0 lg:flex-shrink transition-colors`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured Workout */}
                <div className="rounded-xl lg:rounded-2xl overflow-hidden mb-6 lg:mb-8 relative group cursor-pointer transition-transform hover:scale-[1.02]">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Learn the Basic of Training"
                    className="w-full h-40 lg:h-52 xl:h-60 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-4 lg:p-6 w-full bg-gradient-to-t from-black/90 to-transparent">
                    <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold kanit-medium">Learn the Basic of Training</h2>
                    <p className="text-lime-500 kanit-regular text-sm lg:text-base">| 06 Workouts for Beginner</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar content on desktop */}
              <div className="lg:col-span-4">
                {/* Leaderboard Section */}
                <div className="mb-20 lg:mb-8">
                  <div className="flex justify-between items-center mb-3 lg:mb-4">
                    <h2 className="text-lg lg:text-xl xl:text-2xl font-bold kanit-medium">Show Leaderboard</h2>
                    <button 
                      onClick={() => navigate('/leaderboard')}
                      className="text-lime-500 kanit-regular text-sm lg:text-base hover:underline transition-colors"
                    >
                      See All
                    </button>
                  </div>
                  
                  {/* Leaderboard Preview */}
                  <div className="rounded-xl lg:rounded-2xl overflow-hidden h-20 lg:h-32 xl:h-40 relative group cursor-pointer transition-transform hover:scale-[1.02]">
                    <img 
                      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="Leaderboard"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Additional Desktop Content */}
                <div className="hidden lg:block space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-zinc-900 rounded-2xl p-6">
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

                  {/* Upcoming */}
                  <div className="bg-zinc-900 rounded-2xl p-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <div className="md:hidden">
        <BottomNav />
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
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