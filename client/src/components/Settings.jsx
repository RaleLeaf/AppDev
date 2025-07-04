import React, { useState } from 'react';
import BottomNav from './BottonNav';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';

const Settings = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  
  // Settings data
  const [units, setUnits] = useState({
    weight: 'kg',
    height: 'cm',
    distance: 'km'
  });
  
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    progressUpdates: true,
    friendActivity: false,
    achievements: true
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    shareActivity: true,
    showInLeaderboards: false
  });

  // Toggle notification settings
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle privacy settings
  const togglePrivacy = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Change unit setting
  const changeUnit = (key, value) => {
    setUnits(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-col md:flex-row md:min-h-screen">
        {/* Sidebar Navigation for desktop */}
        <SideNav />

        {/* Main Content */}
        <div className="flex-1 flex flex-col pb-20">
          {/* Header with back button and title */}
          <div className="p-5 flex items-center">
            <button className="p-2 hover:bg-zinc-900 rounded-full transition-colors" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">SETTINGS</h1>
          </div>

          {/* Settings Options */}
          <div className="px-5 flex-1 mt-4">
            {/* Settings Items */}
            {[
              { id: 'units', label: 'Units of Measure' },
              { id: 'privacy', label: 'Privacy' },
              { id: 'notifications', label: 'Notifications' },
              { id: 'contact', label: 'Contact Us' }
            ].map((item) => (
              <button
                key={item.id}
                className="w-full flex justify-between items-center py-4 border-b border-zinc-800 hover:bg-zinc-900/30 transition-colors rounded-md px-2"
                onClick={() => setActiveModal(item.id)}
              >
                <span className="kanit-regular text-white">{item.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            ))}

            {/* Logout Button */}
            
          </div>
        </div>
      </div>

      {/* Modal: Units of Measure */}
      {activeModal === 'units' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-md w-full p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold kanit-bold">Units of Measure</h2>
              <button 
                className="p-2 hover:bg-zinc-800 rounded-full" 
                onClick={() => setActiveModal(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Weight Unit */}
            <div className="mb-6">
              <h3 className="text-sm text-zinc-400 mb-2">Weight</h3>
              <div className="flex bg-zinc-800 rounded-lg p-1">
                <button 
                  className={`flex-1 py-2 rounded-md text-center transition ${units.weight === 'kg' ? 'bg-lime-600 text-black' : 'text-white'}`}
                  onClick={() => changeUnit('weight', 'kg')}
                >
                  Kilograms (kg)
                </button>
                <button 
                  className={`flex-1 py-2 rounded-md text-center transition ${units.weight === 'lb' ? 'bg-lime-600 text-black' : 'text-white'}`}
                  onClick={() => changeUnit('weight', 'lb')}
                >
                  Pounds (lb)
                </button>
              </div>
            </div>
            
            {/* Height Unit */}
            <div className="mb-6">
              <h3 className="text-sm text-zinc-400 mb-2">Height</h3>
              <div className="flex bg-zinc-800 rounded-lg p-1">
                <button 
                  className={`flex-1 py-2 rounded-md text-center transition ${units.height === 'cm' ? 'bg-lime-600 text-black' : 'text-white'}`}
                  onClick={() => changeUnit('height', 'cm')}
                >
                  Centimeters (cm)
                </button>
                <button 
                  className={`flex-1 py-2 rounded-md text-center transition ${units.height === 'ft' ? 'bg-lime-600 text-black' : 'text-white'}`}
                  onClick={() => changeUnit('height', 'ft')}
                >
                  Feet (ft)
                </button>
              </div>
            </div>
            
            {/* Distance Unit */}
            <div className="mb-6">
              <h3 className="text-sm text-zinc-400 mb-2">Distance</h3>
              <div className="flex bg-zinc-800 rounded-lg p-1">
                <button 
                  className={`flex-1 py-2 rounded-md text-center transition ${units.distance === 'km' ? 'bg-lime-600 text-black' : 'text-white'}`}
                  onClick={() => changeUnit('distance', 'km')}
                >
                  Kilometers (km)
                </button>
                <button 
                  className={`flex-1 py-2 rounded-md text-center transition ${units.distance === 'mi' ? 'bg-lime-600 text-black' : 'text-white'}`}
                  onClick={() => changeUnit('distance', 'mi')}
                >
                  Miles (mi)
                </button>
              </div>
            </div>
            
            <button 
              className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-black font-medium rounded-lg transition-colors mt-4"
              onClick={() => setActiveModal(null)}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
      
      {/* Modal: Privacy Settings - NEW */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-md w-full p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold kanit-bold">Privacy Settings</h2>
              <button 
                className="p-2 hover:bg-zinc-800 rounded-full" 
                onClick={() => setActiveModal(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Privacy Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-white font-medium">Public Profile</h3>
                  <p className="text-zinc-400 text-sm">Make your profile visible to other users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={privacySettings.publicProfile}
                    onChange={() => togglePrivacy('publicProfile')}
                  />
                  <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-lime-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-white font-medium">Share Activity</h3>
                  <p className="text-zinc-400 text-sm">Share your workouts with friends</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={privacySettings.shareActivity}
                    onChange={() => togglePrivacy('shareActivity')}
                  />
                  <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-lime-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-white font-medium">Show in Leaderboards</h3>
                  <p className="text-zinc-400 text-sm">Appear in public leaderboards</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={privacySettings.showInLeaderboards}
                    onChange={() => togglePrivacy('showInLeaderboards')}
                  />
                  <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-lime-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
            
            <button 
              className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-black font-medium rounded-lg transition-colors mt-8"
              onClick={() => setActiveModal(null)}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
      
      {/* Modal: Notifications */}
      {activeModal === 'notifications' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-md w-full p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold kanit-bold">Notifications</h2>
              <button 
                className="p-2 hover:bg-zinc-800 rounded-full" 
                onClick={() => setActiveModal(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Notification Settings */}
            <div className="space-y-4">
              {[
                { id: 'workoutReminders', label: 'Workout Reminders', desc: 'Get reminded about your scheduled workouts' },
                { id: 'progressUpdates', label: 'Progress Updates', desc: 'Weekly updates on your fitness progress' },
                { id: 'friendActivity', label: 'Friend Activity', desc: 'When friends complete workouts or reach goals' },
                { id: 'achievements', label: 'Achievements', desc: 'When you earn new badges or complete challenges' }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-zinc-800">
                  <div className="pr-4">
                    <h3 className="text-white font-medium">{item.label}</h3>
                    <p className="text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                  <div 
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notifications[item.id] ? 'bg-lime-600' : 'bg-zinc-700'}`}
                    onClick={() => toggleNotification(item.id)}
                  >
                    <div 
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications[item.id] ? 'left-7' : 'left-1'}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-black font-medium rounded-lg transition-colors mt-8"
              onClick={() => setActiveModal(null)}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
      
      {/* Modal: Contact Us */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-md w-full p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold kanit-bold">Contact Us</h2>
              <button 
                className="p-2 hover:bg-zinc-800 rounded-full" 
                onClick={() => setActiveModal(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Contact Form */}
            <form>
              <div className="mb-4">
                <label className="block text-zinc-400 text-sm mb-2" htmlFor="subject">
                  Subject
                </label>
                <select 
                  id="subject" 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-lime-500"
                >
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="account">Account Issues</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-zinc-400 text-sm mb-2" htmlFor="message">
                  Message
                </label>
                <textarea 
                  id="message"
                  rows="5"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-lime-500 resize-none"
                  placeholder="Describe your issue or question..."
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-zinc-400 text-sm mb-2" htmlFor="email">
                  Email Address
                </label>
                <input 
                  type="email"
                  id="email"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-lime-500"
                  placeholder="your-email@example.com"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-black font-medium rounded-lg transition-colors mt-4"
              >
                Send Message
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <h3 className="text-white font-medium mb-2">Other ways to reach us:</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@basick.com
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  1-800-BAS-SICK
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Settings;