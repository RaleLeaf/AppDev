import React from 'react';

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
      
      <div className='flex flex-row p-4 mt-6'>
        <button className="text-white text-2xl mb-4 cursor-pointer">
            <div className='h-10 w-10 rounded-full bg-[#333333]'>
                <h3 className='pt-1'>←</h3>
            </div>
        </button>
        <div>
        <h1 className="absolute left-1/2 -translate-x-1/2 mt-1 text-xl italic text-white">
            Fitness Trainers
        </h1>
        </div>
      </div>

      <div className="space-y-4 px-6 mt-2">
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 flex justify-around items-center h-14">
        {/* Home Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        
        {/* Stats/Leaderboard Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        
        {/* Clipboard/Workouts Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
        
        {/* Bell/Notification Icon - Active */}
        <button className="flex flex-col items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        {/* Profile Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default TrainerList;
