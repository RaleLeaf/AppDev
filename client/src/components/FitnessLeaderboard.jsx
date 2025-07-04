import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const FitnessLeaderboard = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-black text-white flex">
      {/* SideNav - Only visible on medium screens and up */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        {/* Content Container - Centered properly for all screen sizes */}
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Header with back button and title */}
          <div className="p-5 flex items-center">
            <button className="p-2 md:hidden" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h1 className="text-xl md:text-3xl font-bold kanit-bold mx-auto md:mx-0 md:pl-0 pr-8 md:pr-0">
              FITNESS LEADERBOARD
            </h1>
          </div>

          {/* Leaderboard List */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 flex-1 mt-2">
            {leaderboardData.map((user) => (
              <div key={user.id} onClick={() => navigate('/userprofile')} className="relative mb-4">
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black border-2 border-lime-500 flex items-center justify-center text-white font-bold">
                  {user.id}
                </div>

                <div className="ml-7 bg-zinc-900 rounded-lg p-3 flex items-center hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-3">
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium kanit-medium">{user.name}</h3>
                    <p className="text-xs text-gray-400">{user.calories}</p>
                    <p className="text-xs text-lime-500">{user.years}</p>
                  </div>

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation - Only visible on mobile and small tablets */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>
    </div>
  );
};

export default FitnessLeaderboard;