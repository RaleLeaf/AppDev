import React from "react";
import BottomNav from "./BottonNav";

export default function FitnessChat() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 pt-4 pb-16 font-sans">
      <div className="p-5 flex items-center">
        <button className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">Fitness Helper</h1>
      </div>

      {/* Greeting bubble */}
      <div className="bg-lime-400 text-black rounded-xl px-4 py-2 w-fit mb-2">
        Hello, Sarah!
      </div>

      {/* Message bubble */}
      <div className="bg-lime-400 text-black rounded-xl px-4 py-3 w-fit mb-6 max-w-[85%]">
        Based on your current progress and fitness level, I’ve customized the following fitness
        programs to suit your needs. Choose one to focus on for this month.
      </div>

      {/* Program: Drill Essentials */}
      <div className="relative bg-white/5 border border-purple-500 rounded-xl overflow-hidden mb-4">
        <img
          src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1" // placeholder
          alt="Drill Essentials"
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white font-semibold text-sm">Drill Essentials</div>
          <div className="text-lime-500 text-xs mt-1">06 Workouts · for Beginner</div>
        </div>
    
      </div>

      {/* Program: Wake Up Call */}
      <div className="relative bg-white/5 rounded-xl overflow-hidden mb-4">
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" // placeholder
          alt="Wake Up Call"
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white font-semibold text-sm">Wake Up Call</div>
          <div className="text-lime-500 text-xs mt-1">04 Workouts · for 2× – 3× a Week</div>
        </div>
      </div>

      {/* Spacer */}
      {/* Chat input */}
      <div className="fixed bottom-14 left-0 right-0 bg-[#1a1a1a] px-4 py-2 border-t border-zinc-700 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-zinc-800 text-white placeholder-gray-400 px-4 py-2 rounded-full outline-none"
        />
        <button className="ml-2 text-lime-400 text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2v8m6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h6.586a1 1 0 01.707.293l6.414 6.414a1 1 0 01.293.707V20a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
