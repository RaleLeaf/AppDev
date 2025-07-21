import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { format, addDays, subMonths, addMonths, startOfWeek, eachDayOfInterval } from 'date-fns';
import SideNav from './SideNav';
import { userFinishedWorkoutAPI } from '../services/api';
import useAuthStore from '../store/authStore';

export default function ProgressTracker() {
  const navigate = useNavigate();
  const { userId } = useAuthStore();
  const [trackerId, setTrackerId] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const startWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const [currentWeekStart, setCurrentWeekStart] = useState(startWeek);
  const visibleWeekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: addDays(currentWeekStart, 6),
  });
  const dateKey = format(selectedDate, 'yyyy-MM-dd');

  // Only numeric stats; we derive trackingDate from dateKey when saving
  const defaultStats = useMemo(() => ({
    numberOfWorkouts: 0,
    caloriesBurned: 0,
    caloriesConsumed: 0,
    steps: 0,
    activeMinutes: 0,
    averageHeartRate: 0,
  }), []);

  // 🆕 NEW: Real finished workouts instead of mock exercise plan
  const [finishedWorkouts, setFinishedWorkouts] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  const [stats, setStats] = useState(defaultStats);
  const [showEditModal, setShowEditModal] = useState(false);
  const [caloriesGoal] = useState(1200); // default value

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // Helper function to load existing fitness tracker data without overwriting workout data
  const loadExistingFitnessData = useCallback(async (workoutCount, workoutCalories) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user-fitness-tracker/user/${userId}/date-range?startDate=${dateKey}&endDate=${dateKey}`,
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const entry = Array.isArray(data) ? data[0] : data;
        
        if (entry) {
          console.log('📈 Existing fitness data found:', entry);
          setStats({
            numberOfWorkouts: workoutCount, // Always use workout count from finished workouts
            caloriesBurned: Math.max(workoutCalories, entry.caloriesBurned || 0), // Use higher value
            caloriesConsumed: entry.caloriesConsumed || 0,
            steps: entry.steps || 0,
            activeMinutes: entry.activeMinutes || 0,
            averageHeartRate: entry.averageHeartRate || 0,
          });
          setTrackerId(entry.id);
        } else {
          console.log('📊 No existing fitness data, using workout data only');
          setStats({
            numberOfWorkouts: workoutCount,
            caloriesBurned: workoutCalories,
            caloriesConsumed: 0,
            steps: 0,
            activeMinutes: 0,
            averageHeartRate: 0,
          });
          setTrackerId(null);
        }
      } else {
        console.log('📊 No fitness tracker data found, using workout data only');
        setStats({
          numberOfWorkouts: workoutCount,
          caloriesBurned: workoutCalories,
          caloriesConsumed: 0,
          steps: 0,
          activeMinutes: 0,
          averageHeartRate: 0,
        });
        setTrackerId(null);
      }
    } catch (error) {
      console.error('❌ Error loading fitness tracker data:', error);
      // Fallback to workout data only
      setStats({
        numberOfWorkouts: workoutCount,
        caloriesBurned: workoutCalories,
        caloriesConsumed: 0,
        steps: 0,
        activeMinutes: 0,
        averageHeartRate: 0,
      });
      setTrackerId(null);
    }
  }, [userId, dateKey]);

  // 🆕 NEW: Load finished workouts for the selected date
  const loadFinishedWorkouts = useCallback(async () => {
    if (!userId) return;
    
    console.log('🔄 Loading finished workouts for date:', dateKey);
    setLoadingWorkouts(true);
    
    try {
      const allFinishedWorkouts = await userFinishedWorkoutAPI.getFinishedWorkoutsByUser(userId);
      console.log('📊 All finished workouts:', allFinishedWorkouts.length);
      
      // Filter for the selected date - use createdAt as completion date
      const dateWorkouts = allFinishedWorkouts.filter(workout => {
        if (!workout.createdAt) return false;
        
        let workoutDate;
        
        // Handle Firestore timestamp format (has seconds property)
        if (workout.createdAt.seconds) {
          // Convert to local date string to account for timezone
          const localDate = new Date(workout.createdAt.seconds * 1000);
          workoutDate = localDate.getFullYear() + '-' + 
                       String(localDate.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(localDate.getDate()).padStart(2, '0');
        }
        // Handle ISO string format
        else if (typeof workout.createdAt === 'string') {
          const localDate = new Date(workout.createdAt);
          workoutDate = localDate.getFullYear() + '-' + 
                       String(localDate.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(localDate.getDate()).padStart(2, '0');
        }
        // Handle regular Date object or timestamp number
        else {
          const localDate = new Date(workout.createdAt);
          workoutDate = localDate.getFullYear() + '-' + 
                       String(localDate.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(localDate.getDate()).padStart(2, '0');
        }
        
        console.log('🔍 Workout:', workout.workoutName, 'createdAt:', workout.createdAt, 'workoutDate:', workoutDate, 'targetDate:', dateKey);
        return workoutDate === dateKey;
      });
      
      console.log('🎯 Workouts for', dateKey, ':', dateWorkouts);
      setFinishedWorkouts(dateWorkouts);
      
      // Calculate total calories from workouts
      const totalCaloriesBurned = dateWorkouts.reduce((total, workout) => {
        return total + (workout.caloriesBurned || 0);
      }, 0);
      
      console.log('🔥 Total calories from workouts:', totalCaloriesBurned);
      
      // Load any existing fitness tracker data for manual entries (steps, heart rate, etc.)
      await loadExistingFitnessData(dateWorkouts.length, totalCaloriesBurned);
      
    } catch (error) {
      console.error('❌ Error loading finished workouts:', error);
      // Set empty state on error
      setFinishedWorkouts([]);
      setStats(prev => ({ ...prev, numberOfWorkouts: 0, caloriesBurned: 0 }));
    } finally {
      setLoadingWorkouts(false);
    }
  }, [userId, dateKey, loadExistingFitnessData]);

  // 🆕 NEW: Delete a finished workout
  const handleDeleteWorkout = async (workoutId, workoutName) => {
    if (!window.confirm(`Are you sure you want to remove "${workoutName}" from your completed exercises?`)) {
      return;
    }

    try {
      await userFinishedWorkoutAPI.deleteFinishedWorkout(workoutId);
      
      // Refresh the finished workouts list and recalculate stats
      await loadFinishedWorkouts();
      
      alert(`"${workoutName}" has been removed from your completed exercises.`);
    } catch (error) {
      console.error('Error deleting finished workout:', error);
      alert('Failed to delete exercise. Please try again.');
    }
  };

  // Load the current user ID and finished workouts
  useEffect(() => {
    if (userId) {
      loadFinishedWorkouts();
    }
  }, [userId, loadFinishedWorkouts]);

  // Helper to POST or PUT with full URL
  const saveEntry = async (payload) => {
    const token = localStorage.getItem('authToken');
    const url = trackerId 
      ? `http://localhost:8080/api/user-fitness-tracker/${trackerId}` 
      : 'http://localhost:8080/api/user-fitness-tracker';
    const method = trackerId ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        const data = await res.json();
        setTrackerId(data.id);
        console.log('✅ Fitness tracker data saved successfully');
      } else {
        console.error(`❌ ${method} failed:`, res.status, await res.text());
      }
    } catch (err) {
      console.error('❌ Save entry error:', err);
    }
  };

  // Bulk save from modal
  const handleSave = async () => {
    // Calculate total calories from finished workouts
    const totalCaloriesBurned = finishedWorkouts.reduce((total, workout) => {
      return total + (workout.caloriesBurned || 0);
    }, 0);
    
    const payload = {
      userId,
      trackingDate: new Date(dateKey).toISOString(),
      numberOfWorkouts: finishedWorkouts.length, // Always use actual finished workouts count
      caloriesBurned: Math.max(stats.caloriesBurned, totalCaloriesBurned), // Use higher value
      caloriesConsumed: stats.caloriesConsumed || 0,
      steps: stats.steps || 0,
      activeMinutes: stats.activeMinutes || 0,
      averageHeartRate: stats.averageHeartRate || 0,
    };
    
    console.log('💾 Saving fitness tracker data:', payload);
    await saveEntry(payload);
    
    // Update local stats to reflect saved data
    setStats(prev => ({
      ...prev,
      ...payload,
      numberOfWorkouts: finishedWorkouts.length,
      caloriesBurned: Math.max(prev.caloriesBurned, totalCaloriesBurned)
    }));
    
    setShowEditModal(false);
  };

  const handleCancel = () => setShowEditModal(false);

  // Month/Week navigation helpers
  const changeMonth = (dir) => setCurrentMonth(dir === 'next' ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
  const goToPreviousWeek = () => {
    const newStart = addDays(currentWeekStart, -7);
    setCurrentWeekStart(newStart);
    setSelectedDate(newStart);
    setCurrentMonth(newStart);
  };
  const goToNextWeek = () => {
    const newStart = addDays(currentWeekStart, 7);
    setCurrentWeekStart(newStart);
    setSelectedDate(newStart);
    setCurrentMonth(newStart);
  };

  if (!userId) return <div>Loading user...</div>;

  const percentage1 = caloriesGoal > 0 ? Math.min((stats.caloriesBurned / caloriesGoal) * 100, 100) : 0;
  const percentage2 = finishedWorkouts.length > 0 ? 100 : 0; // 100% if any workouts completed

  return (
    <div className="min-h-screen bg-black text-white flex">
      <SideNav />
      <div className="flex-1 flex flex-col pb-20 md:pb-0 md:bg-[#1a1a1a] bg-[#1a1a1a]">
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          <div className="md:hidden bg-[#333333] z-1 absolute w-screen h-56 rounded-3xl -mt-12"></div>
          <div className="md:hidden relative p-5 pb-10 flex items-center z-50">
            <button className="p-2" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">Fitness Tracker</h1>
          </div>

          <div className="hidden md:block p-5 pb-2">
            <h1 className="text-3xl font-bold kanit-bold">FITNESS TRACKER</h1>
          </div>

          <div className="flex flex-row p-3 md:-mt-0 -mt-10 relative items-center justify-center gap-4 z-50">
            <button onClick={() => changeMonth("prev")} className="text-white text-2xl">←</button>
            <div className="text-xl italic text-white">
              {format(currentMonth, "MMMM yyyy")}
            </div>
            <button onClick={() => changeMonth("next")} className="text-white text-2xl">→</button>
          </div>

          <div className="flex justify-between items-center mb-6 px-1 z-50">
            <button onClick={goToPreviousWeek} className="text-white text-2xl px-2 z-50">←</button>
            <div className="flex gap-2 md:gap-12 justify-center items-center w-full max-w-md z-50">
              {visibleWeekDays.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  className={`flex flex-col items-center px-2 py-2 rounded-full ${
                    format(day, "yyyy-MM-dd") === dateKey ? "bg-lime-400 text-black" : "text-gray-400"
                  }`}
                >
                  <div className="text-xs md:text-sm">{format(day, "EEEEE")}</div>
                  <div className="text-sm md:text-md">{format(day, "d")}</div>
                </button>
              ))}
            </div>
            <button onClick={goToNextWeek} className="text-white text-2xl px-2 z-50">→</button>
          </div>

          <div className="flex items-center flex-col justify-center gap-4 mb-6 px-3">
            <div className="flex flex-row gap-10">
              <div className="w-46 h-46 md:w-52 md:h-52 mt-4">
                <CircularProgressbarWithChildren
                  value={percentage2}
                  styles={buildStyles({ pathColor: "#EF4444", trailColor: "#333333" })}
                >
                  <div className="text-center">
                    <p className="text-xl font-bold">{stats.numberOfWorkouts}</p>
                    <p className="text-xs text-gray-400">No. of<br />Exercises Finished</p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div className="w-46 h-46 md:w-52 md:h-52 mt-4">
                <CircularProgressbarWithChildren
                  value={percentage1}
                  styles={buildStyles({ pathColor: "#EF4444", trailColor: "#333333" })}
                >
                  <div className="text-center">
                    <p className="text-xl font-bold">{stats.caloriesBurned} / {caloriesGoal}</p>
                    <p className="text-xs text-gray-400">Calories Burned</p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <div className="bg-lime-400 text-black text-sm p-3 rounded-xl">
              <p>Goal for today:</p>
              <p className="font-semibold">Finish a Workout</p>
            </div>
          </div>

          <div className="flex flex-row gap-8 md:gap-72 mb-6 px-4 justify-center">
            <div><p className="text-lime-400 font-bold">{stats.steps}</p><p>Steps</p></div>
            <div><p className="text-red-400 font-bold">{stats.activeMinutes} min</p><p>Time</p></div>
            <div><p className="text-orange-400 font-bold">{stats.averageHeartRate} bpm</p><p>Heart</p></div>
          </div>

          <div className="text-center mb-6">
            <button onClick={() => setShowEditModal(true)} className="bg-lime-400 text-black px-6 py-2 rounded-xl">Edit Progress</button>
          </div>

          <div className="mb-6">
            <h2 className="font-bold mb-2">Finished Exercises Today</h2>
            {loadingWorkouts ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lime-500 mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Loading exercises...</p>
              </div>
            ) : finishedWorkouts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">No exercises completed today</p>
                <p className="text-gray-500 text-xs mt-1">Go to Exercise List to start working out!</p>
              </div>
            ) : (
              finishedWorkouts.map((workout, index) => (
                <div key={workout.id || index} className="flex justify-between items-center bg-[#2a2a2a] p-3 mb-2 rounded">
                  <div className="flex-1">
                    <p className="font-medium">{workout.workoutName}</p>
                    <div className="flex gap-2 mt-1">
                      <p className="text-sm text-gray-400">
                        {(() => {
                          let completedTime;
                          // Use createdAt as the completion time
                          if (workout.createdAt?.seconds) {
                            // Firestore timestamp format
                            completedTime = new Date(workout.createdAt.seconds * 1000);
                          } else {
                            // ISO string or regular date
                            completedTime = new Date(workout.createdAt || Date.now());
                          }
                          return completedTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          });
                        })()}
                      </p>
                      {workout.caloriesBurned && (
                        <p className="text-sm text-lime-400">
                          {workout.caloriesBurned} cal
                        </p>
                      )}
                      {workout.durationMinutes && (
                        <p className="text-sm text-blue-400">
                          {workout.durationMinutes} min
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">
                      ✅ Done
                    </span>
                    <button 
                      onClick={() => handleDeleteWorkout(workout.id, workout.workoutName)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                      title="Remove this exercise"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Update Progress</h2>
                {/* Show workout count as read-only, other fields editable */}
                <div className="mb-3">
                  <label className="block text-sm capitalize">Workouts (From Logged Exercises)</label>
                  <input
                    type="number"
                    value={finishedWorkouts.length}
                    disabled
                    className="w-full border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
                    title="This is automatically calculated from your logged exercises"
                  />
                </div>
                {/* Other editable fields */}
                {[
                  { key: "caloriesBurned", label: "Calories Burned (Additional)", placeholder: "Extra calories beyond logged exercises" },
                  { key: "caloriesConsumed", label: "Calories Consumed" },
                  { key: "steps", label: "Steps" },
                  { key: "activeMinutes", label: "Active Minutes" },
                  { key: "averageHeartRate", label: "Avg Heart Rate" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="mb-3">
                    <label className="block text-sm capitalize">{label}</label>
                    <input
                      name={key}
                      type="number"
                      value={stats[key] || 0}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                  <button onClick={handleSave} className="bg-lime-500 px-4 py-2 rounded text-white">Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}