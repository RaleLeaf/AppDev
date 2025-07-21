import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';
import useAuthStore from '../store/authStore';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuthStore();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // User data state with Facebook-style placeholder avatar
  const [userData, setUserData] = useState({
    displayName: 'User',
    email: '',
    profilePictureUrl: "",
    joinedDate: '',
    bio: '',
    // Profile data
    height: null,
    weight: null,
    bmi: null,
    bmiCategory: '',
    dateOfBirth: '',
    age: null,
    fitnessLevel: '',
    fitnessGoals: []
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
            displayName: user.displayName || user.name || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            profilePictureUrl: user.profilePictureUrl || ""
          }));
        }

        // 2. Try to get from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          try {
            const parsedData = JSON.parse(storedUserData);
            setUserData(prev => ({
              ...prev,
              displayName: parsedData.displayName || parsedData.name || prev.displayName,
              email: parsedData.email || prev.email,
              profilePictureUrl: parsedData.profilePictureUrl || "",
              bio: parsedData.bio || prev.bio,
              joinedDate: parsedData.createdAt ? formatJoinDate(parsedData.createdAt) : prev.joinedDate
            }));
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
  }, [user, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  // Format join date
  const formatJoinDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return `Joined ${diffDays} days ago`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `Joined ${months} month${months > 1 ? 's' : ''} ago`;
      } else {
        const years = Math.floor(diffDays / 365);
        return `Joined ${years} year${years > 1 ? 's' : ''} ago`;
      }
    } catch {
      return 'Member since recently';
    }
  };

  // Fetch user data from API
  const fetchUserDataFromAPI = async () => {
    try {
      const firebaseUid = localStorage.getItem('firebaseUid') || user?.uid || user?.firebaseUid;
      const authToken = localStorage.getItem('authToken') || user?.accessToken;
      
      console.log('🔍 Debug - Auth data check:');
      console.log('firebaseUid:', firebaseUid);
      console.log('authToken:', authToken ? 'EXISTS' : 'MISSING');
      console.log('user object:', user);
      
      if (!firebaseUid || !authToken) {
        console.log('❌ No auth data available for API call');
        return;
      }

      console.log('📡 Fetching user data from:', `http://localhost:8080/api/users/firebase/${firebaseUid}`);
      
      // Fetch user data from your server
      const userResponse = await fetch(`http://localhost:8080/api/users/firebase/${firebaseUid}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('👤 User response status:', userResponse.status, userResponse.statusText);

      if (userResponse.ok) {
        const apiUserData = await userResponse.json();
        console.log('✅ User data from API:', apiUserData);
        console.log('📋 User data keys:', Object.keys(apiUserData));
        console.log('🆔 User ID from API:', apiUserData.id);
        console.log('🔥 Firebase UID:', firebaseUid);
        
        // Update user data with API response
        setUserData(prev => ({
          ...prev,
          displayName: apiUserData.name || apiUserData.displayName || prev.displayName,
          email: apiUserData.email || prev.email,
          joinedDate: apiUserData.createdAt ? formatJoinDate(apiUserData.createdAt) : prev.joinedDate
        }));

        // Try to fetch user profile data for additional info
        // Use user ID if available, otherwise use Firebase UID
        const profileEndpoint = apiUserData.id 
          ? `http://localhost:8080/api/user-profiles/by-user/${apiUserData.id}`
          : `http://localhost:8080/api/user-profiles/by-firebase/${firebaseUid}`;
        
        console.log('📡 Fetching profile data from:', profileEndpoint);

        try {
          const profileResponse = await fetch(profileEndpoint, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });

          console.log('🏃‍♂️ Profile response status:', profileResponse.status, profileResponse.statusText);

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            console.log('✅ Profile data from API:', profileData);
            console.log('📋 Profile data keys:', Object.keys(profileData));
            console.log('📊 BMI:', profileData.bmi);
            console.log('📏 Height:', profileData.height);
            console.log('⚖️ Weight:', profileData.weight);
            console.log('🎂 Age:', profileData.age);
            console.log('📅 Date of Birth:', profileData.dateOfBirth);
            console.log('💪 Fitness Level:', profileData.fitnessLevel);
            console.log('🎯 Fitness Goals:', profileData.fitnessGoals);
            
            setUserData(prev => ({
              ...prev,
              displayName: profileData.displayName || prev.displayName,
              bio: profileData.bio || prev.bio,
              profilePictureUrl: profileData.profilePictureUrl || "",
              // Add profile specific data
              height: profileData.height,
              weight: profileData.weight,
              bmi: profileData.bmi,
              bmiCategory: profileData.bmiCategory,
              dateOfBirth: profileData.dateOfBirth,
              age: profileData.age,
              fitnessLevel: profileData.fitnessLevel,
              fitnessGoals: profileData.fitnessGoals || []
            }));
          } else {
            console.log('❌ Profile response not OK:', profileResponse.status, profileResponse.statusText);
            
            // Try to get response text for more details
            try {
              const errorText = await profileResponse.text();
              console.log('❌ Profile error details:', errorText);
            } catch {
              console.log('❌ Could not read profile error response');
            }
          }
        } catch (profileError) {
          console.log('❌ Profile data fetch error:', profileError);
        }

        // Store updated data in localStorage
        localStorage.setItem('userData', JSON.stringify({
          ...apiUserData,
          ...userData
        }));
      } else {
        console.log('❌ User response not OK:', userResponse.status, userResponse.statusText);
        
        // Try to get response text for more details
        try {
          const errorText = await userResponse.text();
          console.log('❌ User error details:', errorText);
        } catch {
          console.log('❌ Could not read user error response');
        }
      }
    } catch (error) {
      console.error('❌ Error fetching user data from API:', error);
    }
  };

  // Split display name for styling
  const getDisplayNames = () => {
    const fullName = userData.displayName || 'User';
    const nameParts = fullName.split(' ');
    
    if (nameParts.length === 1) {
      return { firstName: nameParts[0].toUpperCase(), lastName: '' };
    } else {
      return { 
        firstName: nameParts[0].toUpperCase(), 
        lastName: nameParts.slice(1).join(' ').toUpperCase() 
      };
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear local storage
      localStorage.removeItem('userData');
      localStorage.removeItem('userName');
      localStorage.removeItem('firebaseUid');
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
      // Still navigate to login even if signOut fails
      navigate('/login');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const { firstName, lastName } = getDisplayNames();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SideNav - Only visible on medium screens and up */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Header with back button */}
          <div className="p-5 flex items-center">
            <button className="p-2 md:hidden" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="hidden md:block text-3xl font-bold kanit-bold">PROFILE</h1>
          </div>

          {/* Profile Section */}
          <div className="px-5 mb-8 flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="8" />
                  <path d="M50,5 A45,45 0 0,1 95,50 A45,45 0 0,1 50,95" fill="none" stroke="#ff4545" strokeWidth="8" strokeLinecap="round" />
                  <path d="M50,95 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" fill="none" stroke="#c2e200" strokeWidth="8" strokeLinecap="round" />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full overflow-hidden border-2 border-black">
                  {userData.profilePictureUrl ? (
                    <img 
                      src={userData.profilePictureUrl} 
                      alt={userData.displayName} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  {/* Facebook-style placeholder */}
                  <div 
                    className={`w-full h-full bg-gray-600 flex items-center justify-center ${userData.profilePictureUrl ? 'hidden' : 'block'}`}
                    style={{ display: userData.profilePictureUrl ? 'none' : 'flex' }}
                  >
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-3xl font-bold kanit-bold">{firstName}</h1>
                {lastName && <h2 className="text-2xl font-light kanit-light">{lastName}</h2>}
              </div>
              <p className="text-zinc-500 text-xs mt-1">
                {userData.joinedDate || 'Member since recently'}
              </p>
              {userData.bio && (
                <p className="text-gray-400 text-sm mt-2 text-center max-w-sm">
                  {userData.bio}
                </p>
              )}
              {userData.email && (
                <p className="text-gray-500 text-xs mt-1">
                  {userData.email}
                </p>
              )}
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="px-5 mb-6">
            {/* Health & Fitness Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
              {/* BMI Section */}
              {userData.bmi && (
                <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                  <h3 className="font-semibold text-white mb-2 kanit-medium">Health Metrics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center bg-zinc-800/50 rounded-lg p-2">
                      <p className="text-xl font-bold text-lime-500 kanit-semibold">{parseFloat(userData.bmi).toFixed(2)}</p>
                      <p className="text-xs text-gray-400">BMI</p>
                    </div>
                    <div className="text-center bg-zinc-800/50 rounded-lg p-2">
                      <p className="text-sm font-medium text-white capitalize kanit-medium">{userData.bmiCategory?.toLowerCase()}</p>
                      <p className="text-xs text-gray-400">Category</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Physical Stats */}
              {(userData.height || userData.weight) && (
                <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                  <h3 className="font-semibold text-white mb-2 kanit-medium">Physical Stats</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {userData.height && (
                      <div className="text-center bg-zinc-800/50 rounded-lg p-2">
                        <p className="text-lg font-bold text-green-500 kanit-semibold">{parseFloat(userData.height).toFixed(2)} cm</p>
                        <p className="text-xs text-gray-400">Height</p>
                      </div>
                    )}
                    {userData.weight && (
                      <div className="text-center bg-zinc-800/50 rounded-lg p-2">
                        <p className="text-lg font-bold text-purple-500 kanit-semibold">{parseFloat(userData.weight).toFixed(2)} kg</p>
                        <p className="text-xs text-gray-400">Weight</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Personal Info */}
              {(userData.age || userData.dateOfBirth) && (
                <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                  <h3 className="font-semibold text-white mb-2 kanit-medium">Personal Info</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {userData.age && (
                      <div className="text-center bg-zinc-800/50 rounded-lg p-2">
                        <p className="text-lg font-bold text-orange-500 kanit-semibold">{userData.age}</p>
                        <p className="text-xs text-gray-400">Age</p>
                      </div>
                    )}
                    {userData.dateOfBirth && (
                      <div className="text-center bg-zinc-800/50 rounded-lg p-2">
                        <p className="text-sm font-medium text-white kanit-medium">
                          {new Date(userData.dateOfBirth).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400">Birthday</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Fitness Info */}
              {(userData.fitnessLevel || (userData.fitnessGoals && userData.fitnessGoals.length > 0)) && (
                <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                  <h3 className="font-semibold text-white mb-2 kanit-medium">Fitness Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {userData.fitnessLevel && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Fitness Level</p>
                        <p className="font-medium text-white capitalize kanit-medium">{userData.fitnessLevel.toLowerCase()}</p>
                      </div>
                    )}
                    {userData.fitnessGoals && userData.fitnessGoals.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Fitness Goals</p>
                        <div className="flex flex-wrap gap-1">
                          {userData.fitnessGoals.map((goal, index) => (
                            <span key={index} className="bg-lime-500/20 text-lime-400 text-xs px-2 py-1 rounded-full kanit-regular">
                              {goal}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-5 flex-1">
            <Link to="/edit-profile" className="w-full flex justify-between items-center py-3 border-b border-zinc-800 hover:bg-zinc-900/40 rounded-md px-3 transition-colors">
              <span className="kanit-regular">Edit Profile</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>

            <button 
              onClick={() => setShowPrivacyPolicy(true)} 
              className="w-full flex justify-between items-center py-3 border-b border-zinc-800 hover:bg-zinc-900/40 rounded-md px-3 transition-colors"
            >
              <span className="kanit-regular">Privacy Policy</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <Link to="/settings" className="w-full flex justify-between items-center py-3 border-b border-zinc-800 hover:bg-zinc-900/40 rounded-md px-3 transition-colors">
              <span className="kanit-regular">Settings</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>

            <button onClick={handleSignOut} className="w-full py-4 text-red-600 text-center kanit-medium mt-4 hover:bg-zinc-900/40 rounded-md transition-colors">
              Sign Out
            </button>
          </div>
        </div>

        {/* Bottom Navigation - Only visible on mobile and small tablets */}
        <div className="md:hidden fixed bottom-0 left-0 right-0">
          <BottomNav />
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-3xl w-full p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center sticky top-0 bg-zinc-900 pb-4 border-b border-zinc-800 mb-5">
              <h2 className="text-xl font-bold kanit-bold">Privacy Policy</h2>
              <button 
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors" 
                onClick={() => setShowPrivacyPolicy(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6 text-zinc-300">
              <div>
                <h3 className="text-lg font-semibold text-lime-400 mb-2">Introduction</h3>
                <p className="mb-2">At BaSick, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application or website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-400 mb-2">Information We Collect</h3>
                <p className="mb-2">We may collect information about you in various ways. The information we may collect via the Application includes:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><span className="text-white">Personal Data:</span> Personally identifiable information, such as your name, email address, telephone number, and demographic information that you voluntarily give to us when you register with the Application or when you choose to participate in various activities related to the Application.</li>
                  <li><span className="text-white">Derivative Data:</span> Information our servers automatically collect when you access the Application, such as your IP address, browser type, operating system, access times, and the pages you have viewed.</li>
                  <li><span className="text-white">Financial Data:</span> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services.</li>
                  <li><span className="text-white">Health Data:</span> Information about your physical activities, workouts, nutrition, body measurements, and fitness goals.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-400 mb-2">Use of Your Information</h3>
                <p className="mb-2">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Create and manage your account.</li>
                  <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
                  <li>Deliver targeted advertising, newsletters, and other information regarding promotions and the Application to you.</li>
                  <li>Email you regarding your account or order.</li>
                  <li>Enable user-to-user communications.</li>
                  <li>Generate a personal profile about you to make future visits to the Application more personalized.</li>
                  <li>Increase the efficiency and operation of the Application.</li>
                  <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
                  <li>Notify you of updates to the Application.</li>
                  <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                  <li>Process payments and refunds.</li>
                  <li>Request feedback and contact you about your use of the Application.</li>
                  <li>Resolve disputes and troubleshoot problems.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-400 mb-2">Disclosure of Your Information</h3>
                <p className="mb-2">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><span className="text-white">By Law or to Protect Rights:</span> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                  <li><span className="text-white">Third-Party Service Providers:</span> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                  <li><span className="text-white">Marketing Communications:</span> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.</li>
                  <li><span className="text-white">Interactions with Other Users:</span> If you interact with other users of the Application, those users may see your name, profile photo, and descriptions of your activity.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-400 mb-2">Security of Your Information</h3>
                <p className="mb-2">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-400 mb-2">Contact Us</h3>
                <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                <p className="mt-2"><strong>BaSick Fitness</strong><br />privacy@basick.com<br />1-800-BAS-SICK</p>
              </div>
            </div>
            
            <button 
              className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-black font-medium rounded-lg transition-colors mt-6"
              onClick={() => setShowPrivacyPolicy(false)}
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;