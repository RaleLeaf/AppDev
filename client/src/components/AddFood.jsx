import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const AddFood = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  // Popular food items
  const popularFoods = [
    {
      name: "Grilled Chicken Breast",
      serving: "100g",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6
    },
    {
      name: "Brown Rice",
      serving: "1 cup cooked",
      calories: 215,
      protein: 5,
      carbs: 45,
      fat: 1.8
    },
    {
      name: "Broccoli",
      serving: "1 cup",
      calories: 55,
      protein: 3.7,
      carbs: 11,
      fat: 0.6
    },
    {
      name: "Sweet Potato",
      serving: "1 medium",
      calories: 112,
      protein: 2,
      carbs: 26,
      fat: 0.1
    },
    {
      name: "Salmon Fillet",
      serving: "100g",
      calories: 206,
      protein: 22,
      carbs: 0,
      fat: 13
    },
    {
      name: "Greek Yogurt",
      serving: "1 cup",
      calories: 130,
      protein: 17,
      carbs: 9,
      fat: 1.2
    }
  ];

  // Recent food entries
  const recentFoods = [
    {
      name: "Protein Shake",
      serving: "1 scoop",
      calories: 120,
      protein: 24,
      carbs: 3,
      fat: 1.5
    },
    {
      name: "Avocado Toast",
      serving: "1 slice",
      calories: 190,
      protein: 5,
      carbs: 15,
      fat: 12
    },
    {
      name: "Banana",
      serving: "1 medium",
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.4
    }
  ];

  const filteredPopular = searchTerm ? 
    popularFoods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase())) : 
    popularFoods;

  const filteredRecent = searchTerm ? 
    recentFoods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase())) : 
    recentFoods;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SideNav - Only visible on medium screens and up */}
      <SideNav />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Header with back button */}
          <div className="p-5 flex items-center">
            <button className="p-2" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">ADD FOOD</h1>
          </div>

          {/* Search input */}
          <div className="px-5 mb-6">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 rounded-xl pl-10 pr-4 py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Meal selector */}
          <div className="px-5 mb-6">
            <h2 className="text-sm font-medium kanit-medium mb-2">SELECT MEAL</h2>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                <button 
                  key={meal}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedMeal === meal ? 'bg-lime-500 text-black' : 'bg-zinc-800 text-white'
                  }`}
                  onClick={() => setSelectedMeal(meal)}
                >
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Recent foods */}
          {recentFoods.length > 0 && !searchTerm && (
            <div className="px-5 mb-6">
              <h2 className="text-lg font-bold kanit-medium mb-3">Recent</h2>
              <div className="space-y-2">
                {recentFoods.map((food, index) => (
                  <FoodItem key={index} food={food} />
                ))}
              </div>
            </div>
          )}

          {/* Popular foods or search results */}
          <div className="px-5 mb-20">
            <h2 className="text-lg font-bold kanit-medium mb-3">
              {searchTerm ? 'Results' : 'Popular Foods'}
            </h2>
            
            {filteredPopular.length > 0 ? (
              <div className="space-y-2">
                {filteredPopular.map((food, index) => (
                  <FoodItem key={index} food={food} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No foods found matching your search</p>
                <button 
                  className="mt-3 text-lime-500 underline"
                  onClick={() => navigate('/create-food')}
                >
                  Create new food
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation - Only visible on mobile and small tablets */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>
    </div>
  );
};

// Food item component
const FoodItem = ({ food }) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 flex justify-between items-center hover:bg-zinc-800 transition-colors cursor-pointer">
      <div className="flex-1">
        <h3 className="font-medium kanit-medium">{food.name}</h3>
        <p className="text-xs text-gray-400">{food.serving}</p>
      </div>
      <div className="text-right">
        <p className="text-lime-500 font-bold">{food.calories} cal</p>
        <div className="flex space-x-3 text-xs text-gray-400">
          <span>P: {food.protein}g</span>
          <span>C: {food.carbs}g</span>
          <span>F: {food.fat}g</span>
        </div>
      </div>
      <button className="ml-3 p-2 text-lime-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default AddFood;