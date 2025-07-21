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
  
  // State for macro data
  const [macroData, setMacroData] = useState({
    calories: { consumed: 0, goal: 2000, percentage: 0 },
    protein: { consumed: 0, goal: 140, percentage: 0 },
    carbs: { consumed: 0, goal: 240, percentage: 0 },
    fat: { consumed: 0, goal: 65, percentage: 0 }
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

  // Fetch user's macro tracker settings
  const fetchUserMacroTracker = async () => {
    const authToken = getAuthToken();
    if (!authToken || !user?.uid) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/user-macro-trackers/user/${user.uid}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserMacroTracker(data);
        
        // Update macro goals based on user settings
        setMacroData(prev => ({
          ...prev,
          calories: { ...prev.calories, goal: data.targetCalories || 2000 },
          protein: { ...prev.protein, goal: data.targetProtein || 140 },
          carbs: { ...prev.carbs, goal: data.targetCarbs || 240 },
          fat: { ...prev.fat, goal: data.targetFat || 65 }
        }));
      }
    } catch (error) {
      // Silent fail for macro tracker settings
    }
  };

  // Fetch user's food logs
  const fetchUserFoodLogs = async (timeframe = 'today') => {
    const authToken = getAuthToken();
    if (!authToken || !user?.uid) {
      return;
    }

    try {
      setLoading(true);
      
      let endpoint = `http://localhost:8080/api/food-logs/user/${user.uid}`;
      
      // Add date filters based on timeframe
      const today = new Date();
      
      switch (timeframe) {
        case 'today':
          const todayStr = today.toISOString().split('T')[0];
          endpoint = `http://localhost:8080/api/food-logs/user/${user.uid}/date/${todayStr}`;
          break;
        case 'week':
        case 'month':
          endpoint = `http://localhost:8080/api/food-logs/user/${user.uid}/recent?limit=${timeframe === 'week' ? 50 : 100}`;
          break;
        default:
          endpoint = `http://localhost:8080/api/food-logs/user/${user.uid}?limit=50`;
      }
      
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Convert backend UserFoodLogDTO to frontend format
        const convertedEntries = data.map(log => ({
          id: log.id,
          name: log.foodName,
          brand: log.brand,
          time: new Date(log.consumedAt).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          }),
          mealType: log.mealType,
          calories: Math.round(log.calories || 0),
          protein: Math.round(log.protein || 0),
          carbs: Math.round(log.carbs || 0),
          fat: Math.round(log.fats || 0),
          quantity: log.quantity,
          unit: log.unit,
          consumedAt: log.consumedAt,
          isHomemade: log.isHomemade || false
        }));

        // Filter by timeframe for week/month
        let filteredEntries = convertedEntries;
        if (timeframe === 'week') {
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          filteredEntries = convertedEntries.filter(entry => 
            new Date(entry.consumedAt) >= weekAgo
          );
        } else if (timeframe === 'month') {
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          filteredEntries = convertedEntries.filter(entry => 
            new Date(entry.consumedAt) >= monthAgo
          );
        }

        setFoodEntries(filteredEntries);
        
        // Calculate totals for macro data
        const totals = filteredEntries.reduce((acc, entry) => ({
          calories: acc.calories + entry.calories,
          protein: acc.protein + entry.protein,
          carbs: acc.carbs + entry.carbs,
          fat: acc.fat + entry.fat
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        // Update macro data with calculated totals
        setMacroData(prev => ({
          calories: {
            ...prev.calories,
            consumed: totals.calories,
            percentage: Math.min((totals.calories / prev.calories.goal) * 100, 100)
          },
          protein: {
            ...prev.protein,
            consumed: totals.protein,
            percentage: Math.min((totals.protein / prev.protein.goal) * 100, 100)
          },
          carbs: {
            ...prev.carbs,
            consumed: totals.carbs,
            percentage: Math.min((totals.carbs / prev.carbs.goal) * 100, 100)
          },
          fat: {
            ...prev.fat,
            consumed: totals.fat,
            percentage: Math.min((totals.fat / prev.fat.goal) * 100, 100)
          }
        }));
      } else {
        const errorText = await response.text();
        setError(`Failed to load food logs: ${errorText}`);
      }
    } catch (error) {
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

  // Handle tab change
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    fetchUserFoodLogs(newTab);
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

          {/* Macro Summary */}
          <div className="px-5 mb-8">
            <div className="bg-zinc-900 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold kanit-medium">Daily Targets</h2>
                <span className="text-lime-500 text-sm kanit-regular">
                  {Math.round(macroData.calories.consumed)} / {macroData.calories.goal} cal
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
                  <p className="text-sm kanit-light">{Math.round(macroData.protein.consumed)}g / {macroData.protein.goal}g</p>
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
                  <p className="text-sm kanit-light">{Math.round(macroData.carbs.consumed)}g / {macroData.carbs.goal}g</p>
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
                  <p className="text-sm kanit-light">{Math.round(macroData.fat.consumed)}g / {macroData.fat.goal}g</p>
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
            
            {/* Food Entries */}
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