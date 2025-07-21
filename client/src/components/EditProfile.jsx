import React, { useState, useEffect } from 'react';
import BottomNav from './BottonNav';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';
import useAuthStore from '../store/authStore';
import { useUser } from '../hooks/useUser';
import userService from '../services/userService';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, userId, userProfileId } = useAuthStore();
  const { updateCurrentUser, loading, error } = useUser();
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200");
  const [userProfile, setUserProfile] = useState(null);
  const [changedFields, setChangedFields] = useState(new Set()); // Track which fields have been changed
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    birthdate: "",
    height: "",
    weight: "",
    fitnessGoals: [], // Changed to array for multiple selections
    activityLevel: ""
  });

  // Fetch user profile data if userProfileId exists
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userProfileId) {
        try {
          const profile = await userService.getCurrentUserProfile();
          console.log('🔍 DEBUG - Fetched user profile:', profile);
          setUserProfile(profile);
        } catch (err) {
          console.warn('Could not fetch user profile:', err);
        }
      }
    };
    
    fetchUserProfile();
  }, [userProfileId]);

  useEffect(() => {
    console.log('🔍 DEBUG - EditProfile user object:', {
      user: user,
      userProfile: userProfile,
      userKeys: user ? Object.keys(user) : [],
      backendUser: user?.backendUser,
      backendUserKeys: user?.backendUser ? Object.keys(user.backendUser) : [],
      profileKeys: userProfile ? Object.keys(userProfile) : []
    });
    
    // More specific debugging for the fields we need
    console.log('🔍 DEBUG - Specific field values:', {
      height: {
        user: user?.height,
        backendUser: user?.backendUser?.height,
        profile: userProfile?.height
      },
      weight: {
        user: user?.weight,
        backendUser: user?.backendUser?.weight,
        profile: userProfile?.weight
      },
      dateOfBirth: {
        user: user?.dateOfBirth,
        backendUser: user?.backendUser?.dateOfBirth,
        profile: userProfile?.dateOfBirth
      },
      username: {
        user: user?.username,
        backendUser: user?.backendUser?.username,
        profile: userProfile?.username
      },
      fitnessGoals: {
        user: user?.fitnessGoals,
        userGoals: user?.goals,
        backendUser: user?.backendUser?.fitnessGoals,
        backendGoals: user?.backendUser?.goals,
        profile: userProfile?.fitnessGoals,
        profileGoals: userProfile?.goals
      },
      activityLevel: {
        user: user?.activityLevel,
        userFitnessLevel: user?.fitnessLevel,
        backendUser: user?.backendUser?.activityLevel,
        backendFitnessLevel: user?.backendUser?.fitnessLevel,
        profile: userProfile?.activityLevel,
        profileFitnessLevel: userProfile?.fitnessLevel
      }
    });
    
    if (user || userProfile) {
      // Try to get data from multiple possible sources
      const backendUser = user?.backendUser || {};
      const profile = userProfile || {};
      
      // Debug fitness goals extraction
      const fitnessGoalSources = {
        userFitnessGoals0: user?.fitnessGoals?.[0],
        userGoals0: user?.goals?.[0],
        backendFitnessGoals0: backendUser.fitnessGoals?.[0],
        backendGoals0: backendUser.goals?.[0],
        profileFitnessGoals0: profile.fitnessGoals?.[0],
        profileGoals0: profile.goals?.[0]
      };
      
      // Debug activity level extraction
      const activityLevelSources = {
        userFitnessLevel: user?.fitnessLevel,
        userActivityLevel: user?.activityLevel,
        backendFitnessLevel: backendUser.fitnessLevel,
        backendActivityLevel: backendUser.activityLevel,
        profileFitnessLevel: profile.fitnessLevel,
        profileActivityLevel: profile.activityLevel
      };
      
      console.log('🔍 DEBUG - Fitness Goal Sources:', fitnessGoalSources);
      console.log('🔍 DEBUG - Activity Level Sources:', activityLevelSources);
      
      const selectedFitnessGoals = user?.fitnessGoals || backendUser.fitnessGoals || profile.fitnessGoals || user?.goals || backendUser.goals || profile.goals || [];
      const selectedActivityLevel = user?.fitnessLevel || backendUser.fitnessLevel || profile.fitnessLevel || user?.activityLevel || backendUser.activityLevel || profile.activityLevel || "";
      
      console.log('🔍 DEBUG - Selected Values:', { selectedFitnessGoals, selectedActivityLevel });
      
      // Convert activity level to proper case for display (handle case insensitivity)
      const normalizeActivityLevel = (level) => {
        if (!level) return "";
        const levelLower = level.toLowerCase();
        if (levelLower === "beginner") return "Beginner";
        if (levelLower === "intermediate") return "Intermediate"; 
        if (levelLower === "advanced") return "Advanced";
        return level; // Return as-is if no match
      };
      
      setUserData({
        name: user?.name || backendUser.name || user?.displayName || profile.displayName || profile.firstName || "",
        email: user?.email || backendUser.email || profile.email || "",
        username: user?.username || backendUser.username || profile.username || "",
        phone: user?.phoneNumber || backendUser.phoneNumber || user?.phone || profile.phoneNumber || "",
        birthdate: user?.dateOfBirth || backendUser.dateOfBirth || profile.dateOfBirth ? 
          (user?.dateOfBirth || backendUser.dateOfBirth || profile.dateOfBirth).split('T')[0] : "",
        height: user?.height || backendUser.height || profile.height || "",
        weight: user?.weight || backendUser.weight || profile.weight || "",
        fitnessGoals: Array.isArray(selectedFitnessGoals) ? selectedFitnessGoals : [], // Allow empty/null values
        activityLevel: normalizeActivityLevel(selectedActivityLevel)
      });
      
      if(user?.profilePicture || user?.profilePictureUrl || backendUser.profilePictureUrl || profile.profilePictureUrl) {
        setProfileImage(user?.profilePicture || user?.profilePictureUrl || backendUser.profilePictureUrl || profile.profilePictureUrl);
      }
    }
  }, [user, userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    
    // Track that this field has been changed
    setChangedFields(prev => new Set(prev).add(name));
  };

  // Handle fitness goals checkbox changes
  const handleFitnessGoalChange = (goal) => {
    setUserData(prev => {
      const currentGoals = prev.fitnessGoals || [];
      const isSelected = currentGoals.includes(goal);
      
      let newGoals;
      if (isSelected) {
        // Remove goal if already selected
        newGoals = currentGoals.filter(g => g !== goal);
      } else {
        // Add goal if not selected
        newGoals = [...currentGoals, goal];
      }
      
      return { ...prev, fitnessGoals: newGoals };
    });
    
    // Track that this field has been changed
    setChangedFields(prev => new Set(prev).add('fitnessGoals'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedData = {
        name: userData.name,
        email: userData.email,
        username: userData.username,
        phone: userData.phone,
        dateOfBirth: userData.birthdate,
        height: Number(userData.height),
        weight: Number(userData.weight),
        fitnessGoals: userData.fitnessGoals || [], // Backend expects 'fitnessGoals' as array
        fitnessLevel: userData.activityLevel // This will be properly formatted from our normalize function
    };

    try {
      await updateCurrentUser(updatedData);
      console.log("Saving profile data:", updatedData);
      navigate('/profile');
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
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
                  className={`w-full bg-transparent border-b pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors ${
                    changedFields.has('name') 
                      ? 'border-lime-500 bg-zinc-900/30' 
                      : 'border-zinc-800'
                  }`}
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  className={`w-full bg-transparent border-b pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors ${
                    changedFields.has('username') 
                      ? 'border-lime-500 bg-zinc-900/30' 
                      : 'border-zinc-800'
                  }`}
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full bg-transparent border-b pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors ${
                    changedFields.has('email') 
                      ? 'border-lime-500 bg-zinc-900/30' 
                      : 'border-zinc-800'
                  }`}
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className={`w-full bg-transparent border-b pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors ${
                    changedFields.has('phone') 
                      ? 'border-lime-500 bg-zinc-900/30' 
                      : 'border-zinc-800'
                  }`}
                  value={userData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="birthdate"
                  className={`w-full border rounded-md py-2 px-3 text-white focus:outline-none focus:border-lime-500 transition-colors ${
                    changedFields.has('birthdate') 
                      ? 'bg-zinc-800 border-lime-500 ring-1 ring-lime-500/50' 
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
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
                    className={`w-full bg-transparent border-b pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors ${
                      changedFields.has('height') 
                        ? 'border-lime-500 bg-zinc-900/30' 
                        : 'border-zinc-800'
                    }`}
                    value={userData.height}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    className={`w-full bg-transparent border-b pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors ${
                      changedFields.has('weight') 
                        ? 'border-lime-500 bg-zinc-900/30' 
                        : 'border-zinc-800'
                    }`}
                    value={userData.weight}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-3">Fitness Goals</label>
                <div className={`space-y-3 p-3 border rounded-md transition-colors ${
                  changedFields.has('fitnessGoals') 
                    ? 'border-lime-500 bg-zinc-800/50 ring-1 ring-lime-500/50' 
                    : 'border-zinc-800 bg-zinc-900/50'
                }`}>
                  {[
                    'Lose weight',
                    'Build muscle', 
                    'Improve endurance',
                    'General fitness',
                    'Athletic performance'
                  ].map((goal) => (
                    <label key={goal} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={userData.fitnessGoals?.includes(goal) || false}
                        onChange={() => handleFitnessGoalChange(goal)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded-md mr-3 flex items-center justify-center transition-colors ${
                        userData.fitnessGoals?.includes(goal)
                          ? 'bg-lime-500 border-lime-500'
                          : 'border-zinc-600 group-hover:border-zinc-500'
                      }`}>
                        {userData.fitnessGoals?.includes(goal) && (
                          <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm transition-colors ${
                        userData.fitnessGoals?.includes(goal)
                          ? 'text-lime-500 font-medium'
                          : 'text-zinc-300 group-hover:text-white'
                      }`}>
                        {goal}
                      </span>
                    </label>
                  ))}
                  {userData.fitnessGoals?.length === 0 && (
                    <p className="text-zinc-500 text-xs italic">Select your fitness goals (optional)</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Activity Level</label>
                <select
                  name="activityLevel"
                  className={`w-full bg-zinc-900 border rounded-md py-2 px-3 text-white focus:outline-none focus:border-lime-500 transition-colors ${
                    changedFields.has('activityLevel') 
                      ? 'border-lime-500 bg-zinc-800 ring-1 ring-lime-500/50' 
                      : 'border-zinc-800'
                  }`}
                  value={userData.activityLevel}
                  onChange={handleChange}
                >
                  <option value="">Select your activity level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          <div className="px-5 mb-8 mt-auto sticky bottom-16 md:bottom-8 bg-gradient-to-t from-black via-black to-transparent pt-4">
            {error && <p className="text-red-500 text-center mb-2">{error.message || "An error occurred"}</p>}
            <button 
              type="submit"
              className="w-full py-3.5 bg-lime-500 rounded-full text-black font-medium kanit-medium hover:bg-lime-400 transition-colors disabled:bg-gray-500"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
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