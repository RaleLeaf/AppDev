import React from 'react';

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
          <a href="#" className="text-lime-500 text-sm kanit-regular">See All</a>
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
          <a href="#" className="text-lime-500 text-sm kanit-regular">See All</a>
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
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 flex justify-around items-center h-14">
        {/* Home Icon */}
        <button className="flex flex-col items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        
        {/* Stats/Leaderboard Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        
        {/* Clipboard/Workouts Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
        
        {/* Bell/Notification Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600 relative">
          <div className="absolute top-0 right-0 h-2 w-2 bg-lime-500 rounded-full"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        {/* Profile Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;