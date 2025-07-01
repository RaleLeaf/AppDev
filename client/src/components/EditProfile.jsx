import React from 'react';
import BottomNav from './BottonNav';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';

const EditProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation for desktop */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with back button and title */}
        <div className="p-5 flex items-center">
          <button className="p-2" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">EDIT PROFILE</h1>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mt-4 mb-8">
          <div className="relative mb-2">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-black rounded-full p-1 border border-zinc-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-5 flex-1">
          <div className="mb-6">
            <label className="block text-lime-500 text-xs mb-1">Name</label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none"
              defaultValue="Sarah Wegan"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lime-500 text-xs mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none"
              defaultValue="Sarah145@mail.com"
            />
          </div>
        </div>

        <div className="px-5 mb-12">
          <button className="w-full py-3 bg-lime-500 rounded-full text-black font-medium kanit-medium">
            Save
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EditProfile;