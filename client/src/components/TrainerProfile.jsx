import React from "react";
import BottomNav from "./BottonNav";
import { useNavigate, useLocation } from 'react-router-dom';
import SideNav from "./SideNav";

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
            ← Back to Trainers
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex-1 bg-[#1a1a1a] rounded-2xl p-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          {/* Left Panel */}
          <div className="space-y-6">
            <div className="relative">
              <img
                src={t.profileImage}
                alt={t.name}
                className="w-full h-[350px] object-cover rounded-xl lg:h-[500px]"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded text-sm">
                <span className="text-white font-semibold">{t.specialization}</span>
              </div>
            </div>

            <div className="flex justify-between bg-[#333333] p-4 rounded-xl text-center">
              <div>
                <p className="text-lg font-semibold">{t.experience}</p>
                <p className="text-sm text-gray-400">Years Exp.</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{t.completed}</p>
                <p className="text-sm text-gray-400">Sessions</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{t.activeClients}</p>
                <p className="text-sm text-gray-400">Clients</p>
              </div>
            </div>

            <button className="w-full bg-lime-400 text-black py-3 rounded-xl text-lg font-semibold lg:hidden">
              Book Appointment
            </button>
          </div>

          {/* Right Panel */}
          <div className="mt-8 lg:mt-0">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">{t.name}</h1>
                <p className="text-lime-400 text-sm">{t.specialization}</p>
              </div>
              <div className="bg-lime-400 p-3 rounded-full text-black cursor-pointer">
                📞
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Reviews</h2>
                <span className="bg-lime-400 text-black px-3 py-1 text-sm rounded font-bold">
                  {t.reviews.averageRating} ({t.reviews.count})
                </span>
              </div>

              <div className="bg-[#333333] p-4 mt-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-md">{t.reviews.latest.name}</p>
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

              <button className="mt-4 text-lime-400 text-sm font-medium hover:underline">
                Read all reviews
              </button>
            </div>

            <button className="hidden lg:block mt-8 w-full bg-lime-400 text-black py-4 rounded-xl text-lg font-semibold hover:bg-lime-300">
              Book an Appointment
            </button>
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