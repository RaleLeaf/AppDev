import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';
import useAuthStore from '../store/authStore';
import CreateFoodModal from './CreateFoodModal';

const AddFood = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // State for food data from backend
  const [allFoods, setAllFoods] = useState([]);
  const [popularFoods, setPopularFoods] = useState([]);
  const [recentFoods, setRecentFoods] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);

  // Create Food Modal state
  const [showCreateFoodModal, setShowCreateFoodModal] = useState(false);

  // Updated food categories to match your backend data
  const categories = [
    'DAIRY', 'SWEETENERS', 'OTHER', 'MEAT', 'FRUITS', 'VEGETABLES', 
    'GRAINS', 'NUTS', 'BEVERAGES', 'SNACKS', 'OILS', 'SPICES'
  ];

  // Get auth token
  const getAuthToken = () => {
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('userToken') || 
                  localStorage.getItem('gmToken') || 
                  user?.accessToken;
    return token;
  };

  // Convert backend Food to frontend format
  const convertFoodToFrontendFormat = (backendFood) => {
    return {
      id: backendFood.id,
      name: backendFood.name,
      brand: backendFood.brand,
      barcode: backendFood.barcode,
      category: backendFood.category,
      subcategory: backendFood.subcategory,
      serving: "100g",
      calories: Math.round(backendFood.caloriesPer100g || 0),
      protein: Math.round(backendFood.proteinPer100g || 0),
      carbs: Math.round(backendFood.carbsPer100g || 0),
      fat: Math.round(backendFood.fatsPer100g || 0),
      fiber: Math.round(backendFood.fiberPer100g || 0),
      sugar: Math.round(backendFood.sugarPer100g || 0),
      sodium: Math.round(backendFood.sodiumPer100g || 0),
      isVerified: backendFood.isVerified,
      usageCount: backendFood.usageCount,
      servingSizes: backendFood.servingSizes,
      imageUrl: backendFood.imageUrl,
      description: backendFood.description,
      isVegan: backendFood.isVegan,
      isVegetarian: backendFood.isVegetarian,
      isGlutenFree: backendFood.isGlutenFree,
      createdAt: backendFood.createdAt,
      updatedAt: backendFood.updatedAt
    };
  };

  // Handle food created callback
  const handleFoodCreated = (newFood) => {
    const convertedFood = convertFoodToFrontendFormat(newFood);
    
    // Add to search results if we're currently searching
    if (searchTerm) {
      setSearchResults(prev => [convertedFood, ...prev]);
    }
    
    // Add to category foods if we're viewing that category
    if (selectedCategory === newFood.category || selectedCategory === 'ALL') {
      setCategoryFoods(prev => [convertedFood, ...prev]);
    }
    
    // Refresh popular foods to include the new food
    fetchPopularFoods();
  };

  // Fetch all foods
  const fetchAllFoods = async () => {
    const authToken = getAuthToken();
    if (!authToken) return;

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/foods', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const convertedData = data.map(convertFoodToFrontendFormat);
        setCategoryFoods(convertedData);
        setSelectedCategory('ALL');
      } else {
        const errorText = await response.text();
        setError(`Failed to fetch all foods: ${errorText}`);
      }
    } catch (error) {
      setError(`Error fetching all foods: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch popular foods from backend
  const fetchPopularFoods = async () => {
    const authToken = getAuthToken();
    if (!authToken) return;

    try {
      const response = await fetch('http://localhost:8080/api/foods/popular?limit=20', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const convertedData = data.map(convertFoodToFrontendFormat);
        setPopularFoods(convertedData);
      }
    } catch (error) {
      // Silent fail for popular foods
    }
  };

  // Fetch recent foods from backend
  const fetchRecentFoods = async () => {
    const authToken = getAuthToken();
    if (!authToken) return;

    try {
      const response = await fetch('http://localhost:8080/api/foods/recent?limit=20', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const convertedData = data.map(convertFoodToFrontendFormat);
        setRecentFoods(convertedData);
      }
    } catch (error) {
      // Silent fail for recent foods
    }
  };

  // Fetch foods by category with fallback
  const fetchFoodsByCategory = async (category) => {
    if (!category) return;
    
    const authToken = getAuthToken();
    if (!authToken) return;

    try {
      setLoading(true);
      
      // First try the category endpoint
      let response = await fetch(`http://localhost:8080/api/foods/category/${category}?limit=100`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.length === 0) {
          // Fallback: Get all foods and filter by category
          const allResponse = await fetch('http://localhost:8080/api/foods', {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (allResponse.ok) {
            const allFoods = await allResponse.json();
            const filtered = allFoods.filter(food => 
              food.category === category || 
              food.category?.toUpperCase() === category.toUpperCase()
            );
            
            const convertedData = filtered.map(convertFoodToFrontendFormat);
            setCategoryFoods(convertedData);
            return;
          }
        }
        
        const convertedData = data.map(convertFoodToFrontendFormat);
        setCategoryFoods(convertedData);
      } else {
        // Fallback to all foods filtered by category
        const allResponse = await fetch('http://localhost:8080/api/foods', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (allResponse.ok) {
          const allFoods = await allResponse.json();
          const filtered = allFoods.filter(food => 
            food.category === category || 
            food.category?.toUpperCase() === category.toUpperCase()
          );
          const convertedData = filtered.map(convertFoodToFrontendFormat);
          setCategoryFoods(convertedData);
        }
      }
    } catch (error) {
      setError(`Error fetching ${category} foods: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Search foods with fallback
  const searchFoods = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const authToken = getAuthToken();
    if (!authToken) return;

    try {
      setLoading(true);
      
      // First try the search endpoint
      let response = await fetch(`http://localhost:8080/api/foods/search?query=${encodeURIComponent(query)}&limit=50`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.length === 0) {
          // Fallback: Get all foods and filter client-side
          const allResponse = await fetch('http://localhost:8080/api/foods', {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (allResponse.ok) {
            const allFoods = await allResponse.json();
            const filtered = allFoods.filter(food => 
              food.name?.toLowerCase().includes(query.toLowerCase()) ||
              food.brand?.toLowerCase().includes(query.toLowerCase()) ||
              food.category?.toLowerCase().includes(query.toLowerCase())
            );
            
            const convertedData = filtered.map(convertFoodToFrontendFormat);
            setSearchResults(convertedData);
            return;
          }
        }
        
        const convertedData = data.map(convertFoodToFrontendFormat);
        setSearchResults(convertedData);
      } else {
        // Fallback to all foods if search endpoint fails
        const allResponse = await fetch('http://localhost:8080/api/foods', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (allResponse.ok) {
          const allFoods = await allResponse.json();
          const filtered = allFoods.filter(food => 
            food.name?.toLowerCase().includes(query.toLowerCase()) ||
            food.brand?.toLowerCase().includes(query.toLowerCase()) ||
            food.category?.toLowerCase().includes(query.toLowerCase())
          );
          const convertedData = filtered.map(convertFoodToFrontendFormat);
          setSearchResults(convertedData);
        } else {
          const errorText = await response.text();
          setError(`Search failed: ${errorText}`);
        }
      }
    } catch (error) {
      setError(`Failed to search foods: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Add food to log
  const addFoodToLog = async (food, customQuantity = 1, customUnit = '100g') => {
    const authToken = getAuthToken();
    if (!authToken || !user?.uid) {
      setError('Authentication required');
      return;
    }

    try {
      setLoading(true);
      
      // Calculate nutritional values based on quantity
      const multiplier = customQuantity;
      const calories = Math.round((food.calories || 0) * multiplier);
      const protein = Math.round((food.protein || 0) * multiplier);
      const carbs = Math.round((food.carbs || 0) * multiplier);
      const fat = Math.round((food.fat || 0) * multiplier);

      const logEntry = {
        userId: user.uid,
        foodId: food.id,
        foodName: food.name,
        mealType: selectedMeal.toUpperCase(),
        quantity: customQuantity,
        unit: customUnit,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        fiber: Math.round((food.fiber || 0) * multiplier),
        sugar: Math.round((food.sugar || 0) * multiplier),
        sodium: Math.round((food.sodium || 0) * multiplier),
        consumedAt: new Date().toISOString(),
        loggedAt: new Date().toISOString(),
        isHomemade: false,
        brand: food.brand || null,
        barcode: food.barcode || null
      };

      const response = await fetch('http://localhost:8080/api/food-logs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logEntry)
      });

      if (response.ok || response.status === 201) {
        // Try to increment usage count
        try {
          await fetch(`http://localhost:8080/api/foods/${food.id}/increment-usage`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          // Silent fail for usage count increment
        }
        
        navigate('/macros');
      } else {
        const errorText = await response.text();
        setError(`Failed to log food: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      setError(`Error logging food: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        searchFoods(value);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      fetchFoodsByCategory(category);
    } else {
      setCategoryFoods([]);
    }
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPopularFoods(),
        fetchRecentFoods()
      ]);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Determine which foods to show
  const getFoodsToShow = () => {
    if (searchTerm && searchResults.length > 0) {
      return { title: `Search Results (${searchResults.length})`, foods: searchResults };
    }
    if (selectedCategory && categoryFoods.length > 0) {
      const categoryName = selectedCategory === 'ALL' ? 'All Foods' : selectedCategory;
      return { title: `${categoryName} (${categoryFoods.length})`, foods: categoryFoods };
    }
    if (!searchTerm && !selectedCategory && popularFoods.length > 0) {
      return { title: `Popular Foods (${popularFoods.length})`, foods: popularFoods };
    }
    
    return { title: 'No Foods Found', foods: [] };
  };

  const { title, foods } = getFoodsToShow();

  return (
    <>
      <div className="min-h-screen bg-black text-white flex">
        <SideNav />
        
        <div className="flex-1 flex flex-col pb-20 md:pb-0">
          <div className="w-full max-w-7xl mx-auto px-0 md:px-6 lg:ml-32 xl:mx-auto">
            {/* Header */}
            <div className="p-3 sm:p-5 flex items-center">
              <button className="p-2" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-lg sm:text-xl font-bold kanit-bold mx-auto pr-8">ADD FOOD</h1>
            </div>

            {/* Action Buttons */}
            <div className="px-3 sm:px-5 mb-4 flex flex-col sm:flex-row flex-wrap gap-2">
            
              <button 
                onClick={() => setShowCreateFoodModal(true)}
                className="bg-lime-600 hover:bg-lime-700 text-black px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors font-semibold"
              >
                ➕ CREATE NEW FOOD
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="px-3 sm:px-5 mb-4">
                <div className="bg-red-900 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                  <button onClick={() => setError('')} className="ml-2 text-red-400 hover:text-red-200">×</button>
                </div>
              </div>
            )}

            {/* Search input */}
            <div className="px-3 sm:px-5 mb-6">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search food or scan barcode..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full bg-zinc-900 rounded-xl pl-9 sm:pl-10 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                {loading && searchTerm && (
                  <div className="absolute right-3 top-3.5">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-lime-500"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Category selector */}
            <div className="px-3 sm:px-5 mb-6">
              <h2 className="text-xs sm:text-sm font-medium kanit-medium mb-2">BROWSE BY CATEGORY</h2>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                  className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors text-xs sm:text-sm ${
                    !selectedCategory ? 'bg-lime-500 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                  onClick={() => handleCategoryChange('')}
                >
                  Popular
                </button>
                <button 
                  className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors text-xs sm:text-sm ${
                    selectedCategory === 'ALL' ? 'bg-lime-500 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                  onClick={() => {
                    setSelectedCategory('ALL');
                    fetchAllFoods();
                  }}
                >
                  All Foods
                </button>
                {categories.map((category) => (
                  <button 
                    key={category}
                    className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors text-xs sm:text-sm ${
                      selectedCategory === category ? 'bg-lime-500 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.charAt(0) + category.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal selector */}
            <div className="px-3 sm:px-5 mb-6">
              <h2 className="text-xs sm:text-sm font-medium kanit-medium mb-2">SELECT MEAL</h2>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                  <button 
                    key={meal}
                    className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors text-xs sm:text-sm ${
                      selectedMeal === meal ? 'bg-lime-500 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                    onClick={() => setSelectedMeal(meal)}
                  >
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent foods */}
            {recentFoods.length > 0 && !searchTerm && !selectedCategory && (
              <div className="px-3 sm:px-5 mb-6">
                <h2 className="text-base sm:text-lg font-bold kanit-medium mb-3">Recent</h2>
                <div className="space-y-2">
                  {recentFoods.slice(0, 3).map((food, index) => (
                    <FoodItem key={food.id || index} food={food} onAdd={addFoodToLog} disabled={loading} />
                  ))}
                </div>
              </div>
            )}

            {/* Main food list */}
            <div className="px-3 sm:px-5 mb-20">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base sm:text-lg font-bold kanit-medium">{title}</h2>
                {(searchTerm || selectedCategory) && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSearchResults([]);
                      setSelectedCategory('');
                      setCategoryFoods([]);
                    }}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white"
                  >
                    Clear filters
                  </button>
                )}
              </div>
              
              {foods.length > 0 ? (
                <div className="space-y-2">
                  {foods.map((food, index) => (
                    <FoodItem 
                      key={food.id || index} 
                      food={food} 
                      onAdd={addFoodToLog}
                      disabled={loading}
                    />
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm sm:text-base">No foods found matching "{searchTerm}"</p>
                  <button 
                    className="mt-3 text-lime-500 hover:text-lime-400 underline text-sm"
                    onClick={() => setShowCreateFoodModal(true)}
                  >
                    Create new food entry
                  </button>
                </div>
              ) : loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-lime-500 mx-auto mb-4"></div>
                  <p className="text-gray-400 text-sm sm:text-base">Loading foods...</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm sm:text-base">No foods available</p>
                  <p className="text-xs sm:text-sm mt-2">Try searching for a food or click "Browse All Foods"</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:hidden fixed bottom-0 left-0 right-0">
          <BottomNav />
        </div>
      </div>

      {/* Create Food Modal */}
      <CreateFoodModal
        isOpen={showCreateFoodModal}
        onClose={() => setShowCreateFoodModal(false)}
        initialFoodName={searchTerm}
        onFoodCreated={handleFoodCreated}
      />
    </>
  );
};

// Food item component
const FoodItem = ({ food, onAdd, disabled }) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('100g');

  const handleAdd = () => {
    onAdd(food, quantity, unit);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-3 sm:p-4 hover:bg-zinc-800 transition-colors">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center mb-2 gap-1">
            <h3 className="font-medium kanit-medium text-sm sm:text-base">{food.name}</h3>
            {food.brand && (
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                {food.brand}
              </span>
            )}
            {food.isVerified && (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {food.category && (
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded mr-2">
              {food.category}
            </span>
          )}
          
          {/* Quantity selector */}
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
              className="w-14 sm:w-16 bg-zinc-800 rounded px-2 py-1 text-xs sm:text-sm"
              step="0.1"
              min="0.1"
            />
            <span className="text-xs sm:text-sm text-gray-400">{unit}</span>
          </div>
        </div>
        
        <div className="flex sm:flex-col justify-between sm:text-right sm:items-end">
          <div className="flex flex-col">
            <p className="text-lime-500 font-bold mb-1 text-sm sm:text-base">
              {Math.round((food.calories || 0) * quantity)} cal
            </p>
            <div className="flex space-x-2 sm:space-x-3 text-xs text-gray-400 mb-2 sm:mb-3">
              <span>P: {Math.round((food.protein || 0) * quantity)}g</span>
              <span>C: {Math.round((food.carbs || 0) * quantity)}g</span>
              <span>F: {Math.round((food.fat || 0) * quantity)}g</span>
            </div>
          </div>
          
          <button 
            onClick={handleAdd}
            disabled={disabled}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              disabled 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-lime-500 text-black hover:bg-lime-400'
            }`}
          >
            {disabled ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFood;