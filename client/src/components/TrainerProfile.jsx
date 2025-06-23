import React from "react";
import BottomNav from "./BottonNav";

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
        <BottomNav />
      </div>
    </div>
  );
}
