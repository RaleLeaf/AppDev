import React from 'react';
import BottomNav from './BottonNav';
import { useNavigate, useLocation } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:border-r border-zinc-800 md:p-6">
        <h1 className="text-2xl font-bold mb-10 kanit-medium">baSICK</h1>

        <nav className="flex-1">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/home')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                isActive('/home') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="kanit-medium">Home</span>
            </button>

            <button
              onClick={() => navigate('/leaderboard')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                isActive('/leaderboard') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="kanit-medium">Statistics</span>
            </button>

            <button
              onClick={() => navigate('/workout-categories')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                isActive('/workout-categories') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="kanit-medium">Workouts</span>
            </button>
          </div>

          <div className="mt-auto pt-20">
            <button
              onClick={() => navigate('/profile')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                isActive('/profile') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
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
              className={`flex items-center w-full p-3 rounded-lg group mt-2 ${
                isActive('/settings') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with back button and title */}
        <div className="p-5 flex items-center">
          <button className="p-2" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">EDIT PROFILE</h1>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mt-4 mb-8">
          <div className="relative mb-2">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-black rounded-full p-1 border border-zinc-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-5 flex-1">
          <div className="mb-6">
            <label className="block text-lime-500 text-xs mb-1">Name</label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none"
              defaultValue="Sarah Wegan"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lime-500 text-xs mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none"
              defaultValue="Sarah145@mail.com"
            />
          </div>
        </div>

        <div className="px-5 mb-12">
          <button className="w-full py-3 bg-lime-500 rounded-full text-black font-medium kanit-medium">
            Save
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EditProfile;
