import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:border-r border-zinc-800 md:p-6">
      <h1 className="text-2xl font-bold mb-10 kanit-medium">baSICK</h1>

      <nav className="flex-1">
        <div className="space-y-2">
          <button
            onClick={() => navigate('/home')}
            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/home')
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="kanit-medium">Home</span>
          </button>

          <button
            onClick={() => navigate('/progress')}
            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/progress') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="kanit-medium">Progress</span>
          </button>

          <button
            onClick={() => navigate('/feed')}
            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/feed') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="kanit-medium">Feed</span>
          </button>
          
          {/* Added MacroTracker Button */}
          <button
            onClick={() => navigate('/macros')}
            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/macros') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
            <span className="kanit-medium">MacroTracker</span>
          </button>
          
          <button
            onClick={() => navigate('/leaderboard')}
            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/leaderboard') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="kanit-medium">Leaderboard</span>
          </button>
          
          <button
            onClick={() => navigate('/notifications')}
            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/notifications') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="kanit-medium relative">
              Notifications
              <span className="absolute top-0 right-0 h-2 w-2 bg-lime-500 rounded-full"></span>
            </span>
          </button>
        </div>

        <div className="mt-auto pt-20">
          <button
            onClick={() => navigate('/profile')}
            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/profile')
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="kanit-medium relative">
              Profile
              <span className="absolute top-0 right-0 h-2 w-2 bg-lime-500 rounded-full"></span>
            </span>
          </button>

          <button
            onClick={() => navigate('/settings')}
            className={`flex items-center w-full p-3 rounded-lg group mt-2 ${isActive('/settings')
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="kanit-medium">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;