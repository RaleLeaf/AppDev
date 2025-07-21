import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { format, addDays, subMonths, addMonths, startOfWeek, eachDayOfInterval } from 'date-fns';
import SideNav from './SideNav';

export default function ProgressTracker() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
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
  const defaultStats = {
    numberOfWorkouts: 0,
    caloriesBurned: 0,
    caloriesConsumed: 0,
    steps: 0,
    activeMinutes: 0,
    averageHeartRate: 0,
  };

  // 🆕 NEW: Load active workout from localStorage or use fallback
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [exercisePlan, setExercisePlan] = useState([]);

  // Load active workout on component mount
  useEffect(() => {
    const loadActiveWorkout = () => {
      try {
        const savedWorkout = localStorage.getItem('activeWorkout');
        if (savedWorkout) {
          const workoutData = JSON.parse(savedWorkout);
          setActiveWorkout(workoutData);
          setExercisePlan(workoutData.exercises || []);
          console.log('📋 Loaded active workout:', workoutData);
        } else {
          // Fallback to mock exercises if no workout is saved
          const mockExercisePlan = [
            { name: 'Stability Training', time: '10:00' },
            { name: 'Flash Cycling', time: '12:00' },
            { name: 'Yoga Flow', time: '15:00' },
            { name: 'Core Blast', time: '17:00' },
          ];
          setExercisePlan(mockExercisePlan);
          console.log('📋 Using fallback mock exercises');
        }
      } catch (error) {
        console.error('Error loading active workout:', error);
        // Fallback to mock exercises on error
        const mockExercisePlan = [
          { name: 'Stability Training', time: '10:00' },
          { name: 'Flash Cycling', time: '12:00' },
          { name: 'Yoga Flow', time: '15:00' },
          { name: 'Core Blast', time: '17:00' },
        ];
        setExercisePlan(mockExercisePlan);
      }
    };

    loadActiveWorkout();
  }, []);

  const [stats, setStats] = useState(defaultStats);
  const [doneExercises, setDoneExercises] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [caloriesGoal, setCaloriesGoal] = useState(1200); // default value

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // Load the current user ID
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;
      const [, payloadB64] = token.split('.');
      const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
      const uid = payload.user_id || payload.sub;
      if (!uid) return;
      try {
        const res = await fetch(`/api/users/firebase/${uid}`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const me = await res.json();
          setUserId(me.firebaseUid);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    })();
  }, []);

  // Fetch existing stats
  useEffect(() => {
    if (!userId) return;
    (async () => {
      const token = localStorage.getItem('authToken');
      try {
        const res = await fetch(
          `/api/user-fitness-tracker/user/${userId}/date-range?startDate=${dateKey}&endDate=${dateKey}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          const entry = Array.isArray(data) ? data[0] : data;
          if (entry) {
            setStats({
              numberOfWorkouts: entry.numberOfWorkouts || 0,
              caloriesBurned: entry.caloriesBurned || 0,
              caloriesConsumed: entry.caloriesConsumed || 0,
              steps: entry.steps || 0,
              activeMinutes: entry.activeMinutes || 0,
              averageHeartRate: entry.averageHeartRate || 0,
            });
            setDoneExercises(entry.doneExercises || []); // <-- add this
            setTrackerId(entry.id);
            
            // 🚨 DEBUG: Log to understand what's happening
            console.log('📊 Loaded fitness data:', {
              numberOfWorkouts: entry.numberOfWorkouts,
              doneExercises: entry.doneExercises,
              doneExercisesLength: (entry.doneExercises || []).length
            });
          } else {
            throw new Error('No entry');
          }
        } else {
          setStats(defaultStats);
          setTrackerId(null);
          setDoneExercises([]);
        }
      } catch {
        setStats(defaultStats);
        setTrackerId(null);
        setDoneExercises([]);
      }
    })();
  }, [userId, dateKey]);

  // Helper to POST or PUT with ISO string
  const saveEntry = async (payload) => {
    const token = localStorage.getItem('authToken');
    const url = trackerId ? `/api/user-fitness-tracker/${trackerId}` : '/api/user-fitness-tracker';
    const method = trackerId ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setTrackerId(data.id);
      } else {
        console.error(`${method} failed:`, res.status);
      }
    } catch (err) {
      console.error('Save entry error:', err);
    }
  };

  // Toggle a single exercise completion
  const handleExerciseToggle = async (exerciseName) => {
    const updated = doneExercises.includes(exerciseName)
      ? doneExercises.filter((ex) => ex !== exerciseName)
      : [...doneExercises, exerciseName];

    setDoneExercises(updated);
    
    // 🔧 FIX: Update numberOfWorkouts to match actual done exercises count
    setStats((prev) => ({ ...prev, numberOfWorkouts: updated.length }));

    const payload = {
      userId,
      trackingDate: new Date(dateKey).toISOString(),
      numberOfWorkouts: updated.length, // 🔧 FIX: Use actual count
      caloriesBurned: stats.caloriesBurned,
      caloriesConsumed: stats.caloriesConsumed,
      steps: stats.steps,
      activeMinutes: stats.activeMinutes,
      averageHeartRate: stats.averageHeartRate,
      doneExercises: updated, // <-- add this
    };
    await saveEntry(payload);
  };

  // Bulk save from modal
  const handleSave = async () => {
    const payload = {
      userId,
      trackingDate: new Date(dateKey).toISOString(),
      numberOfWorkouts: doneExercises.length, // 🔧 FIX: Use actual done exercises count
      caloriesBurned: stats.caloriesBurned,
      caloriesConsumed: stats.caloriesConsumed,
      steps: stats.steps,
      activeMinutes: stats.activeMinutes,
      averageHeartRate: stats.averageHeartRate,
      doneExercises: doneExercises, // 🔧 FIX: Include done exercises
    };
    await saveEntry(payload);
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

  // 🆕 NEW: Navigate back to ExerciseList with active workout context
  const handleBackToWorkout = () => {
    if (activeWorkout) {
      navigate('/exercises', {
        state: {
          category: activeWorkout.category,
          title: activeWorkout.title,
          difficulty: activeWorkout.difficulty,
          environment: activeWorkout.environment,
          limit: activeWorkout.exercises?.length || 6
        }
      });
    } else {
      // If no active workout, go to workout categories
      navigate('/workout-categories');
    }
  };

  if (!userId) return <div>Loading user...</div>;

  const percentage1 = caloriesGoal > 0 ? (stats.caloriesBurned / caloriesGoal) * 100 : 0;
  
  // 🔧 FIX: Use done exercises length instead of stats.numberOfWorkouts for display
  const actualCompletedExercises = doneExercises.length;
  const percentage2 = exercisePlan.length > 0 ? (actualCompletedExercises / exercisePlan.length) * 100 : 0;
  
  const sortedExercises = [...exercisePlan].sort((a, b) =>
    doneExercises.includes(a.name) === doneExercises.includes(b.name)
      ? 0
      : doneExercises.includes(a.name)
      ? -1
      : 1
  );

  // 🚨 DEBUG: Log current state
  console.log('🔍 Current state:', {
    'stats.numberOfWorkouts': stats.numberOfWorkouts,
    'doneExercises.length': doneExercises.length,
    'actualCompletedExercises': actualCompletedExercises,
    'exercisePlan.length': exercisePlan.length,
    'percentage2': percentage2,
    'doneExercises': doneExercises
  });

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
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold kanit-bold">FITNESS TRACKER</h1>
              {/* 🆕 NEW: Back to Workout button */}
              {activeWorkout && (
                <button
                  onClick={handleBackToWorkout}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg kanit-medium transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Workout
                </button>
              )}
            </div>
            {/* 🆕 NEW: Show active workout info */}
            {activeWorkout && (
              <div className="mt-2 p-3 bg-zinc-800 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="text-lime-500 font-semibold">Active Workout:</span> {activeWorkout.title}
                </p>
                <p className="text-xs text-gray-400">
                  {activeWorkout.difficulty} • {activeWorkout.environment} • {exercisePlan.length} exercises
                </p>
              </div>
            )}
          </div>

          {/* Mobile Back to Workout button */}
          {activeWorkout && (
            <div className="md:hidden px-5 pb-3 relative z-50">
              <button
                onClick={handleBackToWorkout}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg kanit-medium transition-colors flex items-center gap-2 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to {activeWorkout.title}
              </button>
            </div>
          )}

          <div className="flex flex-row p-3 md:-mt-0 -mt-10 relative items-center justify-center gap-4 z-50">
            <button onClick={() => changeMonth("prev")} className="text-white text-2xl">←</button>
            <button onClick={() => setShowPicker(true)} className="text-xl italic text-white">
              {format(currentMonth, "MMMM yyyy")}
            </button>
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
                    {/* 🔧 FIX: Show actual completed exercises count */}
                    <p className="text-xl font-bold">{actualCompletedExercises} / {exercisePlan.length}</p>
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
              <p className="font-semibold">
                {activeWorkout ? `Complete ${activeWorkout.title}` : 'Finish a Workout'}
              </p>
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
            <h2 className="font-bold mb-2">
              {activeWorkout ? `${activeWorkout.title} - Exercises` : 'Finished Exercises'}
            </h2>
            {sortedExercises.map((exercise, index) => (
              <div key={index} className="flex justify-between items-center bg-[#2a2a2a] p-3 mb-2 rounded">
                <div>
                  <p>{exercise.name}</p>
                  <p className="text-sm text-yellow-500">{exercise.time}</p>
                </div>
                <button onClick={() => handleExerciseToggle(exercise.name)} className={`px-3 py-1 rounded-full border ${doneExercises.includes(exercise.name) ? "bg-green-500" : "bg-gray-600"}`}>
                  ✓
                </button>
              </div>
            ))}
            
            {/* 🆕 NEW: No workout message */}
            {exercisePlan.length === 0 && (
              <div className="text-center py-8 bg-zinc-800 rounded-lg">
                <p className="text-gray-400 mb-4">No active workout selected</p>
                <button
                  onClick={() => navigate('/workout-categories')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg kanit-medium transition-colors"
                >
                  Choose a Workout
                </button>
              </div>
            )}
          </div>

          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Update Progress</h2>
                {/* Only show backend fields */}
                {[
                  { key: "caloriesBurned", label: "Calories Burned" },
                  { key: "caloriesConsumed", label: "Calories Consumed" },
                  { key: "steps", label: "Steps" },
                  { key: "activeMinutes", label: "Active Minutes" },
                  { key: "averageHeartRate", label: "Avg Heart Rate" },
                  // 🔧 FIX: Removed numberOfWorkouts from manual edit since it's auto-calculated
                ].map(({ key, label }) => (
                  <div key={key} className="mb-3">
                    <label className="block text-sm capitalize">{label}</label>
                    <input
                      name={key}
                      type="number"
                      value={stats[key] || 0}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                ))}
                
                {/* 🔧 FIX: Show read-only workout count */}
                <div className="mb-3">
                  <label className="block text-sm text-gray-600">Workouts Completed (auto-calculated)</label>
                  <div className="w-full border p-2 rounded bg-gray-100 text-gray-600">
                    {actualCompletedExercises} / {exercisePlan.length} exercises
                  </div>
                </div>
                
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