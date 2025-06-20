import React from "react";

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
  const t = trainerProfile;

  return (
    <div className="min-h-screen bg-black text-white font-sans">

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
    </div>
  );
}
