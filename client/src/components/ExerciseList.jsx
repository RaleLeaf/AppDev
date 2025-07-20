import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

function ExerciseList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get category from navigation state or default to all
  const category = location.state?.category || 'all';
  const categoryTitle = location.state?.title || 'All Exercises';

  useEffect(() => {
    fetchExercises();
  }, [category]);

  // Update the fetchExercises method to use the new endpoint:
  const fetchExercises = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      // Use the new workout-category endpoint
      const url = `http://localhost:8080/api/exercises/workout-category/${category}?limit=6`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExercises(data);
        setError(null);
      } else {
        setError('Failed to fetch exercises');
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation for desktop */}
      <SideNav />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-5 flex items-center">
          <button className="p-2" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">{categoryTitle}</h1>
        </div>

        {/* Exercise list */}
        <div className="space-y-4 px-7 pb-24">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500 mx-auto mb-4"></div>
              <p>Loading exercises...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchExercises}
                className="bg-lime-500 text-black px-4 py-2 rounded hover:bg-lime-400"
              >
                Retry
              </button>
            </div>
          ) : exercises.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No exercises found for this category</p>
            </div>
          ) : (
            exercises.map((exercise, index) => (
              <div
                key={exercise.id || index}
                className="flex items-center bg-[#333333] rounded-xl p-3 gap-4 shadow-md"
              >
                <img
                  src={exercise.gifUrl || exercise.imageUrl || '/exercises/default.jpg'}
                  alt={exercise.name}
                  className="w-20 h-20 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = '/exercises/default.jpg';
                  }}
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{exercise.name}</h2>
                  <p className="text-sm text-gray-300">{exercise.muscleGroup}</p>
                  <p className="text-sm text-lime-400 font-semibold">
                    {exercise.defaultSets}x{exercise.defaultReps} | {exercise.difficulty}
                  </p>
                  {exercise.averageRating > 0 && (
                    <p className="text-xs text-yellow-400">⭐ {exercise.averageRating.toFixed(1)}</p>
                  )}
                </div>
                <div className="text-2xl text-white">›</div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default ExerciseList;