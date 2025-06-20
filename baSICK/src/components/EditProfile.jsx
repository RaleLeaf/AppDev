import React from 'react';

const EditProfile = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-20">
      {/* Header with back button and title */}
      <div className="p-5 flex items-center">
        <button className="p-2">
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
        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-lime-500 text-xs mb-1">Name</label>
          <input 
            type="text"
            className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none"
            defaultValue="Sarah Wegan"
          />
        </div>
        
        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-lime-500 text-xs mb-1">Email</label>
          <input 
            type="email"
            className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none"
            defaultValue="Sarah145@mail.com"
          />
        </div>
      </div>
      
      {/* Save Button - With adequate bottom margin */}
      <div className="px-5 mb-12">
        <button className="w-full py-3 bg-lime-500 rounded-full text-black font-medium kanit-medium">
          Save
        </button>
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
        
        {/* Bell/Notification Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        {/* Profile Icon - Active */}
        <button className="flex flex-col items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default EditProfile;