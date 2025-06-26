import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if current route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="">
      {/* Bottom Navigation - Show on mobile, hide on desktop (md and up) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 flex justify-around items-center h-14">
        {/* Home Icon */}
        <button 
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center justify-center ${
            isActive('/home') ? 'text-[#cfff33]' : 'text-zinc-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        {/* Stats/Leaderboard Icon */}
        <button 
          onClick={() => navigate('/leaderboard')}
          className={`flex flex-col items-center justify-center ${
            isActive('/leaderboard') ? 'text-[#cfff33]' : 'text-zinc-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Clipboard/Workouts Icon */}
        <button 
          onClick={() => navigate('/workout-categories')}
          className={`flex flex-col items-center justify-center ${
            isActive('/workout-categories') ? 'text-[#cfff33]' : 'text-zinc-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>

        {/* Bell/Notification Icon */}
        <button 
          onClick={() => navigate('/notifications')}
          className={`flex flex-col items-center justify-center ${
            isActive('/notifications') ? 'text-[#cfff33]' : 'text-zinc-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Profile Icon */}
        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center ${
            isActive('/profile') ? 'text-[#cfff33]' : 'text-zinc-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default BottomNav;