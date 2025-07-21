import React, { useState } from 'react';
import useAuthStore from '../store/authStore';

const CreateFoodModal = ({ isOpen, onClose, initialFoodName = '', onFoodCreated }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: initialFoodName,
    brand: '',
    barcode: '',
    category: 'OTHER',
    subcategory: '',
    caloriesPer100g: '',
    proteinPer100g: '',
    carbsPer100g: '',
    fatsPer100g: '',
    fiberPer100g: '',
    sugarPer100g: '',
    sodiumPer100g: '',
    description: '',
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
  });

  const categories = [
    'DAIRY', 'SWEETENERS', 'OTHER', 'MEAT', 'FRUITS', 'VEGETABLES', 
    'GRAINS', 'NUTS', 'BEVERAGES', 'SNACKS', 'OILS', 'SPICES'
  ];

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialFoodName,
        brand: '',
        barcode: '',
        category: 'OTHER',
        subcategory: '',
        caloriesPer100g: '',
        proteinPer100g: '',
        carbsPer100g: '',
        fatsPer100g: '',
        fiberPer100g: '',
        sugarPer100g: '',
        sodiumPer100g: '',
        description: '',
        isVegan: false,
        isVegetarian: false,
        isGlutenFree: false,
      });
      setError('');
    }
  }, [isOpen, initialFoodName]);

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('userToken') || 
                  localStorage.getItem('gmToken') || 
                  user?.accessToken;
    return token;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Food name is required');
      return false;
    }
    if (!formData.caloriesPer100g || isNaN(formData.caloriesPer100g)) {
      setError('Valid calories per 100g is required');
      return false;
    }
    if (!formData.proteinPer100g || isNaN(formData.proteinPer100g)) {
      setError('Valid protein per 100g is required');
      return false;
    }
    if (!formData.carbsPer100g || isNaN(formData.carbsPer100g)) {
      setError('Valid carbs per 100g is required');
      return false;
    }
    if (!formData.fatsPer100g || isNaN(formData.fatsPer100g)) {
      setError('Valid fat per 100g is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const authToken = getAuthToken();
    if (!authToken) {
      setError('Authentication required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Prepare the food data according to CreateFoodRequest
      const foodData = {
        name: formData.name.trim(),
        brand: formData.brand.trim() || null,
        barcode: formData.barcode.trim() || null,
        category: formData.category,
        subcategory: formData.subcategory.trim() || null,
        caloriesPer100g: parseFloat(formData.caloriesPer100g),
        proteinPer100g: parseFloat(formData.proteinPer100g),
        carbsPer100g: parseFloat(formData.carbsPer100g),
        fatsPer100g: parseFloat(formData.fatsPer100g),
        fiberPer100g: parseFloat(formData.fiberPer100g) || 0,
        sugarPer100g: parseFloat(formData.sugarPer100g) || 0,
        sodiumPer100g: parseFloat(formData.sodiumPer100g) || 0,
        description: formData.description.trim() || null,
        isVegan: formData.isVegan,
        isVegetarian: formData.isVegetarian,
        isGlutenFree: formData.isGlutenFree,
        imageUrl: null,
        servingSizes: {},
        vitaminsPer100g: {},
        mineralsPer100g: {},
        submittedBy: user?.uid || null
      };

      console.log('Creating new food:', foodData);

      const response = await fetch('http://localhost:8080/api/foods', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData)
      });

      if (response.ok || response.status === 201) {
        const createdFood = await response.json();
        console.log('✅ Food created successfully:', createdFood);
        
        // Call callback to notify parent
        if (onFoodCreated) {
          onFoodCreated(createdFood);
        }
        
        // Close modal
        onClose();
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to create food:', response.status, errorText);
        setError(`Failed to create food: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('💥 Error creating food:', error);
      setError(`Error creating food: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-zinc-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <h1 className="text-lg sm:text-xl font-bold kanit-bold text-white">CREATE NEW FOOD</h1>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 text-white">
          {/* Error message */}
          {error && (
            <div className="mb-4">
              <div className="bg-red-900 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                {error}
                <button onClick={() => setError('')} className="ml-2 text-red-400 hover:text-red-200">×</button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-lime-500 border-b border-zinc-700 pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Food Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="e.g., Chicken Breast"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Brand (Optional)</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="e.g., Tyson"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0) + cat.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Barcode (Optional)</label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="e.g., 1234567890123"
                  />
                </div>
              </div>
            </div>

            {/* Nutrition Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-lime-500 border-b border-zinc-700 pb-2">Nutrition per 100g</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Calories *</label>
                  <input
                    type="number"
                    name="caloriesPer100g"
                    value={formData.caloriesPer100g}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="kcal"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Protein (g) *</label>
                  <input
                    type="number"
                    name="proteinPer100g"
                    value={formData.proteinPer100g}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="grams"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Carbs (g) *</label>
                  <input
                    type="number"
                    name="carbsPer100g"
                    value={formData.carbsPer100g}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="grams"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Fat (g) *</label>
                  <input
                    type="number"
                    name="fatsPer100g"
                    value={formData.fatsPer100g}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="grams"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Fiber (g)</label>
                  <input
                    type="number"
                    name="fiberPer100g"
                    value={formData.fiberPer100g}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="grams"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sugar (g)</label>
                  <input
                    type="number"
                    name="sugarPer100g"
                    value={formData.sugarPer100g}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="grams"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sodium (mg)</label>
                  <input
                    type="number"
                    name="sodiumPer100g"
                    value={formData.sodiumPer100g}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="milligrams"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subcategory</label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="e.g., Lean Cut"
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-lime-500 border-b border-zinc-700 pb-2">Additional Information</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                  placeholder="Optional description or notes about this food..."
                  rows={3}
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isVegan"
                    checked={formData.isVegan}
                    onChange={handleInputChange}
                    className="mr-2 rounded focus:ring-lime-500"
                  />
                  <span className="text-sm">Vegan</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isVegetarian"
                    checked={formData.isVegetarian}
                    onChange={handleInputChange}
                    className="mr-2 rounded focus:ring-lime-500"
                  />
                  <span className="text-sm">Vegetarian</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isGlutenFree"
                    checked={formData.isGlutenFree}
                    onChange={handleInputChange}
                    className="mr-2 rounded focus:ring-lime-500"
                  />
                  <span className="text-sm">Gluten Free</span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  loading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-lime-500 text-black hover:bg-lime-400'
                }`}
              >
                {loading ? 'Creating...' : 'Create Food'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFoodModal;