import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const UsersFeed = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  // Enhanced feed data with more details
  const posts = [
    {
      id: 1,
      user: {
        name: 'SARAH WEGAN',
        username: '@sarah_wegan96',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
        isVerified: true
      },
      timestamp: '2h ago',
      content: 'Starting my day right with a quick 20-minute HIIT session! Feeling energized and ready to crush the day. #MorningWorkout #BaSickRoutine',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000',
      likes: 19,
      comments: 3,
      shares: 2,
      hasLiked: false,
      tags: ['HIIT', 'Morning']
    },
    {
      id: 2,
      user: {
        name: 'John Welkin',
        username: '@jwelkin31',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200',
        isVerified: false
      },
      timestamp: '5h ago',
      content: 'Just set a new PR!!! 225lb bench for 5 reps, been working towards this for months. Hard work and consistency really do pay off! Thanks to the baSICK app for helping me track my progress.',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000',
      likes: 8,
      comments: 1,
      shares: 0,
      hasLiked: true,
      tags: ['PR', 'Strength']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SideNav - Only visible on medium screens and up */}
      <SideNav />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        {/* Content Container - Centered properly for all screen sizes */}
        <div className="w-full max-w-2xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Header */}
          <div className="p-5 flex items-center justify-between sticky top-0 bg-black/95 backdrop-blur-sm z-10">
            <h1 className="text-xl md:text-2xl font-bold kanit-bold tracking-wider">USERS FEED</h1>
            <button className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Post Creation - Desktop only */}
          <div className="hidden md:flex mx-4 mb-6 bg-zinc-900/60 rounded-xl p-4 items-center shadow-lg">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" 
                alt="Your Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 bg-zinc-800/80 rounded-full px-5 py-3 cursor-text hover:bg-zinc-800 transition-colors">
              <span className="text-zinc-400">Share your workout progress...</span>
            </div>
            <button className="ml-3 bg-lime-600 hover:bg-lime-500 text-black font-medium rounded-full px-5 py-2.5 transition-colors flex-shrink-0">
              Post
            </button>
          </div>

          {/* Filter Pills - Desktop only */}
          <div className="hidden md:flex mx-4 mb-4 space-x-2">
            {['All', 'Following', 'Popular'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  activeTab === tab 
                    ? 'bg-zinc-800 text-white' 
                    : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts Feed */}
          <div className="flex-1">
            {posts.map(post => (
              <div key={post.id} className="mx-4 mb-5 bg-zinc-900 rounded-lg overflow-hidden shadow-lg md:hover:shadow-xl transition-all md:border border-zinc-800/50 md:hover:border-zinc-700/50">
                {/* Post Header */}
                <div className="p-3 md:p-4 flex items-center justify-between">
                  <div className="flex items-center group cursor-pointer" onClick={() => navigate(`/profile/${post.user.username}`)}>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 ring-2 ring-transparent md:group-hover:ring-lime-500/30 transition-all">
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium kanit-medium text-sm md:text-base group-hover:text-lime-500 transition-colors">{post.user.name}</h3>
                        {post.user.isVerified && (
                          <svg className="w-4 h-4 ml-1 text-lime-500 fill-current" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center">
                        <p className="text-zinc-500 text-xs md:text-sm">{post.user.username}</p>
                        <span className="mx-1.5 text-zinc-600">•</span>
                        <p className="text-zinc-500 text-xs">{post.timestamp}</p>
                      </div>
                    </div>
                  </div>
                  <button className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-zinc-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-3 md:px-5 pb-3">
                  <p className="text-sm md:text-base mb-3 leading-relaxed">{post.content}</p>
                  
                  {/* Tags - Desktop only */}
                  <div className="hidden md:flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="bg-zinc-800 text-lime-500 px-2 py-0.5 text-xs rounded-md hover:bg-zinc-700 cursor-pointer transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Image */}
                <div className="w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full object-cover max-h-80 md:max-h-[28rem] cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Post Actions */}
                <div className="flex p-2 md:p-3 border-t border-zinc-800/50">
                  {/* Like Button */}
                  <button className={`flex-1 flex items-center justify-center py-2 md:py-3 hover:bg-zinc-800 rounded-md transition-colors ${post.hasLiked ? 'text-red-500' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-1 ${post.hasLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.hasLiked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className={`text-sm md:text-base ${post.hasLiked ? 'font-medium' : ''}`}>{post.likes}</span>
                  </button>

                  {/* Comment Button */}
                  <button className="flex-1 flex items-center justify-center py-2 md:py-3 hover:bg-zinc-800 rounded-md transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm md:text-base">{post.comments}</span>
                  </button>

                  {/* Share Button */}
                  <button className="flex-1 flex items-center justify-center py-2 md:py-3 hover:bg-zinc-800 rounded-md transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-sm md:text-base">{post.shares}</span>
                  </button>
                </div>

                {/* Comments Preview - Desktop only */}
                <div className="hidden md:block border-t border-zinc-800/50 p-4">
                  {post.comments > 0 && (
                    <div className="mb-3">
                      <div className="flex items-start mb-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden mr-2 flex-shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200" 
                            alt="Commenter" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-zinc-800/70 rounded-2xl px-3 py-2 text-sm">
                          <p className="font-medium text-xs text-white/90">Jessica Miller</p>
                          <p className="text-white/80">Looking great! What's your weekly routine like?</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" 
                        alt="Your Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2 flex items-center">
                      <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="bg-transparent w-full focus:outline-none text-sm"
                      />
                      <button className="ml-2 text-lime-500 hover:text-lime-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation - Only visible on mobile and small tablets */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>
    </div>
  );
};

export default UsersFeed;