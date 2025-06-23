import React from 'react';
import BottomNav from './BottonNav';

function TrainerList() {
  const trainers = [
    {
      name: 'Richard Will',
      category: 'High Intensity Training',
      experience: '5 years experience',
      image: '/trainers/trainer1.avif',
    },
    {
      name: 'Jennifer James',
      category: 'Functional Strength',
      experience: '4 years experience',
      image: '/trainers/trainer2.jpg',
    },
    {
      name: 'Brian Edward',
      category: 'Strength Training',
      experience: '6 years experience',
      image: '/trainers/trainer3.jpg',
    },
    {
      name: 'Emily Kevin',
      category: 'High Intensity Training',
      experience: '2 years experience',
      image: '/trainers/trainer4.jpg',
    },
    {
      name: 'Rebecca Smith',
      category: 'Functional Strength',
      experience: '8 years experience',
      image: '/trainers/trainer5.jpg',
    },
    {
      name: 'Ronald Jason',
      category: 'High Intensity Training',
      experience: '9 years experience',
      image: '/trainers/trainer6.webp',
    },
    {
      name: 'Cristofer Arcand',
      category: 'High Intensity Training',
      experience: '4 years experience',
      image: '/trainers/trainer7.jpg',
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
        <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">Fitness Trainers</h1>
      </div>

      <div className="space-y-4 px-6">
        {trainers.map((trainer, index) => (
          <div key={index} className="flex items-center bg-[#2d2d2d] rounded-xl p-3 gap-4 shadow-md">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-16 h-16 rounded-full object-cover border border-gray-500"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-md font-bold">{trainer.name}</h2>
              </div>
              <p className="text-sm text-gray-300">{trainer.category}</p>
              <p className="text-sm text-lime-400 font-medium">{trainer.experience}</p>
            </div>
            <div className="text-2xl text-white">›</div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}

export default TrainerList;
