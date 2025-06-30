import React from "react";
import BottomNav from "./BottonNav";
import { useNavigate, useLocation } from 'react-router-dom';

const trainerProfile = {
  name: "Jennifer James",
  specialization: "Functional Strength",
  experience: 6,
  completed: 46,
  activeClients: 25,
  rating: 4.6,
  profileImage: "/trainers/trainer2.jpg",

  reviews: {
    count: 174,
    averageRating: 4.6,
    reviewers: [
      "/user1.jpg",
      "/user2.jpg",
      "/user3.jpg",
    ],
    latest: {
      name: "Sharon Jem",
      rating: 4.8,
      timeAgo: "2d ago",
      comment:
        "Had such an amazing session with Maria. She instantly picked up on the level of my fitness and adjusted the workout to suit me whilst also pushing me to my limits.",
    },
  },
};

export default function TrainerProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const t = trainerProfile;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:border-r border-zinc-800 md:p-6">
        <h1 className="text-2xl font-bold mb-10 kanit-medium">baSICK</h1>

        <nav className="flex-1">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/home')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                isActive('/home') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="kanit-medium">Home</span>
            </button>

            <button
              onClick={() => navigate('/leaderboard')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                isActive('/leaderboard') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="kanit-medium">Statistics</span>
            </button>

            <button
              onClick={() => navigate('/workout-categories')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                isActive('/workout-categories') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="kanit-medium">Workouts</span>
            </button>
          </div>

          <div className="mt-auto pt-20">
            <button
              onClick={() => navigate('/profile')}
              className={`flex items-center w-full p-3 rounded-lg group ${
                isActive('/profile') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
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
              className={`flex items-center w-full p-3 rounded-lg group mt-2 ${
                isActive('/settings') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
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

      {/* Main Content */}
      <div className="flex-1 font-sans">
        <div className='absolute flex flex-row p-4 mt-6 z-20'>
          <button className="text-white text-2xl mb-4 cursor-pointer">
            <div className='absolute h-10 w-10 rounded-full bg-[#333333] opacity-50'>
              <h3 className='pt-1'>←</h3>
            </div>
          </button>
        </div>

        <div className="relative">
          <img
            src={t.profileImage}
            alt={t.name}
            className="w-full h-[350px] object-cover"
          />
          <button className="absolute top-4 left-4 text-white text-2xl">←</button>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-t-3xl -mt-20 z-10 relative">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{t.name}</h1>
              <p className="text-lime-400 text-sm">{t.specialization}</p>
            </div>
            <div className="bg-lime-400 p-3 rounded-full text-black">📞</div>
          </div>

          <div className="flex justify-between mt-6 bg-[#333333] p-4 rounded-xl text-center">
            <div>
              <p className="text-lg font-semibold">{t.experience}</p>
              <p className="text-sm text-gray-400">Experience</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{t.completed}</p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{t.activeClients}</p>
              <p className="text-sm text-gray-400">Active Clients</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Reviews</h2>
              <span className="bg-lime-400 text-black px-2 py-1 text-sm rounded font-bold">
                {t.reviews.averageRating}
              </span>
            </div>

            <div className="bg-[#333333] p-4 mt-4 rounded-xl">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{t.reviews.latest.name}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-lime-400 text-black text-xs font-bold px-2 py-0.5 rounded">
                    {t.reviews.latest.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    {t.reviews.latest.timeAgo}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-300">
                {t.reviews.latest.comment}
              </p>
            </div>

            <div className="mt-3">
              <button className="text-lime-400 text-sm font-medium">
                Read all reviews
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-lime-400 text-black py-3 rounded-xl text-lg font-semibold">
              Book an Appointment
            </button>
          </div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}