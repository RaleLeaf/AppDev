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
    <div className="min-h-screen bg-black text-white flex">
      {/* SideNav - Only visible on medium screens and up */}
      <SideNav />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        {/* Content Container - Centered properly for all screen sizes */}
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Header with Greeting */}
          <div className="p-5 lg:p-8">
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

          {/* Desktop Grid Layout for larger screens */}
          <div className="flex-1 px-5 lg:px-8">
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
                <div className="mb-6 lg:mb-8">
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
                  <div 
                    onClick={() => navigate('/leaderboard')}
                    className="rounded-xl lg:rounded-2xl overflow-hidden h-20 lg:h-32 xl:h-40 relative group cursor-pointer transition-transform hover:scale-[1.02]"
                  >
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
      
      {/* Bottom Navigation - Only visible on mobile and small tablets */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
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