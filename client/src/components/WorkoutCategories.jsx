import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const WorkoutCategories = () => {
  const navigate = useNavigate();

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
        <SideNav />

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
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default WorkoutCategories;