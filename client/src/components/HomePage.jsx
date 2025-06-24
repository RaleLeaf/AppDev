import React from 'react';
import BottomNav from './BottonNav';

const HomePage = () => {
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
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with Greeting */}
      <div className="p-5">
        <h1 className="text-3xl font-bold kanit-bold mb-1">HELLO SARAH,</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-300 kanit-light">Good morning.</p>
          <p className="text-lime-500 text-sm kanit-regular">Mon 26 Apr</p>
        </div>
        
        {/* Fitness Helper Notice */}
        <div className="mt-5 mb-4">
          <p className="text-white kanit-regular">
            Ask Fitness Helper to have your own customized Fitness Programs!
          </p>
        </div>
        
        {/* Current Workout Card */}
        <div className="rounded-xl overflow-hidden mb-6 relative">
          <img 
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Day 01 - Warm Up"
            className="w-full h-36 object-cover"
          />
          <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/90 to-transparent">
            <h2 className="text-xl font-bold kanit-medium">Day 01 - Warm Up</h2>
            <p className="text-lime-500 text-sm kanit-regular">| 07:00 - 08:00 AM</p>
          </div>
        </div>
      </div>
      
      {/* Workout Categories Section */}
      <div className="px-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold kanit-medium">Workout Categories</h2>
          <a href="/workout-categories" className="text-lime-500 text-sm kanit-regular">See All</a>
        </div>
        
        {/* Category Pills - Made scrollable */}
        <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-2">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-4 py-1.5 rounded-full ${category.active ? 'bg-lime-500 text-black' : 'bg-zinc-800 text-white'} text-sm whitespace-nowrap kanit-regular flex-shrink-0`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Featured Workout */}
        <div className="rounded-xl overflow-hidden mb-6 mt-4 relative">
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Learn the Basic of Training"
            className="w-full h-40 object-cover"
          />
          <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/90 to-transparent">
            <h2 className="text-xl font-bold kanit-medium">Learn the Basic of Training</h2>
            <p className="text-lime-500 text-sm kanit-regular">| 06 Workouts for Beginner</p>
          </div>
        </div>
      </div>
      
      {/* Leaderboard Section */}
      <div className="px-5 mb-20">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold kanit-medium">Show Leaderboard</h2>
          <a href="/leaderboard" className="text-lime-500 text-sm kanit-regular">See All</a>
        </div>
        
        {/* Leaderboard Preview */}
        <div className="rounded-xl overflow-hidden h-20 relative">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Leaderboard"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;