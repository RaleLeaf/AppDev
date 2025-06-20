import React from 'react';

const FitnessLeaderboard = () => {
  // Leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: 'Ronald Jason',
      calories: '850 avg. calories burned per day',
      years: '9 years in progress',
      image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=200'
    },
    {
      id: 2,
      name: 'Brian Edward',
      calories: '810 avg. calories burned per day',
      years: '6 years in progress',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200'
    },
    {
      id: 3,
      name: 'Emily Kevin',
      calories: '780 avg. calories burned per day',
      years: '2 years in progress',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'
    },
    {
      id: 4,
      name: 'Rebecca Smith',
      calories: '775 avg. calories burned per day',
      years: '8 years in progress',
      image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=200'
    },
    {
      id: 5,
      name: 'Cristofer Arcand',
      calories: '640 avg. calories burned per day',
      years: '7 years in progress',
      image: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=200'
    },
    {
      id: 6,
      name: 'Jennifer James',
      calories: '613 avg. calories burned per day',
      years: '4 years in progress',
      image: 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?q=80&w=200'
    },
    {
      id: 7,
      name: 'Richard Will',
      calories: '571 avg. calories burned per day',
      years: '5 years in progress',
      image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=200'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-20">
      {/* Header with back button and title */}
      <div className="p-5 flex items-center">
        <button className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">Fitness Leaderboard</h1>
      </div>
      
      {/* Leaderboard List with margins */}
      <div className="px-7 flex-1 mt-2">
        {leaderboardData.map((user, index) => (
          <div key={user.id} className="relative mb-4">
            {/* Rank Circle - Green outline with black fill */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black border-2 border-lime-500 flex items-center justify-center text-white font-bold">
              {user.id}
            </div>
            
            {/* User Card with margin */}
            <div className="ml-7 bg-zinc-900 rounded-lg p-3 flex items-center">
              {/* User Image */}
              <div className="w-14 h-14 rounded-full overflow-hidden mr-3">
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h3 className="font-medium kanit-medium">{user.name}</h3>
                <p className="text-xs text-gray-400">{user.calories}</p>
                <p className="text-xs text-lime-500">{user.years}</p>
              </div>
              
              {/* Chevron */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Navigation - Same as EditProfile.jsx */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 flex justify-around items-center h-14">
        {/* Home Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        
        {/* Stats/Leaderboard Icon - Active */}
        <button className="flex flex-col items-center justify-center text-white">
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
        
        {/* Bell/Notification Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
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
};

export default FitnessLeaderboard;