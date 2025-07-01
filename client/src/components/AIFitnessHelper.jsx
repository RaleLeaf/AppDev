import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottonNav";

export default function FitnessChat() {
  const navigate = useNavigate();
  
  // Handler for back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate back to previous page
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 pt-4 pb-16 font-sans flex flex-col">
      {/* Header with functional back button */}
      <div className="p-5 flex items-center sticky top-0 z-10 bg-[#1a1a1a]">
        <button 
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors" 
          onClick={handleBackClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl md:text-2xl font-bold kanit-bold mx-auto pr-8">Fitness Helper</h1>
      </div>

      {/* Chat content - now with responsive container */}
      <div className="flex-1 overflow-y-auto pb-20 max-w-3xl mx-auto w-full">
        {/* Greeting bubble */}
        <div className="bg-lime-400 text-black rounded-xl px-4 py-2 w-fit mb-2">
          Hello, Sarah!
        </div>

        {/* Message bubble */}
        <div className="bg-lime-400 text-black rounded-xl px-4 py-3 w-fit mb-6 max-w-[85%] md:max-w-[70%]">
          Based on your current progress and fitness level, I've customized the following fitness
          programs to suit your needs. Choose one to focus on for this month.
        </div>

        {/* Responsive grid for workout programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Program: Drill Essentials */}
          <div className="relative bg-white/5 border border-purple-500 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1" // placeholder
              alt="Drill Essentials"
              className="w-full h-40 md:h-48 object-cover"
            />
            <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white font-semibold text-sm md:text-base">Drill Essentials</div>
              <div className="text-lime-500 text-xs mt-1">06 Workouts · for Beginner</div>
            </div>
          </div>

          {/* Program: Wake Up Call */}
          <div className="relative bg-white/5 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" // placeholder
              alt="Wake Up Call"
              className="w-full h-40 md:h-48 object-cover"
            />
            <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white font-semibold text-sm md:text-base">Wake Up Call</div>
              <div className="text-lime-500 text-xs mt-1">04 Workouts · for 2× – 3× a Week</div>
            </div>
          </div>
          
          {/* Additional program for larger screens */}
          <div className="relative bg-white/5 border border-blue-500 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Strength Builder"
              className="w-full h-40 md:h-48 object-cover"
            />
            <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white font-semibold text-sm md:text-base">Strength Builder</div>
              <div className="text-lime-500 text-xs mt-1">08 Workouts · for Intermediate</div>
            </div>
          </div>
          
          {/* Additional program for larger screens */}
          <div className="relative bg-white/5 border border-amber-500 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Cardio Burst"
              className="w-full h-40 md:h-48 object-cover"
            />
            <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white font-semibold text-sm md:text-base">Cardio Burst</div>
              <div className="text-lime-500 text-xs mt-1">05 Workouts · for All Levels</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat input - fixed at bottom with responsive width */}
      <div className="fixed bottom-14 left-0 right-0 bg-[#1a1a1a] px-4 py-2 border-t border-zinc-700 flex items-center">
        <div className="max-w-3xl mx-auto w-full flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-zinc-800 text-white placeholder-gray-400 px-4 py-2 rounded-full outline-none focus:ring-1 focus:ring-lime-500"
          />
          <button className="ml-2 p-2 text-lime-400 hover:bg-zinc-800 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2v8m6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h6.586a1 1 0 01.707.293l6.414 6.414a1 1 0 01.293.707V20a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button className="ml-2 p-2 text-lime-400 hover:bg-zinc-800 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}