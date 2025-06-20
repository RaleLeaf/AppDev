import React from 'react';
import BottomNav from './BottonNav';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with back button */}
      <div className="p-5 flex items-center">
        <button className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      {/* Profile Section - Bigger picture with name underneath */}
      <div className="px-5 mb-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          {/* Profile Picture with Progress Ring - Larger size */}
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="8" />
              
              {/* Progress Ring - Bottom Half (Red) */}
              <path 
                d="M50,5 A45,45 0 0,1 95,50 A45,45 0 0,1 50,95" 
                fill="none" 
                stroke="#ff4545" 
                strokeWidth="8"
                strokeLinecap="round" 
              />
              
              {/* Progress Ring - Top Half (Yellow-Green) */}
              <path 
                d="M50,95 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" 
                fill="none" 
                stroke="#c2e200" 
                strokeWidth="8" 
                strokeLinecap="round"
              />
            </svg>
            
            {/* Profile Image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full overflow-hidden border-2 border-black">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" 
                alt="Sarah Wegan" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Name - Under profile picture */}
          <div className="text-center">
            <h1 className="text-3xl font-bold kanit-bold">SARAH</h1>
            <h2 className="text-2xl font-light kanit-light">WEGAN</h2>
          </div>
          
          {/* Joined Date - Under name */}
          <p className="text-zinc-500 text-xs mt-1">Joined 2 months ago</p>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="px-5 flex-1">
        {/* Edit Profile */}
        <button className="w-full flex justify-between items-center py-3 border-b border-zinc-800">
          <span className="kanit-regular">Edit Profile</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Privacy Policy */}
        <button className="w-full flex justify-between items-center py-3 border-b border-zinc-800">
          <span className="kanit-regular">Privacy Policy</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Settings */}
        <button className="w-full flex justify-between items-center py-3 border-b border-zinc-800">
          <span className="kanit-regular">Settings</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Upgrade to Premium */}
        
        
        {/* Sign Out */}
        <button className="w-full py-3 text-red-600 text-center kanit-medium">
          Sign Out
        </button>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;