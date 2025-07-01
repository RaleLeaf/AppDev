import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const HomePage = () => {
  const navigate = useNavigate();

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
    // Fixed the full-height background issue by adding min-h-screen and bg-black to multiple containers
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold kanit-bold mb-1">HELLO SARAH,</h1>
              <div className="flex justify-between items-center">
                <p className="text-gray-300 kanit-light text-sm sm:text-base lg:text-lg">Good morning.</p>
                <p className="text-lime-500 kanit-regular text-xs sm:text-sm lg:text-base">Mon 26 Apr</p>
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
                  {/* Current Workout Card - IMPROVED FOR MOBILE */}
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
                    
                    {/* Category Pills - Responsive layout with touch scrolling */}
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

                  {/* Featured Workout - IMPROVED FOR MOBILE */}
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

                {/* Right Column - Sidebar content on desktop, shown differently on mobile */}
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
                    
                    {/* Leaderboard Preview - IMPROVED FOR MOBILE */}
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

                  {/* Mobile Quick Stats - Improved layout */}
                  <div className="lg:hidden bg-zinc-900 rounded-xl p-4 mb-6 shadow-md">
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

                  {/* Additional Desktop Content */}
                  <div className="hidden lg:block space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-zinc-900 rounded-2xl p-6 shadow-md">
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
                    <div className="bg-zinc-900 rounded-2xl p-6 shadow-md">
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

                  {/* Mobile Up Next (improved) */}
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
      
      {/* Bottom Navigation - Only visible on mobile and small tablets */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-black">
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