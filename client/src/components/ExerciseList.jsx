import React, { useState } from 'react';
import BottomNav from './BottonNav';

function ExerciseList() {

    const workouts = [
        {
          title: 'Push - Up',
          category: 'High Intensity Training',
          rating: 4.8,
          reps: '3 x 8 Reps',
          image: '/exercises/pushup.webp',
        },
        {
          title: 'Tricep Pushdown',
          category: 'Functional Strength',
          rating: 4.6,
          reps: '3 x 10 Reps',
          image: '/exercises/triceppushdown.webp',
        },
        {
          title: 'Bicep Curls',
          category: 'Strength Training',
          rating: 4.5,
          reps: '3 x 12 Reps',
          image: '/exercises/bicepcurl.jpg',
        },
        {
          title: 'Lat Pulldown',
          category: 'High Intensity Training',
          rating: 4.9,
          reps: '2 x 10 Reps',
          image: '/exercises/latpulldown.jpg',
        },
        {
          title: 'Squats',
          category: 'Functional Strength',
          rating: 4.8,
          reps: '3 x 8 Reps',
          image: '/exercises/squat.jpg',
        },
        {
          title: 'Leg Press',
          category: 'High Intensity Training',
          rating: 4.2,
          reps: '3 x 12 Reps',
          image: '/exercises/legpress.webp',
        },
      ];

      
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      <div className="p-5 flex items-center">
        <button className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">Intense Workout</h1>
      </div>

      <div className="space-y-4 px-7">
        {workouts.map((workout, index) => (
          <div
            key={index}
            className="flex items-center bg-[#333333] rounded-xl p-3 gap-4 shadow-md"
          >
            <img
              src={workout.image}
              alt={workout.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{workout.title}</h2>
              </div>
              <p className="text-sm text-gray-300">{workout.category}</p>
              <p className="text-sm text-lime-400 font-semibold">
                {workout.reps}
              </p>
            </div>
            <div className="text-2xl text-white">›</div>
          </div>
        ))}
      </div>


     <BottomNav />
    </div>
  );
};

export default ExerciseList;