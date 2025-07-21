import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BottomNav from './BottonNav';
import SideNav from './SideNav';
import useAuthStore from '../store/authStore';

const MacroTracker = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('today');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // UPDATED: State for macro data with proper weekly/monthly tracking
  const [macroData, setMacroData] = useState({
    calories: { consumed: 0, goal: 2000, percentage: 0, weeklyGoal: 14000, monthlyGoal: 60000 },
    protein: { consumed: 0, goal: 140, percentage: 0, weeklyGoal: 980, monthlyGoal: 4200 },
    carbs: { consumed: 0, goal: 240, percentage: 0, weeklyGoal: 1680, monthlyGoal: 7200 },
    fat: { consumed: 0, goal: 65, percentage: 0, weeklyGoal: 455, monthlyGoal: 1950 }
  });
  
  // State for food entries from backend
  const [foodEntries, setFoodEntries] = useState([]);
  const [userMacroTracker, setUserMacroTracker] = useState(null);

  // Get auth token
  const getAuthToken = () => {
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('userToken') || 
                  localStorage.getItem('gmToken') || 
                  user?.accessToken;
    return token;
  };

  // UPDATED: Fetch user's macro tracker settings - FIX FATS FIELD
  const fetchUserMacroTracker = async () => {
    const authToken = getAuthToken();
    if (!authToken || !user?.uid) {
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`http://localhost:8080/api/user-macro-trackers/user/${user.uid}/date/${today}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Macro tracker data:', data); // DEBUG: Check what backend returns
        setUserMacroTracker(data);
        
        // Update macro goals based on user settings with weekly/monthly calculations
        const dailyCalories = data.dailyCalorieGoal || 2000;
        const dailyProtein = data.dailyProteinGoal || 140;
        const dailyCarbs = data.dailyCarbsGoal || 240;
        const dailyFat = data.dailyFatsGoal || data.dailyFatGoal || 65; // FIXED: Handle both possible field names
        
        setMacroData(prev => ({
          calories: { 
            ...prev.calories, 
            goal: dailyCalories,
            weeklyGoal: dailyCalories * 7,
            monthlyGoal: dailyCalories * 30
          },
          protein: { 
            ...prev.protein, 
            goal: dailyProtein,
            weeklyGoal: dailyProtein * 7,
            monthlyGoal: dailyProtein * 30
          },
          carbs: { 
            ...prev.carbs, 
            goal: dailyCarbs,
            weeklyGoal: dailyCarbs * 7,
            monthlyGoal: dailyCarbs * 30
          },
          fat: { 
            ...prev.fat, 
            goal: dailyFat,
            weeklyGoal: dailyFat * 7,
            monthlyGoal: dailyFat * 30
          }
        }));
      }
    } catch (error) {
      // Try to create a default macro tracker for today
      try {
        await createDefaultMacroTracker();
      } catch (createError) {
        // Silent fail
      }
    }
  };

  // UPDATED: Create default macro tracker for user
  const createDefaultMacroTracker = async () => {
    const authToken = getAuthToken();
    if (!authToken || !user?.uid) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const defaultTracker = {
        userId: user.uid,
        date: today,
        dailyCalorieGoal: 2000,
        dailyProteinGoal: 140,
        dailyCarbsGoal: 240,
        dailyFatsGoal: 65,
        dailyFiberGoal: 25,
        dailySugarGoal: 50,
        dailySodiumGoal: 2300,
        waterGoal: 2000,
        isIntermittentFasting: false,
        fastingHours: 16
      };

      await fetch('http://localhost:8080/api/user-macro-trackers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultTracker)
      });
    } catch (error) {
      // Silent fail
    }
  };

  // UPDATED: Fetch user's food logs with proper date filtering - FIX FATS FIELD
  const fetchUserFoodLogs = async (timeframe = 'today') => {
  const authToken = getAuthToken();
  if (!authToken || !user?.uid) {
    return;
  }

  try {
    setLoading(true);
    
    let foodLogs = [];
    
    // Build proper date filters using existing endpoints
    switch (timeframe) {
      case 'today':
        const todayStr = new Date().toISOString().split('T')[0];
        const todayEndpoint = `http://localhost:8080/api/food-logs/user/${user.uid}/date/${todayStr}`;
        
        const todayResponse = await fetch(todayEndpoint, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (todayResponse.ok) {
          foodLogs = await todayResponse.json();
        }
        break;
        
      case 'week':
        // Get last 7 days by calling the date endpoint for each day
        const weekPromises = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          weekPromises.push(
            fetch(`http://localhost:8080/api/food-logs/user/${user.uid}/date/${dateStr}`, {
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            }).then(response => response.ok ? response.json() : [])
          );
        }
        
        const weekResults = await Promise.all(weekPromises);
        foodLogs = weekResults.flat(); // Combine all days
        break;
        
      case 'month':
        // Get last 30 days by calling the date endpoint for each day
        const monthPromises = [];
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          monthPromises.push(
            fetch(`http://localhost:8080/api/food-logs/user/${user.uid}/date/${dateStr}`, {
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            }).then(response => response.ok ? response.json() : [])
          );
        }
        
        const monthResults = await Promise.all(monthPromises);
        foodLogs = monthResults.flat(); // Combine all days
        break;
        
      default:
        // Fallback to getting all user logs with limit
        const allEndpoint = `http://localhost:8080/api/food-logs/user/${user.uid}`;
        const allResponse = await fetch(allEndpoint, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (allResponse.ok) {
          foodLogs = await allResponse.json();
        }
        break;
    }

    console.log('Food logs from backend:', foodLogs); // DEBUG: Check what backend returns
    
    // Convert backend UserFoodLogDTO to frontend format - FIX FATS FIELD
    const convertedEntries = foodLogs.map(log => {
      console.log('Individual log:', log); // DEBUG: Check individual log structure
      return {
        id: log.id,
        name: log.foodName,
        brand: log.brand,
        time: new Date(log.consumedAt).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        }),
        date: new Date(log.consumedAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        mealType: log.mealType,
        calories: Math.round(log.calories || 0),
        protein: Math.round(log.protein || 0),
        carbs: Math.round(log.carbs || 0),
        fat: Math.round(log.fats || log.fat || 0), // FIXED: Try both fats and fat fields
        quantity: log.quantity,
        unit: log.unit,
        consumedAt: log.consumedAt,
        isHomemade: log.isHomemade || false
      };
    });

    // Sort by most recent first
    convertedEntries.sort((a, b) => new Date(b.consumedAt) - new Date(a.consumedAt));

    console.log('Converted entries:', convertedEntries); // DEBUG: Check converted data

    setFoodEntries(convertedEntries);
    
    // Calculate totals for macro data
    const totals = convertedEntries.reduce((acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    console.log('Calculated totals:', totals); // DEBUG: Check totals

    // UPDATED: Update macro data with calculated totals based on timeframe
    setMacroData(prev => {
      const getGoalForTimeframe = (macroType) => {
        switch (timeframe) {
          case 'week':
            return prev[macroType].weeklyGoal;
          case 'month':
            return prev[macroType].monthlyGoal;
          default:
            return prev[macroType].goal;
        }
      };

      return {
        calories: {
          ...prev.calories,
          consumed: totals.calories,
          percentage: Math.min((totals.calories / getGoalForTimeframe('calories')) * 100, 100)
        },
        protein: {
          ...prev.protein,
          consumed: totals.protein,
          percentage: Math.min((totals.protein / getGoalForTimeframe('protein')) * 100, 100)
        },
        carbs: {
          ...prev.carbs,
          consumed: totals.carbs,
          percentage: Math.min((totals.carbs / getGoalForTimeframe('carbs')) * 100, 100)
        },
        fat: {
          ...prev.fat,
          consumed: totals.fat,
          percentage: Math.min((totals.fat / getGoalForTimeframe('fat')) * 100, 100)
        }
      };
    });
    
  } catch (error) {
    console.error('Error loading food logs:', error);
    setError(`Error loading food logs: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  // Delete a food log entry
  const deleteFoodEntry = async (entryId) => {
    const authToken = getAuthToken();
    if (!authToken) {
      setError('Authentication required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/food-logs/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok || response.status === 204) {
        // Refresh the food logs
        await fetchUserFoodLogs(activeTab);
      } else {
        setError('Failed to delete food entry');
      }
    } catch (error) {
      setError('Error deleting food entry');
    }
  };

  // UPDATED: Handle tab change
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    fetchUserFoodLogs(newTab);
  };

  // UPDATED: Get current goal based on timeframe
  const getCurrentGoal = (macroType) => {
    switch (activeTab) {
      case 'week':
        return macroData[macroType].weeklyGoal;
      case 'month':
        return macroData[macroType].monthlyGoal;
      default:
        return macroData[macroType].goal;
    }
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      
      try {
        await Promise.all([
          fetchUserMacroTracker(),
          fetchUserFoodLogs(activeTab)
        ]);
      } catch (error) {
        setError('Failed to load data');
      }
    };

    loadData();
  }, [user?.uid]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <p>Loading your macro data...</p>
        </div>
      </div>
    );
  }

  // Show error state if user is not logged in
  if (!user?.uid) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Please log in to view your macro tracker</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-lime-500 text-black px-6 py-2 rounded-lg font-medium"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <SideNav />
      
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Header */}
          <div className="p-5 flex items-center">
            <button className="p-2 md:hidden" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl md:text-3xl font-bold kanit-bold mx-auto md:mx-0 pr-8 md:pr-0">MACRO TRACKER</h1>
          </div>

          {/* Error message */}
          {error && (
            <div className="px-5 mb-4">
              <div className="bg-red-900 border border-red-500 rounded-lg p-3 text-red-200">
                {error}
                <button onClick={() => setError('')} className="ml-2 text-red-400 hover:text-red-200">×</button>
              </div>
            </div>
          )}

          {/* Tabs for time navigation */}
          <div className="px-5 mb-6">
            <div className="bg-zinc-900 rounded-full p-1 flex">
              <button 
                className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'today' ? 'bg-lime-500 text-black' : 'text-white'}`} 
                onClick={() => handleTabChange('today')}
              >
                Today
              </button>
              <button 
                className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'week' ? 'bg-lime-500 text-black' : 'text-white'}`} 
                onClick={() => handleTabChange('week')}
              >
                This Week
              </button>
              <button 
                className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'month' ? 'bg-lime-500 text-black' : 'text-white'}`} 
                onClick={() => handleTabChange('month')}
              >
                This Month
              </button>
            </div>
          </div>

          {/* UPDATED: Macro Summary */}
          <div className="px-5 mb-8">
            <div className="bg-zinc-900 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold kanit-medium">
                  {activeTab === 'today' ? 'Daily Targets' : 
                   activeTab === 'week' ? 'Weekly Targets' : 
                   'Monthly Targets'}
                </h2>
                <span className="text-lime-500 text-sm kanit-regular">
                  {Math.round(macroData.calories.consumed)} / {Math.round(getCurrentGoal('calories'))} cal
                </span>
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
                        <p className="text-xl font-bold">{Math.round(macroData.calories.percentage)}%</p>
                        <p className="text-xs text-gray-400">Calories</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm kanit-light text-center">
                    {Math.round(macroData.calories.consumed)} / {Math.round(getCurrentGoal('calories'))} cal
                  </p>
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
                        <p className="text-xl font-bold">{Math.round(macroData.protein.percentage)}%</p>
                        <p className="text-xs text-gray-400">Protein</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm kanit-light text-center">
                    {Math.round(macroData.protein.consumed)}g / {Math.round(getCurrentGoal('protein'))}g
                  </p>
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
                        <p className="text-xl font-bold">{Math.round(macroData.carbs.percentage)}%</p>
                        <p className="text-xs text-gray-400">Carbs</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm kanit-light text-center">
                    {Math.round(macroData.carbs.consumed)}g / {Math.round(getCurrentGoal('carbs'))}g
                  </p>
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
                        <p className="text-xl font-bold">{Math.round(macroData.fat.percentage)}%</p>
                        <p className="text-xs text-gray-400">Fat</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm kanit-light text-center">
                    {Math.round(macroData.fat.consumed)}g / {Math.round(getCurrentGoal('fat'))}g
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Food Log Section */}
          <div className="px-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold kanit-medium">
                Food Log ({activeTab === 'today' ? 'Today' : activeTab === 'week' ? 'This Week' : 'This Month'})
              </h2>
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
            
            {/* UPDATED: Food Entries with date for weekly/monthly */}
            <div className="space-y-3 mb-24">
              {foodEntries.length > 0 ? (
                foodEntries.map((food) => (
                  <div key={food.id} className="bg-zinc-900 rounded-xl p-4 flex justify-between hover:bg-zinc-800 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium kanit-medium">{food.name}</h3>
                        {food.brand && (
                          <span className="ml-2 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                            {food.brand}
                          </span>
                        )}
                        {food.isHomemade && (
                          <span className="ml-2 text-xs text-yellow-500">🏠 Homemade</span>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        {activeTab !== 'today' && (
                          <>
                            <span>{food.date}</span>
                            <span className="mx-2">•</span>
                          </>
                        )}
                        <span>{food.time}</span>
                        <span className="mx-2">•</span>
                        <span className="bg-lime-900 text-lime-300 px-2 py-1 rounded uppercase">
                          {food.mealType}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{food.quantity} {food.unit}</span>
                      </div>
                    </div>
                    <div className="text-right flex items-center">
                      <div className="mr-3">
                        <p className="text-lime-500 font-bold">{food.calories} cal</p>
                        <div className="flex space-x-3 text-xs text-gray-400">
                          <span>P: {food.protein}g</span>
                          <span>C: {food.carbs}g</span>
                          <span>F: {food.fat}g</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteFoodEntry(food.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete entry"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No food entries for this {activeTab.replace('today', 'day')}</p>
                  <button 
                    onClick={() => navigate('/add-food')}
                    className="mt-3 bg-lime-500 text-black px-4 py-2 rounded-lg hover:bg-lime-400 transition-colors"
                  >
                    Add Your First Food
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black z-20">
        <BottomNav />
      </div>
    </div>
  );
};

export default MacroTracker;