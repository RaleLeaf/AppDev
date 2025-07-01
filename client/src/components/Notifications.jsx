import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new');

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
    <div className="min-h-screen bg-black text-white flex">
      {/* SideNav - Only visible on medium screens and up */}
      <SideNav />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        {/* Content Container - Centered properly for all screen sizes */}
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Notifications Content */}
          <div className="p-5 mb-2">
            <h1 className="text-3xl font-bold kanit-bold text-center md:text-left mb-6">NOTIFICATIONS</h1>

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

          <div className="flex-1 px-5 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
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
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No notifications found</p>
              </div>
            )}
          </div>

          <div className="flex justify-end px-5 mb-20 md:mb-5 mt-5">
            <button className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
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

export default Notifications;