import React, { useState } from 'react';
import BottomNav from './BottonNav';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';

const EditProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200");
  
  // Mock user data with additional fields
  const [userData, setUserData] = useState({
    name: "Sarah Wegan",
    email: "Sarah145@mail.com",
    username: "sarahfitness",
    phone: "+1 (555) 123-4567",
    birthdate: "1992-06-15",
    height: "168",
    weight: "62",
    fitnessGoal: "Build muscle",
    activityLevel: "Intermediate"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic would go here
    console.log("Saving profile data:", userData);
    // Show success message or navigate back
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation for desktop */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0 max-w-3xl mx-auto w-full">
        {/* Header with back button and title */}
        <div className="p-5 flex items-center sticky top-0 bg-black z-10">
          <button className="p-2 hover:bg-zinc-900 rounded-full transition-colors" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">EDIT PROFILE</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mt-4 mb-8">
            <div className="relative mb-2">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-lime-500">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-lime-500 rounded-full p-2 border border-black cursor-pointer hover:bg-lime-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => setProfileImage(e.target.result);
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }} />
              </label>
            </div>
            <p className="text-zinc-400 text-sm mt-2">Tap the camera icon to change your profile picture</p>
          </div>

          <div className="px-5">
            <h2 className="text-lg font-semibold kanit-medium mb-4 text-lime-500">Personal Information</h2>
            
            {/* Basic Information */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-zinc-400 text-xs mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="birthdate"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.birthdate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Fitness Information */}
            <h2 className="text-lg font-semibold kanit-medium mb-4 mt-8 text-lime-500">Fitness Details</h2>
            
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    value={userData.height}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    value={userData.weight}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Fitness Goal</label>
                <select
                  name="fitnessGoal"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.fitnessGoal}
                  onChange={handleChange}
                >
                  <option value="Lose weight">Lose weight</option>
                  <option value="Build muscle">Build muscle</option>
                  <option value="Improve endurance">Improve endurance</option>
                  <option value="General fitness">General fitness</option>
                  <option value="Athletic performance">Athletic performance</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Activity Level</label>
                <select
                  name="activityLevel"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.activityLevel}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          <div className="px-5 mb-8 mt-auto sticky bottom-16 md:bottom-8 bg-gradient-to-t from-black via-black to-transparent pt-4">
            <button 
              type="submit"
              className="w-full py-3.5 bg-lime-500 rounded-full text-black font-medium kanit-medium hover:bg-lime-400 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default EditProfile;