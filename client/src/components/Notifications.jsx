import React, { useState } from 'react';
import BottomNav from './BottonNav';

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
      <BottomNav />
    </div>
  );
};

export default Notifications;