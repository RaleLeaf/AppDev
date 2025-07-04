import React, { useState } from "react";
import BottomNav from "./BottonNav";
import { useNavigate, useLocation } from 'react-router-dom';
import SideNav from "./SideNav";

const userProfile = {
  name: "Michael Thompson",
  username: "@mike_fitness",
  memberSince: "March 2023",
  profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
  bio: "Fitness enthusiast focused on strength training and running. Love challenging myself with new routines!",
  location: "Seattle, WA",
  stats: {
    workoutsCompleted: 86,
    daysActive: 124,
    achievements: 14
  },
  recentActivity: [
    {
      type: "workout",
      name: "Full Body HIIT",
      date: "2 days ago",
      duration: "45 min",
      calories: 420
    },
    {
      type: "achievement",
      name: "30 Day Streak",
      date: "1 week ago",
      icon: "🏆"
    },
    {
      type: "workout",
      name: "Upper Body Focus",
      date: "1 week ago",
      duration: "35 min",
      calories: 310
    }
  ],
  goals: {
    current: "Lose 10 lbs by August",
    progress: 65
  },
  friends: 34
};

export default function TrainerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('activity'); // 'activity', 'stats', 'achievements'
  const u = userProfile;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* SideNav component for desktop */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:px-12 lg:py-8">
        {/* Back Button */}
        <div className='absolute flex p-4 mt-6 z-20 lg:hidden'>
          <button onClick={() => navigate(-1)} className="text-white text-2xl cursor-pointer">
            ←
          </button>
        </div>

        {/* Desktop back button */}
        <div className='hidden lg:block mb-6'>
          <button onClick={() => navigate(-1)} className="text-white text-xl hover:text-lime-400">
            ← Back to Community
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex-1 bg-[#1a1a1a] rounded-2xl p-6 lg:flex lg:flex-col">
          {/* User Header Section */}
          <div className="lg:flex lg:items-start lg:gap-8">
            {/* Profile Image and Basic Info */}
            <div className="flex flex-col items-center lg:items-start lg:flex-row lg:gap-6 mb-8">
              {/* Profile Image with Status Ring */}
              <div className="relative mb-4 lg:mb-0">
                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-lime-500">
                  <img
                    src={u.profileImage}
                    alt={u.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-lime-500 rounded-full p-1 border-2 border-black">
                  <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-lime-500"></div>
                  </div>
                </div>
              </div>
              
              {/* User Info */}
              <div className="text-center lg:text-left">
                <h1 className="text-2xl font-bold mb-1">{u.name}</h1>
                <p className="text-lime-400 text-sm mb-3">{u.username}</p>
                <div className="flex items-center justify-center lg:justify-start text-xs text-zinc-400 gap-3 mb-3">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Member since {u.memberSince}
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {u.location}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 max-w-md">{u.bio}</p>
              </div>
            </div>
            
            {/* Stats Cards - Desktop View */}
            <div className="hidden lg:flex gap-4 mt-2 ml-auto">
              <div className="bg-zinc-800 p-4 rounded-xl text-center min-w-[110px]">
                <p className="text-2xl font-bold text-lime-400">{u.stats.workoutsCompleted}</p>
                <p className="text-xs text-zinc-400">Workouts</p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl text-center min-w-[110px]">
                <p className="text-2xl font-bold text-lime-400">{u.stats.daysActive}</p>
                <p className="text-xs text-zinc-400">Active Days</p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl text-center min-w-[110px]">
                <p className="text-2xl font-bold text-lime-400">{u.stats.achievements}</p>
                <p className="text-xs text-zinc-400">Achievements</p>
              </div>
            </div>
          </div>
          
          {/* Stats Cards - Mobile View */}
          <div className="grid grid-cols-3 gap-2 mb-6 lg:hidden">
            <div className="bg-zinc-800 p-3 rounded-xl text-center">
              <p className="text-lg font-bold text-lime-400">{u.stats.workoutsCompleted}</p>
              <p className="text-xs text-zinc-400">Workouts</p>
            </div>
            <div className="bg-zinc-800 p-3 rounded-xl text-center">
              <p className="text-lg font-bold text-lime-400">{u.stats.daysActive}</p>
              <p className="text-xs text-zinc-400">Active Days</p>
            </div>
            <div className="bg-zinc-800 p-3 rounded-xl text-center">
              <p className="text-lg font-bold text-lime-400">{u.stats.achievements}</p>
              <p className="text-xs text-zinc-400">Achievements</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 bg-lime-400 text-black py-2.5 rounded-xl font-semibold hover:bg-lime-300 transition-colors">
              Follow
            </button>
            <button className="flex items-center justify-center bg-zinc-800 p-2.5 rounded-xl hover:bg-zinc-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="flex items-center justify-center bg-zinc-800 p-2.5 rounded-xl hover:bg-zinc-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-zinc-800 mb-6">
            <button 
              className={`py-2 px-4 text-sm font-medium ${activeTab === 'activity' ? 'text-lime-400 border-b-2 border-lime-400' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setActiveTab('activity')}
            >
              Recent Activity
            </button>
            <button 
              className={`py-2 px-4 text-sm font-medium ${activeTab === 'stats' ? 'text-lime-400 border-b-2 border-lime-400' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setActiveTab('stats')}
            >
              Stats
            </button>
            <button 
              className={`py-2 px-4 text-sm font-medium ${activeTab === 'achievements' ? 'text-lime-400 border-b-2 border-lime-400' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                {u.recentActivity.map((activity, index) => (
                  <div key={index} className="bg-zinc-800 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-zinc-400 mb-1">{activity.type === 'workout' ? 'Completed Workout' : 'Earned Achievement'}</p>
                        <h3 className="font-medium">{activity.name}</h3>
                      </div>
                      <p className="text-xs text-zinc-500">{activity.date}</p>
                    </div>
                    
                    {activity.type === 'workout' && (
                      <div className="mt-3 flex gap-4 text-xs text-zinc-400">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {activity.duration}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                          </svg>
                          {activity.calories} cal
                        </span>
                      </div>
                    )}
                    
                    {activity.type === 'achievement' && (
                      <div className="mt-3 flex items-center text-xs">
                        <span className="text-xl mr-2">{activity.icon}</span>
                        <span className="text-zinc-400">Congratulations on your achievement!</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                {/* Current Goal */}
                <div className="bg-zinc-800 rounded-xl p-4">
                  <h3 className="font-medium mb-1">Current Goal</h3>
                  <p className="text-sm text-zinc-300 mb-3">{u.goals.current}</p>
                  <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-lime-400" 
                      style={{width: `${u.goals.progress}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-zinc-400">
                    <span>Progress</span>
                    <span>{u.goals.progress}%</span>
                  </div>
                </div>
                
                {/* Weekly Activity */}
                <div className="bg-zinc-800 rounded-xl p-4">
                  <h3 className="font-medium mb-4">Weekly Activity</h3>
                  <div className="flex justify-between items-end h-40 px-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={day + i} className="flex flex-col items-center">
                        <div 
                          className={`w-8 ${i === 2 || i === 5 ? 'h-28' : i === 0 || i === 3 ? 'h-20' : 'h-12'} rounded-t-md ${i === new Date().getDay() ? 'bg-lime-400' : 'bg-zinc-600'}`}
                        ></div>
                        <span className="mt-2 text-xs text-zinc-400">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Friend Count */}
                <div className="bg-zinc-800 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Friends</h3>
                    <p className="text-sm text-zinc-400">Connect with more fitness enthusiasts</p>
                  </div>
                  <div className="bg-black px-3 py-1 rounded-full font-semibold">
                    {u.friends}
                  </div>
                </div>
              </div>
            )}
            
            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h3 className="font-medium text-sm">30 Day Streak</h3>
                  <p className="text-xs text-zinc-400 mt-1">Jun 2023</p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💪</div>
                  <h3 className="font-medium text-sm">100 Workouts</h3>
                  <p className="text-xs text-zinc-400 mt-1">May 2023</p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🔥</div>
                  <h3 className="font-medium text-sm">5K Run</h3>
                  <p className="text-xs text-zinc-400 mt-1">Apr 2023</p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🥇</div>
                  <h3 className="font-medium text-sm">Challenge Winner</h3>
                  <p className="text-xs text-zinc-400 mt-1">Mar 2023</p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center opacity-40">
                  <div className="text-3xl mb-2">🏋️</div>
                  <h3 className="font-medium text-sm">200lb Club</h3>
                  <p className="text-xs text-zinc-400 mt-1">Locked</p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center opacity-40">
                  <div className="text-3xl mb-2">🏃</div>
                  <h3 className="font-medium text-sm">Marathon</h3>
                  <p className="text-xs text-zinc-400 mt-1">Locked</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav for mobile */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}