import React, { useState, useEffect } from 'react';
import BottomNav from './BottonNav';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';
import useAuthStore from '../store/authStore'; // Import your auth store

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore(); // Get user from auth store
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Initialize with empty user data structure matching your server models
  const [userData, setUserData] = useState({
    // User model fields (keeping only email)
    email: "",
    
    // UserProfile model fields
    displayName: "", // This will be the user's primary name
    bio: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    fitnessLevel: "BEGINNER", // BEGINNER, INTERMEDIATE, ADVANCED
    fitnessGoals: [],
    targetWeight: "",
    dailyCalorieGoal: "",
    weeklyWorkoutGoal: "",
    profilePictureUrl: "",
    
    // Additional fields for UI
    birthdate: ""
  });

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        // 1. Try to get from auth store first
        if (user) {
          setUserData(prev => ({
            ...prev,
            email: user.email || "",
            displayName: user.displayName || user.name || ""
          }));
          
          if (user.profilePictureUrl) {
            setProfileImage(user.profilePictureUrl);
          }
        }

        // 2. Try to get from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          try {
            const parsedData = JSON.parse(storedUserData);
            setUserData(prev => ({
              ...prev,
              ...parsedData,
              birthdate: parsedData.birthdate || calculateBirthdate(parsedData.age)
            }));
            
            if (parsedData.profilePictureUrl) {
              setProfileImage(parsedData.profilePictureUrl);
            }
          } catch (error) {
            console.error('Error parsing stored user data:', error);
          }
        }

        // 3. Try to fetch from API if authenticated
        if (isAuthenticated) {
          await fetchUserDataFromAPI();
        }
        
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user, isAuthenticated]);

  // Helper function to calculate birthdate from age
  const calculateBirthdate = (age) => {
    if (!age) return "";
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    return `${birthYear}-01-01`; // Default to January 1st
  };

  // Helper function to calculate age from birthdate
  const calculateAge = (birthdate) => {
    if (!birthdate) return "";
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age.toString();
  };

  // Fetch user data from your API
  const fetchUserDataFromAPI = async () => {
    try {
      const firebaseUid = localStorage.getItem('firebaseUid') || user?.uid || user?.firebaseUid;
      const authToken = localStorage.getItem('authToken') || user?.accessToken;
      
      if (!firebaseUid || !authToken) {
        console.log('No auth data available for API call');
        return;
      }

      // Fetch user data from your server
      const userResponse = await fetch(`http://localhost:8080/api/users/firebase/${firebaseUid}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (userResponse.ok) {
        const apiUserData = await userResponse.json();
        console.log('User data from API:', apiUserData);
        
        // Update user data with API response (only email now)
        setUserData(prev => ({
          ...prev,
          email: apiUserData.email || prev.email
        }));

        // Try to fetch user profile data
        try {
          const profileResponse = await fetch(`http://localhost:8080/api/userprofiles/user/${apiUserData.id}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            console.log('Profile data from API:', profileData);
            
            setUserData(prev => ({
              ...prev,
              displayName: profileData.displayName || prev.displayName,
              bio: profileData.bio || prev.bio,
              gender: profileData.gender || prev.gender,
              age: profileData.age?.toString() || prev.age,
              height: profileData.height?.toString() || prev.height,
              weight: profileData.weight?.toString() || prev.weight,
              fitnessLevel: profileData.fitnessLevel || prev.fitnessLevel,
              fitnessGoals: profileData.fitnessGoals || prev.fitnessGoals,
              targetWeight: profileData.targetWeight?.toString() || prev.targetWeight,
              dailyCalorieGoal: profileData.dailyCalorieGoal?.toString() || prev.dailyCalorieGoal,
              weeklyWorkoutGoal: profileData.weeklyWorkoutGoal?.toString() || prev.weeklyWorkoutGoal,
              profilePictureUrl: profileData.profilePictureUrl || prev.profilePictureUrl,
              birthdate: calculateBirthdate(profileData.age) || prev.birthdate
            }));

            if (profileData.profilePictureUrl) {
              setProfileImage(profileData.profilePictureUrl);
            }
          }
        } catch (profileError) {
          console.log('Profile data not found or error:', profileError);
        }

        // Store updated data in localStorage
        localStorage.setItem('userData', JSON.stringify({
          ...apiUserData,
          ...userData
        }));
      }
    } catch (error) {
      console.error('Error fetching user data from API:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
      // Update age when birthdate changes
      ...(name === 'birthdate' && { age: calculateAge(value) })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      console.log("Saving profile data:", userData);
      
      const firebaseUid = localStorage.getItem('firebaseUid') || user?.uid || user?.firebaseUid;
      const authToken = localStorage.getItem('authToken') || user?.accessToken;
      
      if (!firebaseUid || !authToken) {
        alert('Authentication required to save profile');
        return;
      }

      // Update user data (only email now)
      const userUpdateData = {
        email: userData.email
      };

      const userResponse = await fetch(`http://localhost:8080/api/users/firebase/${firebaseUid}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userUpdateData)
      });

      if (userResponse.ok) {
        console.log('User data updated successfully');
      }

      // Update profile data
      const profileUpdateData = {
        displayName: userData.displayName, // This is the user's primary name
        bio: userData.bio,
        gender: userData.gender,
        age: parseInt(userData.age) || null,
        height: parseFloat(userData.height) || null,
        weight: parseFloat(userData.weight) || null,
        fitnessLevel: userData.fitnessLevel,
        fitnessGoals: Array.isArray(userData.fitnessGoals) ? userData.fitnessGoals : [userData.fitnessGoals].filter(Boolean),
        targetWeight: parseFloat(userData.targetWeight) || null,
        dailyCalorieGoal: parseInt(userData.dailyCalorieGoal) || null,
        weeklyWorkoutGoal: parseInt(userData.weeklyWorkoutGoal) || null,
        profilePictureUrl: userData.profilePictureUrl || profileImage
      };

      // Try to update existing profile or create new one
      try {
        const profileResponse = await fetch(`http://localhost:8080/api/userprofiles/user/${firebaseUid}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileUpdateData)
        });

        if (profileResponse.ok) {
          console.log('Profile updated successfully');
        } else if (profileResponse.status === 404) {
          // Profile doesn't exist, create it
          const createResponse = await fetch(`http://localhost:8080/api/userprofiles`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...profileUpdateData,
              userId: firebaseUid
            })
          });

          if (createResponse.ok) {
            console.log('Profile created successfully');
          }
        }
      } catch (profileError) {
        console.error('Error updating profile:', profileError);
      }

      // Update localStorage - Store the displayName as userName for HomePage usage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userName', userData.displayName); // Store the name for HomePage

      // Show success message and navigate back
      alert('Profile updated successfully!');
      navigate('/profile');
      
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

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
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Facebook-style placeholder */}
                <div 
                  className={`w-full h-full bg-gray-600 flex items-center justify-center ${profileImage ? 'hidden' : 'flex'}`}
                  style={{ display: profileImage ? 'none' : 'flex' }}
                >
                  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <label className="absolute bottom-0 right-0 bg-lime-500 rounded-full p-2 border border-black cursor-pointer hover:bg-lime-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setProfileImage(e.target.result);
                      setUserData(prev => ({ ...prev, profilePictureUrl: e.target.result }));
                    };
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
                <label className="block text-zinc-400 text-xs mb-1">Name</label>
                <input
                  type="text"
                  name="displayName"
                  className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
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
                  placeholder="Enter your email"
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

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Gender</label>
                <select
                  name="gender"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Bio</label>
                <textarea
                  name="bio"
                  rows="3"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:outline-none focus:border-lime-500 transition-colors resize-none"
                  value={userData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
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
                    placeholder="Height in cm"
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
                    placeholder="Weight in kg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Fitness Level</label>
                <select
                  name="fitnessLevel"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:outline-none focus:border-lime-500 transition-colors"
                  value={userData.fitnessLevel}
                  onChange={handleChange}
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Target Weight (kg)</label>
                  <input
                    type="number"
                    name="targetWeight"
                    className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    value={userData.targetWeight}
                    onChange={handleChange}
                    placeholder="Target weight"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    value={userData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Daily Calorie Goal</label>
                  <input
                    type="number"
                    name="dailyCalorieGoal"
                    className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    value={userData.dailyCalorieGoal}
                    onChange={handleChange}
                    placeholder="Calories/day"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Weekly Workout Goal</label>
                  <input
                    type="number"
                    name="weeklyWorkoutGoal"
                    className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    value={userData.weeklyWorkoutGoal}
                    onChange={handleChange}
                    placeholder="Workouts/week"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 mb-8 mt-auto sticky bottom-16 md:bottom-8 bg-gradient-to-t from-black via-black to-transparent pt-4">
            <button 
              type="submit"
              disabled={saving}
              className="w-full py-3.5 bg-lime-500 rounded-full text-black font-medium kanit-medium hover:bg-lime-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving Changes...' : 'Save Changes'}
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