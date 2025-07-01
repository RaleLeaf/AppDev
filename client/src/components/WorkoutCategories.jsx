import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from './BottonNav';

const WorkoutCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if current route is active
  const isActive = (path) => location.pathname === path;

  // Workout card data
  const workouts = [
    {
      title: "Wake Up Call",
      count: "04",
      frequency: "2x - 3x a Week",
      image: "https://images.unsplash.com/photo-1518609571773-39b7d303a87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPro: false
    },
    {
      title: "Full Body Goal Crusher",
      count: "07",
      frequency: "2x - 3x a Week",
      image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPro: true
    },
    {
      title: "Lower Body Strength",
      count: "05",
      frequency: "2x - 3x a Week",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPro: true
    },
    {
      title: "Upper Body Focus",
      count: "06",
      frequency: "2x - 3x a Week",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPro: false
    },
    {
      title: "Core Crusher",
      count: "03",
      frequency: "2x - 3x a Week",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPro: true
    },
    {
      title: "Cardio Blast",
      count: "04",
      frequency: "2x - 3x a Week",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPro: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-col md:flex-row md:min-h-screen">
        {/* Sidebar Navigation for desktop */}
        <div className="hidden md:flex md:flex-col md:w-64 md:border-r border-zinc-800 md:p-6">
          <h1 className="text-2xl font-bold mb-10 kanit-medium">baSICK</h1>

          <nav className="flex-1">
            <div className="space-y-2">
              <button
                onClick={() => navigate('/home')}
                className={`flex items-center w-full p-3 rounded-lg group ${isActive('/home')
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
              onClick={() => navigate('/progress')}
              className={`flex items-center w-full p-3 rounded-lg group ${isActive('/progress') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="kanit-medium">Progress</span>
            </button>

              <button
                onClick={() => navigate('/feed')}
                className={`flex items-center w-full p-3 rounded-lg group ${isActive('/feed') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="kanit-medium">Feed</span>
              </button>
            </div>

            <div className="mt-auto pt-20">
              <button
                onClick={() => navigate('/profile')}
                className={`flex items-center w-full p-3 rounded-lg group ${isActive('/profile')
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
                className={`flex items-center w-full p-3 rounded-lg group mt-2 ${isActive('/settings')
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <div className="p-4 sm:p-6 pt-8 md:pt-10 md:px-10">
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 kanit-medium md:text-left md:text-3xl">Workout Categories</h1>

            {/* Category Tabs */}
            <div className="flex justify-start sm:justify-center md:justify-start gap-2 mb-6 overflow-x-auto pb-2">
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-lime-500 text-black text-xs sm:text-sm whitespace-nowrap kanit-regular flex-shrink-0 hover:bg-lime-400 transition-colors">
                2x - 3x a Week
              </button>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-800 text-white text-xs sm:text-sm whitespace-nowrap kanit-regular flex-shrink-0 hover:bg-zinc-700 transition-colors">
                3x - 4x a Week
              </button>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-800 text-white text-xs sm:text-sm whitespace-nowrap kanit-regular flex-shrink-0 hover:bg-zinc-700 transition-colors">
                5x - 6x a Week
              </button>
            </div>
          </div>

          {/* Workout Cards - Horizontally scrollable on mobile, grid on desktop */}
          <div className="flex-1 px-4 pb-20 md:p-10 md:pt-0 md:pb-10">
            {/* Mobile view - scrollable */}
            <div className="md:hidden flex flex-col overflow-y-auto space-y-4 max-h-[calc(100vh-220px)]">
              {workouts.map((workout, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden relative shadow-lg flex-shrink-0 transition-transform hover:scale-[1.02] cursor-pointer"
                  onClick={() => navigate('/exercises')}
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
                    <p className="text-lime-500 text-xs sm:text-sm kanit-regular">| {workout.count} Workouts for {workout.frequency}</p>
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
                  onClick={() => navigate('/exercises')}
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
                    <p className="text-lime-500 text-base kanit-regular">| {workout.count} Workouts for {workout.frequency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default WorkoutCategories;