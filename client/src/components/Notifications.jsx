import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';
import BottomNav from './BottonNav';

export default function Notifications() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('new');

  // Load userId from JWT - memoized to prevent unnecessary re-renders
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;
      
      try {
        const [, payloadB64] = token.split('.');
        const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
        const uid = payload.user_id || payload.sub;
        if (!uid) return;

        const res = await fetch(`/api/users/firebase/${uid}`, {
          headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          },
        });
        
        if (res.ok) {
          const me = await res.json();
          setUserId(me.firebaseUid);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    };

    loadUser();
  }, []);

  // Fetch notifications - memoized with useCallback
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('authToken');
      const startTime = performance.now();
      
      const res = await fetch(`/api/notifications/user/${userId}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const endTime = performance.now();
      console.log(`Notification fetch took ${endTime - startTime}ms`);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch notifications');
      }
      
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error('Notification fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Fetch notifications when userId changes
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new' && !notification.isRead) return true;
    if (activeTab === 'events' && notification.type === 'event') return true;
    return false;
  });

  // Format time function
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!userId) return <div className="text-white text-center mt-10">Loading user...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex">
      <SideNav />
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
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
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading notifications...</div>
            ) : filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div key={notification.id} className="mb-4 pb-4 border-b border-zinc-800">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {notification.isNew && <div className="h-2 w-2 bg-lime-500 rounded-full mr-2"></div>}
                      <h3 className="font-medium kanit-medium">{notification.title}</h3>
                    </div>
                    <span className="text-xs text-gray-500">{notification.time || ''}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No notifications found</div>
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

      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>
    </div>
  );
}
