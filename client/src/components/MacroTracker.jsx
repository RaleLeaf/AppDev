import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const MacroTracker = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  
  // Daily macro data
  const macroData = {
    calories: {
      consumed: 1450,
      goal: 2000,
      percentage: 72.5
    },
    protein: {
      consumed: 95,
      goal: 140,
      percentage: 67.9
    },
    carbs: {
      consumed: 168,
      goal: 240,
      percentage: 70
    },
    fat: {
      consumed: 42,
      goal: 65,
      percentage: 64.6
    }
  };

  // Recent food entries
  const foodEntries = [
    {
      name: "Grilled Chicken Salad",
      time: "12:30 PM",
      calories: 320,
      protein: 28,
      carbs: 12,
      fat: 18
    },
    {
      name: "Protein Shake",
      time: "9:45 AM",
      calories: 180,
      protein: 24,
      carbs: 8,
      fat: 3
    },
    {
      name: "Oatmeal with Berries",
      time: "7:30 AM",
      calories: 290,
      protein: 8,
      carbs: 58,
      fat: 4
    },
    {
      name: "Greek Yogurt",
      time: "4:15 PM",
      calories: 140,
      protein: 15,
      carbs: 8,
      fat: 4
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SideNav - Only visible on medium screens and up */}
      <SideNav />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        {/* Content Container - Centered properly for all screen sizes */}
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Header with back button on mobile and title */}
          <div className="p-5 flex items-center">
            <button className="p-2 md:hidden" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl md:text-3xl font-bold kanit-bold mx-auto md:mx-0 pr-8 md:pr-0">MACRO TRACKER</h1>
          </div>

          {/* Tabs for time navigation */}
          <div className="px-5 mb-6">
            <div className="bg-zinc-900 rounded-full p-1 flex">
              <button 
                className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'today' ? 'bg-lime-500 text-black' : 'text-white'}`} 
                onClick={() => setActiveTab('today')}
              >
                Today
              </button>
              <button 
                className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'week' ? 'bg-lime-500 text-black' : 'text-white'}`} 
                onClick={() => setActiveTab('week')}
              >
                This Week
              </button>
              <button 
                className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'month' ? 'bg-lime-500 text-black' : 'text-white'}`} 
                onClick={() => setActiveTab('month')}
              >
                This Month
              </button>
            </div>
          </div>

          {/* Macro Summary */}
          <div className="px-5 mb-8">
            <div className="bg-zinc-900 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold kanit-medium">Daily Targets</h2>
                <span className="text-lime-500 text-sm kanit-regular">{macroData.calories.consumed} / {macroData.calories.goal} cal</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Calories */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 mb-2">
                    <CircularProgressbarWithChildren
                      value={macroData.calories.percentage}
                      styles={buildStyles({
                        pathColor: "#84cc16",
                        trailColor: "#333333",
                        strokeLinecap: "round"
                      })}
                    >
                      <div className="text-center">
                        <p className="text-xl font-bold">{macroData.calories.percentage}%</p>
                        <p className="text-xs text-gray-400">Calories</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>
                
                {/* Protein */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 mb-2">
                    <CircularProgressbarWithChildren
                      value={macroData.protein.percentage}
                      styles={buildStyles({
                        pathColor: "#ef4444",
                        trailColor: "#333333",
                        strokeLinecap: "round"
                      })}
                    >
                      <div className="text-center">
                        <p className="text-xl font-bold">{macroData.protein.percentage}%</p>
                        <p className="text-xs text-gray-400">Protein</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm kanit-light">{macroData.protein.consumed}g / {macroData.protein.goal}g</p>
                </div>
                
                {/* Carbs */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 mb-2">
                    <CircularProgressbarWithChildren
                      value={macroData.carbs.percentage}
                      styles={buildStyles({
                        pathColor: "#3b82f6",
                        trailColor: "#333333",
                        strokeLinecap: "round"
                      })}
                    >
                      <div className="text-center">
                        <p className="text-xl font-bold">{macroData.carbs.percentage}%</p>
                        <p className="text-xs text-gray-400">Carbs</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm kanit-light">{macroData.carbs.consumed}g / {macroData.carbs.goal}g</p>
                </div>
                
                {/* Fat */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 mb-2">
                    <CircularProgressbarWithChildren
                      value={macroData.fat.percentage}
                      styles={buildStyles({
                        pathColor: "#eab308",
                        trailColor: "#333333",
                        strokeLinecap: "round"
                      })}
                    >
                      <div className="text-center">
                        <p className="text-xl font-bold">{macroData.fat.percentage}%</p>
                        <p className="text-xs text-gray-400">Fat</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm kanit-light">{macroData.fat.consumed}g / {macroData.fat.goal}g</p>
                </div>
              </div>
            </div>
          </div>

          {/* Food Log Section */}
          <div className="px-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold kanit-medium">Food Log</h2>
              <button 
                className="flex items-center text-lime-500 kanit-regular"
                onClick={() => navigate('/add-food')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Food
              </button>
            </div>
            
            {/* Food Entries */}
            <div className="space-y-3 mb-24">
              {foodEntries.map((food, index) => (
                <div key={index} className="bg-zinc-900 rounded-xl p-4 flex justify-between hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div>
                    <h3 className="font-medium kanit-medium">{food.name}</h3>
                    <p className="text-xs text-gray-400">{food.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lime-500 font-bold">{food.calories} cal</p>
                    <div className="flex space-x-3 text-xs text-gray-400">
                      <span>P: {food.protein}g</span>
                      <span>C: {food.carbs}g</span>
                      <span>F: {food.fat}g</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Only visible on mobile and small tablets */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black z-20">
        <BottomNav />
      </div>
    </div>
  );
};

export default MacroTracker;