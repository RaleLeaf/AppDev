import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';
import CommentModal from './CommentModal';
import ShareModal from './ShareModal';
import PostModal from './PostModal';
import useAuthStore from '../store/authStore';
import { likeAPI, commentAPI } from '../services/api';

const UsersFeed = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('All');
  const [commentModalPost, setCommentModalPost] = useState(null);
  const [shareModalPost, setShareModalPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('User');

  // Enhanced feed data with more details
  const [posts, setPosts] = useState([]);
  
  // Track posts being liked to prevent multiple simultaneous requests
  const [likingPosts, setLikingPosts] = useState(new Set());

  // ADD THIS: Refresh trigger for inline comments
  const [commentRefreshTrigger, setCommentRefreshTrigger] = useState(0);

  // Load user name (same logic as HomePage)
  useEffect(() => {
    const getUserName = () => {
      // 1. Try to get from your auth store user first
      if (user) {
        const name = user.displayName || 
                    user.name || 
                    user.firstName || 
                    user.username || 
                    (user.email ? user.email.split('@')[0] : null);
        
        if (name) {
          console.log('Found name from auth store:', name);
          setUserName(name);
          // Also store in localStorage for persistence
          localStorage.setItem('userName', name);
          return;
        }
      }

      // 2. Try to get from localStorage (fallback)
      const storedName = localStorage.getItem('userName') || localStorage.getItem('name');
      if (storedName) {
        console.log('Found stored name:', storedName);
        setUserName(storedName);
        return;
      }

      // 3. Try to get from sessionStorage
      const sessionName = sessionStorage.getItem('userName') || sessionStorage.getItem('name');
      if (sessionName) {
        console.log('Found session name:', sessionName);
        setUserName(sessionName);
        return;
      }

      // 4. Try to get from stored user object
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData && (userData.name || userData.firstName || userData.displayName || userData.username || userData.email)) {
            const foundName = userData.name || userData.firstName || userData.displayName || userData.username || userData.email.split('@')[0];
            console.log('Found name from user data:', foundName);
            setUserName(foundName);
            return;
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
        }
      }

      // 5. Try to get from Firebase user data
      const firebaseUser = localStorage.getItem('firebaseUser');
      if (firebaseUser) {
        try {
          const fbUser = JSON.parse(firebaseUser);
          if (fbUser && (fbUser.displayName || fbUser.name || fbUser.email)) {
            const foundName = fbUser.displayName || fbUser.name || fbUser.email.split('@')[0];
            console.log('Found name from Firebase user:', foundName);
            setUserName(foundName);
            return;
          }
        } catch (error) {
          console.error('Error parsing Firebase user data:', error);
        }
      }

      // 6. If user is authenticated but no name found, try API
      if (isAuthenticated) {
        fetchUserFromAPI();
      } else {
        // 7. Final fallback - set default name
        console.log('No authentication found, using default name');
        setUserName('User');
      }
    };

    const fetchUserFromAPI = async () => {
      try {
        const firebaseUid = localStorage.getItem('firebaseUid') || user?.uid;
        const authToken = localStorage.getItem('authToken') || user?.accessToken;
        
        if (!firebaseUid || !authToken) {
          console.log('No Firebase UID or auth token available');
          setUserName('User');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/users/firebase/${firebaseUid}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('User data received from API:', userData);
          
          // Based on your server's UserDTO structure
          const name = userData.name || 
                      userData.firstName || 
                      userData.displayName || 
                      userData.username || 
                      (userData.email ? userData.email.split('@')[0] : 'User');
          
          setUserName(name);
          
          // Store in localStorage for future use
          localStorage.setItem('userName', name);
          localStorage.setItem('userData', JSON.stringify(userData));
          
          console.log('Name set from API:', name);
        } else if (response.status === 404) {
          console.log('User not found in backend, using fallback');
          
          // Try to get user info from your auth store or Firebase
          if (user && user.displayName) {
            console.log('Using auth store display name:', user.displayName);
            setUserName(user.displayName);
          } else if (user && user.email) {
            const emailName = user.email.split('@')[0];
            console.log('Using email username:', emailName);
            setUserName(emailName);
          } else {
            console.log('No fallback data available, using default');
            setUserName('User');
          }
        } else {
          console.error('API Error:', response.status, response.statusText);
          
          // Use auth store data as fallback
          if (user && user.displayName) {
            console.log('Using auth store display name as fallback:', user.displayName);
            setUserName(user.displayName);
          } else if (user && user.email) {
            const emailName = user.email.split('@')[0];
            console.log('Using email username as fallback:', emailName);
            setUserName(emailName);
          } else {
            setUserName('User');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        
        // Try auth store fallback first
        if (user && user.displayName) {
          console.log('Using auth store display name as fallback:', user.displayName);
          setUserName(user.displayName);
        } else if (user && user.email) {
          const emailName = user.email.split('@')[0];
          console.log('Using email username as fallback:', emailName);
          setUserName(emailName);
        } else {
          // Final fallback to default name
          console.log('Using final fallback name');
          setUserName('User');
        }
      }
    };

    getUserName();
  }, [user, isAuthenticated]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem('authToken') || user?.accessToken;
        
        if (!authToken) {
          console.log('No auth token, using default posts');
          setPosts([
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
          ]);
          setLoading(false);
          return;
        }

        // Fetch posts from API
        const response = await fetch('http://localhost:8080/api/posts', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const apiPosts = await response.json();
          console.log('Fetched posts from API:', apiPosts);
          
          // Transform API posts to match UI format and fetch like/comment counts
          const transformedPosts = await Promise.all(apiPosts.map(async (post) => {
            console.log('Processing post:', post.id, 'with tags:', post.tags);
            
            // Get like and comment counts
            const [likeCount, commentCount, hasLiked] = await Promise.all([
              likeAPI.getLikeCount(post.id).catch(() => 0),
              commentAPI.getCommentCount(post.id).catch(() => 0),
              likeAPI.hasUserLikedPost(user?.uid || localStorage.getItem('firebaseUid'), post.id).catch(() => false)
            ]);
            
            return {
              id: post.id,
              user: {
                name: post.authorName || 'User',
                username: `@${post.authorName?.toLowerCase().replace(/\s+/g, '_') || 'user'}`,
                avatar: post.authorProfilePicture || 'https://via.placeholder.com/200x200/374151/ffffff?text=U',
                isVerified: false
              },
              timestamp: formatTimestamp(post.createdAt),
              content: post.content,
              title: post.title,
              image: post.imageUrls?.[0] || null,
              likes: likeCount,
              comments: commentCount,
              shares: post.sharesCount || 0,
              hasLiked: hasLiked,
              tags: Array.isArray(post.tags) ? post.tags : (post.tags ? [post.tags] : []),
              location: post.location
            };
          }));

          console.log('Transformed posts:', transformedPosts);
          setPosts(transformedPosts);
        } else {
          console.error('Failed to fetch posts:', response.status);
          // Fallback to default posts
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // Fixed handle like/unlike with debouncing and request tracking
  const handleLikeToggle = async (postId, isCurrentlyLiked) => {
    try {
      const userId = user?.uid || user?.firebaseUid || localStorage.getItem('firebaseUid');
      if (!userId) {
        console.error('No user ID available for liking');
        return;
      }

      // Prevent multiple simultaneous requests for the same post
      if (likingPosts.has(postId)) {
        console.log('Like request already in progress for post:', postId);
        return;
      }

      // Add post to "being liked" set
      setLikingPosts(prev => new Set(prev).add(postId));

      // Get current post state (in case it changed since render)
      const currentPost = posts.find(p => p.id === postId);
      if (!currentPost) {
        setLikingPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        return;
      }

      const actualCurrentLikeState = currentPost.hasLiked;
      const currentLikeCount = currentPost.likes;

      let success = false;
      let newLikeState = actualCurrentLikeState;
      let newLikeCount = currentLikeCount;

      try {
        if (actualCurrentLikeState) {
          // Unlike the post
          success = await likeAPI.unlikePost(userId, postId);
          if (success) {
            newLikeState = false;
            newLikeCount = Math.max(0, currentLikeCount - 1); // Prevent negative likes
          }
        } else {
          // Like the post
          const likeResult = await likeAPI.likePost(userId, postId);
          success = !!likeResult;
          if (success) {
            newLikeState = true;
            newLikeCount = currentLikeCount + 1;
          }
        }

        if (success) {
          // Update the posts state only after successful API call
          setPosts(prevPosts => 
            prevPosts.map(post => 
              post.id === postId 
                ? {
                    ...post,
                    hasLiked: newLikeState,
                    likes: newLikeCount
                  }
                : post
            )
          );

          // Update comment modal post if it's open
          if (commentModalPost && commentModalPost.id === postId) {
            setCommentModalPost(prev => ({
              ...prev,
              hasLiked: newLikeState,
              likes: newLikeCount
            }));
          }
        } else {
          console.error('Like/unlike operation failed');
        }
      } catch (error) {
        console.error('Error toggling like:', error);
        // Don't update UI state on error - keep original state
      }
    } catch (error) {
      console.error('Error in handleLikeToggle:', error);
    } finally {
      // Always remove post from "being liked" set
      setLikingPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  // Handle adding inline comments (for desktop)
  const handleInlineComment = async (postId, content) => {
    try {
      const userId = user?.uid || user?.firebaseUid || localStorage.getItem('firebaseUid');
      if (!userId || !content.trim()) {
        console.error('No user ID or empty content for inline comment');
        return null;
      }

      console.log('Creating inline comment for post:', postId, 'content:', content.trim());
      
      // Create comment with user info
      const newComment = await commentAPI.createComment(userId, postId, content.trim());
      console.log('Created inline comment:', newComment);

      // Get current user info for the comment
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const currentUserName = userData.name || localStorage.getItem('userName') || userName || 'User';
      const currentUserAvatar = getCurrentUserAvatar();

      // Update the comment with user info locally (in case API doesn't return it)
      const enhancedComment = {
        ...newComment,
        userName: currentUserName,
        userAvatar: currentUserAvatar,
        userId: userId
      };

      // Also update the backend comment with user info if needed
      try {
        await commentAPI.updateCommentUserInfo(newComment.id, {
          userName: currentUserName,
          userAvatar: currentUserAvatar
        });
      } catch (error) {
        console.log('Could not update comment user info in backend:', error);
      }

      // Update the post's comment count
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, comments: post.comments + 1 }
            : post
        )
      );

      return enhancedComment;
    } catch (error) {
      console.error('Error creating inline comment:', error);
      return null;
    }
  };

  // Handle comment modal closure with count update and refresh trigger
  const handleCommentModalClose = () => {
    // Refresh comment count when modal closes
    if (commentModalPost) {
      const postId = commentModalPost.id;
      commentAPI.getCommentCount(postId)
        .then(count => {
          setPosts(prevPosts => 
            prevPosts.map(post => 
              post.id === postId 
                ? { ...post, comments: count }
                : post
            )
          );
          
          // TRIGGER REFRESH for inline comments
          setCommentRefreshTrigger(prev => prev + 1);
        })
        .catch(error => console.error('Error updating comment count:', error));
    }
    setCommentModalPost(null);
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMs = now - postTime;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return postTime.toLocaleDateString();
  };

  const getCurrentUserAvatar = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData.profilePictureUrl || user?.profilePictureUrl || 'https://via.placeholder.com/200x200/374151/ffffff?text=U';
  };

  // Enhanced onPost handler with better logging
  const handleNewPost = (newPost) => {
    console.log('Received new post in UsersFeed:', newPost);
    console.log('New post tags:', newPost.tags);
    
    // Ensure tags are properly formatted
    const processedPost = {
      ...newPost,
      tags: Array.isArray(newPost.tags) ? newPost.tags : (newPost.tags ? [newPost.tags] : []),
      hasLiked: false,
      likes: 0,
      comments: 0,
      shares: 0
    };
    
    console.log('Processed post:', processedPost);
    
    setPosts((prev) => {
      const updatedPosts = [processedPost, ...prev];
      console.log('Updated posts state:', updatedPosts);
      return updatedPosts;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SideNav - Only visible on medium screens and up */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0 bg-black">
        {/* Content Container - Centered properly for all screen sizes */}
        <div className="w-full max-w-2xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          {/* Header with improved mobile styling */}
          <div className="p-4 md:p-5 flex items-center justify-between sticky top-0 bg-black/95 backdrop-blur-sm z-10">
            <h1 className="text-lg md:text-2xl font-bold kanit-bold tracking-wider">USERS FEED</h1>

            {/* Button moved to a simple icon for mobile */}
            <button className="w-9 h-9 md:w-10 md:h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors"
              onClick={() => setIsPostModalOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Mobile Filter Pills - Moved below header and expanded to include Popular */}
          <div className="md:hidden flex mx-4 mb-4 justify-center">
            <div className="inline-flex space-x-1 bg-zinc-900/80 p-1 rounded-full">
              {['All', 'Following', 'Popular'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${activeTab === tab
                    ? 'bg-lime-600 text-black font-medium'
                    : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Post Creation - Mobile version */}
          <div
            className="md:hidden flex mx-4 mb-4 bg-zinc-900 rounded-xl p-2.5 items-center shadow-md cursor-pointer"
            onClick={() => setIsPostModalOpen(true)}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <img
                src={getCurrentUserAvatar()}
                alt="Your Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 bg-zinc-800/80 rounded-full px-3 py-2 text-sm text-zinc-400">
              Share your progress, {userName}...
            </div>
          </div>

          {/* Post Creation - Desktop only */}
          <div
            className="hidden md:flex mx-4 mb-6 bg-zinc-900/60 rounded-xl p-4 items-center shadow-lg cursor-pointer"
            onClick={() => setIsPostModalOpen(true)}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
              <img
                src={getCurrentUserAvatar()}
                alt="Your Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 bg-zinc-800/80 rounded-full px-5 py-3 text-zinc-400 hover:bg-zinc-800 transition-colors">
              Share your workout progress, {userName}...
            </div>
          </div>

          {/* Filter Pills - Desktop only */}
          <div className="hidden md:flex mx-4 mb-4 space-x-2">
            {['All', 'Following', 'Popular'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${activeTab === tab
                  ? 'bg-zinc-800 text-white'
                  : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts Feed - Updated with loading states */}
          <div className="flex-1">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-400 text-lg">No posts yet</p>
                <p className="text-zinc-500 text-sm mt-2">Be the first to share your fitness journey!</p>
              </div>
            ) : (
              posts.map(post => {
                console.log('Rendering post:', post.id, 'with tags:', post.tags);
                const isLiking = likingPosts.has(post.id);
                
                return (
                  <div key={post.id} className="mx-3 md:mx-4 mb-4 md:mb-5 bg-zinc-900 rounded-lg overflow-hidden shadow-md md:hover:shadow-xl transition-all md:border border-zinc-800/50 md:hover:border-zinc-700/50">
                    {/* Post Header */}
                    <div className="p-2.5 md:p-4 flex items-center justify-between">
                      <div className="flex items-center group cursor-pointer" onClick={() => navigate(`/profile/${post.user.username}`)}>
                        <div className="w-9 h-9 md:w-12 md:h-12 rounded-full overflow-hidden mr-2.5 md:mr-3 flex-shrink-0 ring-2 ring-transparent md:group-hover:ring-lime-500/30 transition-all">
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
                              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 text-lime-500 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="flex items-center">
                            <p className="text-zinc-500 text-xs md:text-sm">{post.user.username}</p>
                            <span className="mx-1.5 text-zinc-600">•</span>
                            <p className="text-zinc-500 text-xs">{post.timestamp}</p>
                            {post.location && (
                              <>
                                <span className="mx-1.5 text-zinc-600">•</span>
                                <p className="text-zinc-500 text-xs">{post.location}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="text-zinc-500 hover:text-white transition-colors p-1 md:p-1.5 rounded-full hover:bg-zinc-800/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className="px-3 md:px-5 pb-2 md:pb-3">
                      {post.title && (
                        <h2 className="text-lg md:text-xl font-semibold mb-2 text-lime-500">{post.title}</h2>
                      )}
                      <p className="text-sm md:text-base mb-2 md:mb-3 leading-relaxed">{post.content}</p>

                      {/* Tags - Enhanced debugging and display */}
                      {(() => {
                        console.log('Tags check for post', post.id, ':', {
                          tags: post.tags,
                          isArray: Array.isArray(post.tags),
                          length: post.tags?.length,
                          hasContent: post.tags && Array.isArray(post.tags) && post.tags.length > 0
                        });
                        
                        if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
                          return (
                            <div className="flex flex-wrap gap-1 md:gap-1.5 mb-2 md:mb-3 overflow-x-auto scrollbar-hide">
                              {post.tags.map((tag, i) => {
                                console.log('Rendering tag:', tag, 'at index:', i);
                                return (
                                  <span key={i} className="bg-zinc-800 text-lime-500 px-1.5 md:px-2 py-0.5 text-xs rounded-md whitespace-nowrap">
                                    #{tag}
                                  </span>
                                );
                              })}
                            </div>
                          );
                        } else {
                          console.log('No tags to display for post', post.id);
                          return null;
                        }
                      })()}
                    </div>

                    {/* Post Image */}
                    {post.image && (
                      <div className="w-full overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post"
                          className="w-full object-cover max-h-64 md:max-h-[28rem] cursor-pointer"
                        />
                      </div>
                    )}

                    {/* Post Stats - Mobile-friendly version */}
                    <div className="flex items-center px-3 py-1.5 text-xs text-zinc-400">
                      <span>{post.likes} likes</span>
                      <span className="mx-1.5">•</span>
                      <span>{post.comments} comments</span>
                      {post.shares > 0 && (
                        <>
                          <span className="mx-1.5">•</span>
                          <span>{post.shares} shares</span>
                        </>
                      )}
                    </div>

                    {/* Post Actions - Fixed with loading state and disabled state */}
                    <div className="flex p-1 md:p-3 border-t border-zinc-800/50">
                      {/* Like Button - Fixed */}
                      <button 
                        className={`flex-1 flex items-center justify-center py-1.5 md:py-3 hover:bg-zinc-800 rounded-md transition-colors ${
                          post.hasLiked ? 'text-red-500' : 'text-zinc-300'
                        } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleLikeToggle(post.id, post.hasLiked)}
                        disabled={isLiking}
                      >
                        {isLiking ? (
                          // Show loading spinner when liking
                          <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-current mr-1"></div>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 md:h-6 md:w-6 mr-1 ${post.hasLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.hasLiked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                        <span className={`text-sm md:text-base ${post.hasLiked ? 'font-medium' : ''}`}>
                          {isLiking ? 'Liking...' : 'Like'}
                        </span>
                      </button>

                      {/* Comment Button */}
                      <button
                        className="flex-1 flex items-center justify-center py-1.5 md:py-3 hover:bg-zinc-800 rounded-md transition-colors"
                        onClick={() => setCommentModalPost(post)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm md:text-base">Comment</span>
                      </button>

                      {/* Share Button */}
                      <button className="flex-1 flex items-center justify-center py-1.5 md:py-3 hover:bg-zinc-800 rounded-md transition-colors"
                        onClick={() => setShareModalPost(post)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span className="text-sm md:text-base">Share</span>
                      </button>
                    </div>

                    {/* Comments Preview - Desktop only - UPDATED with refresh trigger */}
                    <InlineCommentSection 
                      post={post}
                      onCommentSubmit={handleInlineComment}
                      getCurrentUserAvatar={getCurrentUserAvatar}
                      refreshTrigger={commentRefreshTrigger}
                      onUpdateCommentCount={(postId, newCount) => {
                        setPosts(prevPosts => 
                          prevPosts.map(p => 
                            p.id === postId 
                              ? { ...p, comments: newCount }
                              : p
                          )
                        );
                      }}
                    />
                  </div>
                );
              })
            )}

            <CommentModal
              post={commentModalPost}
              onClose={handleCommentModalClose}
              onShare={(post) => {
                setShareModalPost(post);
                setCommentModalPost(null);
              }}
              onLikeToggle={handleLikeToggle}
            />

            <ShareModal
              post={shareModalPost}
              onClose={() => setShareModalPost(null)}
              onShare={(post) => {
                console.log('Shared:', post);
              }}
            />
            
            {isPostModalOpen && (
              <PostModal
                onClose={() => setIsPostModalOpen(false)}
                onPost={handleNewPost}
              />
            )}
          </div>

          {/* Mobile floating action button for creating a new post */}
          <div className="md:hidden fixed bottom-20 right-4 z-10">
            <button 
              className="bg-lime-600 text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              onClick={() => setIsPostModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Only visible on mobile and small tablets */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black z-20">
        <BottomNav />
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// Inline Comment Section Component (for desktop) - UPDATED WITH REFRESH CAPABILITY
const InlineCommentSection = ({ post, onCommentSubmit, getCurrentUserAvatar, onUpdateCommentCount, refreshTrigger }) => {
  const { user } = useAuthStore();
  const [inlineComment, setInlineComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  
  // Cache for user info to avoid repeated API calls
  const [userInfoCache, setUserInfoCache] = useState({});

  // Function to get user info by ID
  const getUserInfo = async (userId) => {
    // Check cache first
    if (userInfoCache[userId]) {
      return userInfoCache[userId];
    }

    try {
      const authToken = localStorage.getItem('authToken') || user?.accessToken;
      if (!authToken) {
        return { name: 'User', avatar: 'https://via.placeholder.com/28x28/374151/ffffff?text=U' };
      }

      const response = await fetch(`http://localhost:8080/api/users/firebase/${userId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const userInfo = {
          name: userData.name || userData.firstName || userData.displayName || 'User',
          avatar: userData.profilePictureUrl || 'https://via.placeholder.com/28x28/374151/ffffff?text=U'
        };
        
        // Cache the result
        setUserInfoCache(prev => ({ ...prev, [userId]: userInfo }));
        return userInfo;
      }
    } catch (error) {
      console.error('Error fetching user info for', userId, ':', error);
    }

    // Fallback
    const fallbackInfo = { name: 'User', avatar: 'https://via.placeholder.com/28x28/374151/ffffff?text=U' };
    setUserInfoCache(prev => ({ ...prev, [userId]: fallbackInfo }));
    return fallbackInfo;
  };

  // Fetch comments function
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const fetchedComments = await commentAPI.getComments(post.id);
      console.log('Fetched inline comments for post', post.id, ':', fetchedComments);
      
      // Transform comments to include proper user info
      const transformedComments = await Promise.all(
        fetchedComments.map(async (comment) => {
          let userName = comment.userName;
          let userAvatar = comment.userAvatar;

          // If we don't have user info, try to get it
          if (!userName || userName === 'Anonymous User' || !userAvatar) {
            const userInfo = await getUserInfo(comment.userId);
            userName = userInfo.name;
            userAvatar = userInfo.avatar;
          }

          return {
            ...comment,
            userName: userName || 'User',
            userAvatar: userAvatar || 'https://via.placeholder.com/28x28/374151/ffffff?text=U'
          };
        })
      );
      
      setComments(transformedComments || []);
    } catch (error) {
      console.error('Error fetching inline comments:', error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  // Fetch comments for this post - UPDATED to refresh on trigger
  useEffect(() => {
    fetchComments();
  }, [post.id, refreshTrigger]); // Added refreshTrigger dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inlineComment.trim() || submitting) return;

    try {
      setSubmitting(true);
      const newComment = await onCommentSubmit(post.id, inlineComment.trim());
      
      if (newComment) {
        // Get current user info
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const currentUserName = userData.name || localStorage.getItem('userName') || user?.displayName || user?.name || 'You';
        
        const newCommentWithUser = {
          ...newComment,
          userName: currentUserName,
          userAvatar: getCurrentUserAvatar(),
          createdAt: new Date().toISOString(),
          userId: user?.uid || user?.firebaseUid || localStorage.getItem('firebaseUid')
        };
        
        setComments(prev => [...prev, newCommentWithUser]);
        
        // Update parent component's comment count
        if (onUpdateCommentCount) {
          onUpdateCommentCount(post.id, comments.length + 1);
        }
      }
      
      setInlineComment('');
    } catch (error) {
      console.error('Error submitting inline comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatCommentTime = (timestamp) => {
    if (!timestamp) return 'now';
    
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMs = now - commentTime;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;
    return commentTime.toLocaleDateString();
  };

  const commentsToShow = showAllComments ? comments : comments.slice(-2);

  return (
    <div className="hidden md:block border-t border-zinc-800/50 p-4">
      {/* Show actual comments if they exist */}
      {loadingComments ? (
        <div className="mb-3 flex justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-lime-500"></div>
        </div>
      ) : (
        comments.length > 0 && (
          <div className="mb-3">
            {/* Show all comments or just last 2 */}
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {commentsToShow.map((comment, index) => (
                <div key={comment.id || index} className="flex items-start">
                  <div className="w-7 h-7 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <img
                      src={comment.userAvatar || 'https://via.placeholder.com/28x28/374151/ffffff?text=U'}
                      alt={comment.userName || 'User'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-zinc-800/70 rounded-2xl px-3 py-2 text-sm flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-xs text-white/90">
                        {comment.userName || 'User'}
                      </p>
                      <span className="text-xs text-zinc-500">
                        {formatCommentTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-white/80 text-xs">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Show "View more" button if there are more than 2 comments */}
            {comments.length > 2 && !showAllComments && (
              <button 
                onClick={() => setShowAllComments(true)}
                className="text-xs text-zinc-500 hover:text-zinc-400 ml-9 mt-2"
              >
                View all {comments.length} comments
              </button>
            )}
            
            {/* Show "Show less" button if showing all comments */}
            {showAllComments && comments.length > 2 && (
              <button 
                onClick={() => setShowAllComments(false)}
                className="text-xs text-zinc-500 hover:text-zinc-400 ml-9 mt-2"
              >
                Show less
              </button>
            )}
          </div>
        )
      )}

      {/* Comment input form */}
      <form onSubmit={handleSubmit} className="flex">
        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
          <img
            src={getCurrentUserAvatar()}
            alt="Your Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2 flex items-center">
          <input
            type="text"
            value={inlineComment}
            onChange={(e) => setInlineComment(e.target.value)}
            placeholder="Add a comment..."
            className="bg-transparent w-full focus:outline-none text-sm text-white"
            disabled={submitting}
          />
          <button 
            type="submit"
            disabled={!inlineComment.trim() || submitting}
            className={`ml-2 transition-colors ${
              !inlineComment.trim() || submitting 
                ? 'text-zinc-600 cursor-not-allowed' 
                : 'text-lime-500 hover:text-lime-400'
            }`}
          >
            {submitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersFeed;