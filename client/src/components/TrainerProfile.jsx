import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BottomNav from "./BottonNav";
import SideNav from "./SideNav";

export default function TrainerProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await fetch(`/api/trainers/user/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch trainer profile');
        const data = await res.json();
        setTrainer(data);
      } catch (err) {
        setError(err.message || 'Error loading profile');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [userId]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <SideNav />
      <div className="flex-1 flex flex-col w-full relative">
        <div className="absolute inset-0 z-0">
          <img 
            src={trainer.profilePictureUrl} 
            alt="Profile Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 pt-16 flex flex-col items-center flex-grow px-4 sm:px-6 lg:px-24 pb-12">
          <div className='mb-4 self-start'>
            <button onClick={() => navigate(-1)} className="text-white text-xl hover:text-lime-400">
              ← Back to Community
            </button>
          </div>

          <div className="w-full pt-10 mt-16 max-w-2xl bg-[#1a1a1a]/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-center">
            <div>
              <div className="w-36 h-36 rounded-full mx-auto mb-4 overflow-hidden border-4 border-lime-400">
                <img src={trainer.profilePictureUrl} alt={trainer.businessName} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl font-bold mb-1">{trainer.businessName}</h1>
              <p className="text-lime-400 text-sm mb-2">{trainer.email}</p>
              <div className="text-sm text-zinc-400 mb-3">
                {trainer.location} • {trainer.timezone}
              </div>
              <p className="text-zinc-300 text-sm mb-6">{trainer.bio}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800 p-4 rounded-xl">
                  <p className="text-md font-bold text-lime-400">{trainer.certifications?.join(', ') || 'N/A'}</p>
                  <p className="text-xs text-zinc-400">Certifications</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl">
                  <p className="text-md font-bold text-lime-400">{trainer.specializations?.join(', ') || 'N/A'}</p>
                  <p className="text-xs text-zinc-400">Specializations</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button className="bg-lime-400 text-black px-6 py-2 rounded-xl font-semibold hover:bg-lime-300 transition-colors">
                  Follow
                </button>
                <button className="bg-zinc-800 p-2 rounded-xl hover:bg-zinc-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden z-20">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
