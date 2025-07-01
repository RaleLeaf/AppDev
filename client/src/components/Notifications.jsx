import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from './BottonNav';

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('new');

  const isActive = (path) => location.pathname === path;

  const notifications = [
    {
      id: 1,
      type: 'new',
      title: 'Congratulations',
      message: '35% your daily challenge completed',
      time: '9:45 AM',
      isNew: true
    },
    {
      id: 2,
      type: 'event',
      title: 'Attention',
      message: 'Your subscription is going to expire very soon. Subscribe now.',
      time: '9:38 AM',
      isNew: true
    },
    {
      id: 3,
      type: 'all',
      title: 'Daily Activity',
      message: 'Time for your workout session',
      time: '8:25 AM',
      isNew: false
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new' && notification.isNew) return true;
    if (activeTab === 'events' && notification.type === 'event') return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:border-r border-zinc-800 md:p-6">
        <h1 className="text-2xl font-bold mb-10 kanit-medium">baSICK</h1>

        <nav className="flex-1">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/home')}
              className={`flex items-center w-full p-3 rounded-lg group ${isActive('/home') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="kanit-medium">Home</span>
            </button>

            <button
              onClick={() => navigate('/progress')}
              className={`flex items-center w-full p-3 rounded-lg group ${isActive('/progress') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="kanit-medium">Progress</span>
            </button>

            <button
              onClick={() => navigate('/feed')}
              className={`flex items-center w-full p-3 rounded-lg group ${isActive('/feed') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="kanit-medium">Feed</span>
            </button>
          </div>

          <div className="mt-auto pt-20">
            <button
              onClick={() => navigate('/profile')}
              className={`flex items-center w-full p-3 rounded-lg group ${isActive('/profile') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
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
              className={`flex items-center w-full p-3 rounded-lg group mt-2 ${isActive('/settings') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
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

      {/* Notifications Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-5 mb-2">
          <h1 className="text-3xl font-bold kanit-bold text-center mb-6">NOTIFICATIONS</h1>

          <div className="bg-zinc-900 rounded-full p-1 flex">
            <button className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'new' ? 'bg-lime-500 text-black' : 'text-white'}`} onClick={() => setActiveTab('new')}>New</button>
            <button className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'events' ? 'bg-lime-500 text-black' : 'text-white'}`} onClick={() => setActiveTab('events')}>Events</button>
            <button className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'all' ? 'bg-lime-500 text-black' : 'text-white'}`} onClick={() => setActiveTab('all')}>All</button>
          </div>
        </div>

        <div className="flex-1 px-5 overflow-y-auto">
          {filteredNotifications.map(notification => (
            <div key={notification.id} className="mb-4 pb-4 border-b border-zinc-800">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {notification.isNew && <div className="h-2 w-2 bg-lime-500 rounded-full mr-2"></div>}
                  <h3 className="font-medium kanit-medium">{notification.title}</h3>
                </div>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end px-5 mb-20 mt-5">
          <button className="bg-red-600 text-white p-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Notifications;
