import React, { useState } from 'react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('new');
  
  // Sample notification data
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

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new' && notification.isNew) return true;
    if (activeTab === 'events' && notification.type === 'event') return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-5 mb-2">
        <h1 className="text-3xl font-bold kanit-bold text-center mb-6">NOTIFICATIONS</h1>
        
        {/* Tab Selector */}
        <div className="bg-zinc-900 rounded-full p-1 flex">
          <button 
            className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'new' ? 'bg-lime-500 text-black' : 'text-white'}`}
            onClick={() => setActiveTab('new')}
          >
            New
          </button>
          <button 
            className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'events' ? 'bg-lime-500 text-black' : 'text-white'}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={`flex-1 py-2 rounded-full text-center text-sm kanit-regular ${activeTab === 'all' ? 'bg-lime-500 text-black' : 'text-white'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
        </div>
      </div>
      
      {/* Notifications List */}
      <div className="flex-1 px-5">
        {filteredNotifications.map(notification => (
          <div key={notification.id} className="mb-4 pb-4 border-b border-zinc-800">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                {notification.isNew && (
                  <div className="h-2 w-2 bg-lime-500 rounded-full mr-2"></div>
                )}
                <h3 className="font-medium kanit-medium">{notification.title}</h3>
              </div>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
          </div>
        ))}
      </div>
      
      {/* Delete Button */}
      <div className="flex justify-end px-5 mb-20">
        <button className="bg-red-600 text-white p-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
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
};

export default Notifications;