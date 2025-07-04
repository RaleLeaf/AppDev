import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handleSignOut = () => {
    navigate('/login');
  };

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
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" alt="Sarah Wegan" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-3xl font-bold kanit-bold">SARAH</h1>
                <h2 className="text-2xl font-light kanit-light">WEGAN</h2>
              </div>
              <p className="text-zinc-500 text-xs mt-1">Joined 2 months ago</p>
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