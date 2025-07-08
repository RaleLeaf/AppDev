import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, MapPin, Calendar, Hash } from 'lucide-react';
import useAuthStore from '../store/authStore';

const PostModal = ({ onClose, onPost }) => {
  const { user, isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    postType: 'TEXT',
    imageUrls: [],
    tags: [],
    location: '',
    isPublic: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [userProfile, setUserProfile] = useState({
    displayName: 'User',
    profilePictureUrl: '',
    email: ''
  });

  // Load user data properly with comprehensive name fetching
  useEffect(() => {
    const loadUserProfile = async () => {
      console.log('Loading user profile in PostModal...');
      
      try {
        // 1. First try to get from auth store
        if (user) {
          const authName = user.displayName || 
                          user.name || 
                          user.firstName || 
                          user.username || 
                          (user.email ? user.email.split('@')[0] : null);
          
          if (authName) {
            console.log('Found name from auth store:', authName);
            setUserProfile({
              displayName: authName,
              profilePictureUrl: user.profilePictureUrl || user.photoURL || '',
              email: user.email || ''
            });
            
            // Store for future use
            localStorage.setItem('userName', authName);
          }
        }

        // 2. Try to get from localStorage
        const storedName = localStorage.getItem('userName') || localStorage.getItem('name');
        if (storedName && storedName !== 'User') {
          console.log('Found stored name:', storedName);
          setUserProfile(prev => ({
            ...prev,
            displayName: storedName
          }));
        }

        // 3. Try to get from stored user data
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (userData && (userData.name || userData.displayName || userData.firstName)) {
          const storedUserName = userData.name || userData.displayName || userData.firstName;
          console.log('Found name from stored userData:', storedUserName);
          setUserProfile(prev => ({
            ...prev,
            displayName: storedUserName,
            profilePictureUrl: userData.profilePictureUrl || prev.profilePictureUrl,
            email: userData.email || prev.email
          }));
        }

        // 4. If authenticated, try to fetch fresh data from API
        if (isAuthenticated) {
          const firebaseUid = localStorage.getItem('firebaseUid') || user?.uid;
          const authToken = localStorage.getItem('authToken') || user?.accessToken;

          if (firebaseUid && authToken) {
            console.log('Fetching fresh user data from API...');
            
            try {
              // Get user from backend
              const userResponse = await fetch(`http://localhost:8080/api/users/firebase/${firebaseUid}`, {
                headers: {
                  'Authorization': `Bearer ${authToken}`,
                  'Content-Type': 'application/json',
                },
              });

              if (userResponse.ok) {
                const currentUser = await userResponse.json();
                console.log('API user data:', currentUser);
                
                // Based on your server's User model structure
                const apiUserName = currentUser.name || 
                                  currentUser.firstName || 
                                  currentUser.displayName || 
                                  currentUser.username || 
                                  (currentUser.email ? currentUser.email.split('@')[0] : null);

                if (apiUserName) {
                  console.log('Found name from API user:', apiUserName);
                  setUserProfile(prev => ({
                    ...prev,
                    displayName: apiUserName,
                    email: currentUser.email || prev.email
                  }));
                  
                  // Store for future use
                  localStorage.setItem('userName', apiUserName);
                }
                
                // Try to get user profile for additional info
                try {
                  const profileResponse = await fetch(`http://localhost:8080/api/userprofiles/user/${currentUser.id}`, {
                    headers: {
                      'Authorization': `Bearer ${authToken}`,
                      'Content-Type': 'application/json',
                    },
                  });

                  if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    console.log('API profile data:', profileData);
                    
                    // Based on your server's UserProfile model structure
                    const profileName = profileData.displayName || 
                                      profileData.firstName || 
                                      profileData.username ||
                                      apiUserName;

                    if (profileName) {
                      console.log('Found name from API profile:', profileName);
                      setUserProfile(prev => ({
                        ...prev,
                        displayName: profileName,
                        profilePictureUrl: profileData.profilePictureUrl || prev.profilePictureUrl,
                        email: currentUser.email || prev.email
                      }));
                      
                      // Store the most complete data
                      localStorage.setItem('userName', profileName);
                      localStorage.setItem('userData', JSON.stringify({
                        ...currentUser,
                        ...profileData
                      }));
                    }
                  }
                } catch (profileError) {
                  console.log('Profile fetch failed, using user data:', profileError);
                }
              } else {
                console.log('User API call failed:', userResponse.status);
              }
            } catch (apiError) {
              console.log('API fetch failed:', apiError);
            }
          }
        }

        // 5. Final fallback - ensure we have at least something
        setUserProfile(prev => {
          if (prev.displayName === 'User' || !prev.displayName) {
            // Try one more time with any available data
            const fallbackName = user?.displayName || 
                                user?.name || 
                                user?.email?.split('@')[0] || 
                                'User';
            
            console.log('Using final fallback name:', fallbackName);
            return {
              ...prev,
              displayName: fallbackName
            };
          }
          return prev;
        });

      } catch (error) {
        console.error('Error loading user profile:', error);
        // Ensure we have a fallback
        setUserProfile(prev => ({
          ...prev,
          displayName: user?.displayName || user?.name || user?.email?.split('@')[0] || 'User'
        }));
      }
    };

    loadUserProfile();
  }, [user, isAuthenticated]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          imageUrls: [e.target.result],
          postType: 'IMAGE'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      const tag = currentTag.trim().replace('#', '');
      if (!formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePost = async () => {
    if (!formData.content.trim() && !imagePreview) return;

    setIsLoading(true);
    
    try {
      const firebaseUid = localStorage.getItem('firebaseUid') || user?.uid;
      const authToken = localStorage.getItem('authToken') || user?.accessToken;

      if (!firebaseUid || !authToken) {
        alert('Please log in to create a post');
        return;
      }

      // Get user ID from backend
      const userResponse = await fetch(`http://localhost:8080/api/users/firebase/${firebaseUid}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to get user data');
      }

      const currentUser = await userResponse.json();
      
      // Use the display name we've carefully fetched
      const authorName = userProfile.displayName || 
                        currentUser.name || 
                        currentUser.email?.split('@')[0] || 
                        'User';

      // Prepare post data according to CreatePostRequest
      const postData = {
        title: formData.title?.trim() || null,
        content: formData.content,
        authorId: currentUser.id,
        authorName: authorName,
        authorProfilePicture: userProfile.profilePictureUrl || null,
        postType: formData.postType,
        imageUrls: formData.imageUrls.length > 0 ? formData.imageUrls : [],
        isPublic: formData.isPublic,
        tags: formData.tags.length > 0 ? formData.tags : [],
        location: formData.location?.trim() || null
      };

      // Clean the data - remove empty strings and null values except for arrays
      const cleanedData = Object.fromEntries(
        Object.entries(postData).filter(([key, value]) => {
          if (Array.isArray(value)) return true; // Keep arrays even if empty
          return value !== null && value !== undefined && value !== "";
        })
      );

      console.log('Creating post with data:', cleanedData);

      // Create post via API
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData)
      });

      if (response.ok) {
        const newPost = await response.json();
        console.log('Post created successfully:', newPost);
        
        // Transform API response to match UsersFeed format
        const transformedPost = {
          id: newPost.id,
          user: {
            name: newPost.authorName,
            username: `@${newPost.authorName?.toLowerCase().replace(/\s+/g, '_')}`,
            avatar: newPost.authorProfilePicture || 'https://via.placeholder.com/200x200/374151/ffffff?text=U',
            isVerified: false
          },
          timestamp: 'Just now',
          content: newPost.content,
          title: newPost.title,
          image: newPost.imageUrls?.[0] || null,
          likes: newPost.likesCount || 0,
          comments: newPost.commentsCount || 0,
          shares: newPost.sharesCount || 0,
          hasLiked: false,
          tags: Array.isArray(newPost.tags) ? newPost.tags : [],
          location: newPost.location
        };

        onPost(transformedPost);
        onClose();
      } else {
        const errorText = await response.text();
        console.error('Failed to create post:', errorText);
        alert('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const userAvatar = userProfile.profilePictureUrl || 
                     user?.profilePictureUrl || 
                     user?.photoURL || 
                     'https://via.placeholder.com/200x200/374151/ffffff?text=U';
  
  const userName = userProfile.displayName || 'User';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Create Post</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* User Info */}
          <div className="flex items-center mb-4">
            <img
              src={userAvatar}
              alt="user"
              className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-lime-500/20"
            />
            <div>
              <span className="text-white font-medium text-sm">{userName}</span>
              <div className="flex items-center mt-1">
                <select
                  value={formData.isPublic ? 'public' : 'private'}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.value === 'public' }))}
                  className="text-xs bg-zinc-800 text-zinc-300 rounded px-2 py-1"
                >
                  <option value="public">🌐 Public</option>
                  <option value="private">🔒 Private</option>
                </select>
              </div>
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent placeholder-zinc-400"
            placeholder="Add a title (optional)"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />

          {/* Content Textarea */}
          <textarea
            rows="4"
            className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent placeholder-zinc-400"
            placeholder="What's on your mind?"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          />

          {/* Tags Input */}
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <Hash size={16} className="text-lime-500 mr-2" />
              <input
                type="text"
                className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent placeholder-zinc-400"
                placeholder="Add tags (press Enter)"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleAddTag}
              />
            </div>
            
            {/* Tags Display */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-lime-500/20 text-lime-400 px-2 py-1 rounded-md text-xs flex items-center"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-lime-300 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Location Input */}
          <div className="flex items-center mb-4">
            <MapPin size={16} className="text-zinc-400 mr-2" />
            <input
              type="text"
              className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent placeholder-zinc-400"
              placeholder="Add location (optional)"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 relative">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full rounded-xl max-h-60 object-cover border border-zinc-700"
              />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setFormData(prev => ({ ...prev, imageUrls: [], postType: 'TEXT' }));
                }}
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black/80 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Add Image */}
          <label className="flex items-center justify-center mt-4 p-3 border-2 border-dashed border-zinc-700 rounded-xl text-zinc-400 hover:text-lime-400 hover:border-lime-400 cursor-pointer transition-colors">
            <ImageIcon size={20} className="mr-2" />
            <span className="text-sm font-medium">Add Photo</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            disabled={(!formData.content.trim() && !imagePreview) || isLoading}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              (formData.content.trim() || imagePreview) && !isLoading
                ? 'bg-lime-500 text-black hover:bg-lime-400'
                : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;