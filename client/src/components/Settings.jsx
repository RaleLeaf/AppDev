import React from 'react';
import BottomNav from './BottonNav';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-col md:flex-row md:min-h-screen">
        {/* Sidebar Navigation for desktop */}
        <SideNav />

        {/* Main Content */}
        <div className="flex-1 flex flex-col pb-20">
          {/* Header with back button and title */}
          <div className="p-5 flex items-center">
            <button className="p-2" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">SETTINGS</h1>
          </div>

          {/* Settings Options */}
          <div className="px-5 flex-1 mt-4">
            {/* Settings Items */}
            {['Units of Measure', 'Notifications', 'Language', 'Contact Us'].map((label, i) => (
              <button
                key={i}
                className="w-full flex justify-between items-center py-4 border-b border-zinc-800"
              >
                <span className="kanit-regular text-white">{label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Settings;