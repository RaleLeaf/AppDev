import React from 'react';
import BottomNav from './BottonNav';

const UsersFeed = () => {
  // Feed data
  const posts = [
    {
      id: 1,
      user: {
        name: 'SARAH WEGAN',
        username: '@sarah_wegan96',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200'
      },
      content: 'Starting my day right!',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000',
      likes: 19,
      comments: 3,
      shares: 2
    },
    {
      id: 2,
      user: {
        name: 'John Welkin',
        username: '@jwelkin31',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200'
      },
      content: 'Just set a new PR!!!',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000',
      likes: 8,
      comments: 1,
      shares: 0
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-20">
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <h1 className="text-xl font-bold kanit-bold tracking-wider">USERS FEED</h1>
        <button className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      {/* Posts Feed */}
      <div className="flex-1">
        {posts.map(post => (
          <div key={post.id} className="mx-4 mb-4 bg-zinc-900 rounded-lg overflow-hidden">
            {/* Post Header */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium kanit-medium text-sm">{post.user.name}</h3>
                  <p className="text-zinc-500 text-xs">{post.user.username}</p>
                </div>
              </div>
              <button className="text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
            
            {/* Post Content */}
            <div className="px-3 pb-2">
              <p className="text-sm mb-2">{post.content}</p>
            </div>
            
            {/* Post Image */}
            <div className="w-full">
              <img 
                src={post.image} 
                alt="Post" 
                className="w-full object-cover max-h-80"
              />
            </div>
            
            {/* Post Actions */}
            <div className="flex p-2">
              {/* Like Button */}
              <button className="flex-1 flex items-center justify-center py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">{post.likes}</span>
              </button>
              
              {/* Comment Button */}
              <button className="flex-1 flex items-center justify-center py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm">{post.comments}</span>
              </button>
              
              {/* Share Button */}
              <button className="flex-1 flex items-center justify-center py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="text-sm">{post.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default UsersFeed;