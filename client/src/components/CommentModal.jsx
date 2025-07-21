import React, { useState, useEffect } from 'react';
import { commentAPI } from '../services/api';
import useAuthStore from '../store/authStore';

const CommentModal = ({ post, onClose, onShare, onLikeToggle }) => {
    const { user } = useAuthStore();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Move all hooks BEFORE any conditional returns
    // Fetch comments when modal opens
    useEffect(() => {
  // Only fetch if post exists
  if (!post?.id) return;

  const fetchComments = async () => {
    try {
      setLoading(true);
      console.log('CommentModal: Fetching comments for post ID:', post.id);
      const fetchedComments = await commentAPI.getComments(post.id);
      console.log('CommentModal: Fetched comments:', fetchedComments);
      
      // Transform comments to include proper user info
      const transformedComments = await Promise.all(
        fetchedComments.map(async (comment) => {
          let userName = comment.userName;
          let userAvatar = comment.userAvatar;

          // If we don't have user info, try to get it from API
          if (!userName || userName === 'Anonymous User' || !userAvatar) {
            try {
              const authToken = localStorage.getItem('authToken') || user?.accessToken;
              if (authToken && comment.userId) {
                const response = await fetch(`http://localhost:8080/api/users/firebase/${comment.userId}`, {
                  headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                  },
                });

                if (response.ok) {
                  const userData = await response.json();
                  userName = userData.name || userData.firstName || userData.displayName || 'User';
                  userAvatar = userData.profilePictureUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
                }
              }
            } catch (error) {
              console.error('Error fetching user info for comment:', error);
            }
          }

          return {
            ...comment,
            userName: userName || 'User',
            userAvatar: userAvatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
          };
        })
      );
      
      setComments(transformedComments || []);
    } catch (error) {
      console.error('CommentModal: Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  fetchComments();
}, [post?.id, user]);

    // Reset comment input when post changes
    useEffect(() => {
        setNewComment('');
        setComments([]);
    }, [post?.id]);

    // Don't render if no post is selected - AFTER all hooks
    if (!post) {
        console.log('CommentModal: No post provided, not rendering');
        return null;
    }

    console.log('CommentModal: Rendering with post:', post);

    // Handle comment submission
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || submitting) return;

        try {
            setSubmitting(true);
            const userId = user?.uid || user?.firebaseUid || localStorage.getItem('firebaseUid');
            
            if (!userId) {
                console.error('CommentModal: No user ID available for commenting');
                alert('Please log in to comment');
                return;
            }

            console.log('CommentModal: Creating comment with userId:', userId, 'postId:', post.id, 'content:', newComment.trim());
            const createdComment = await commentAPI.createComment(userId, post.id, newComment.trim());
            console.log('CommentModal: Created comment:', createdComment);

            // Add the new comment to the list with user info
            const newCommentWithUser = {
                ...createdComment,
                userName: user?.displayName || user?.name || getUserName() || 'You',
                userAvatar: getCurrentUserAvatar(),
                createdAt: new Date().toISOString()
            };

            setComments(prev => [...prev, newCommentWithUser]);
            setNewComment('');

            // Update the post's comment count if available
            if (post.comments !== undefined) {
                post.comments = (post.comments || 0) + 1;
            }
            
        } catch (error) {
            console.error('CommentModal: Error creating comment:', error);
            alert('Failed to post comment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const getCurrentUserAvatar = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData.profilePictureUrl || user?.profilePictureUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
    };

    const getUserName = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData.name || localStorage.getItem('userName') || user?.displayName || user?.name || 'User';
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

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-2"
            onClick={handleBackdropClick}
        >
            <div className="bg-zinc-900 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden relative flex flex-col">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-zinc-400 hover:text-white transition-colors z-10 bg-zinc-800/50 rounded-full p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Header */}
                <div className="p-4 border-b border-zinc-800">
                    <h2 className="text-xl font-bold text-white">Comments</h2>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Post Preview */}
                    <div className="p-4 border-b border-zinc-800">
                        {/* User Info */}
                        <div className="flex items-center mb-3">
                            <img 
                                src={post.user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} 
                                alt={post.user?.name || 'User'} 
                                className="w-10 h-10 rounded-full object-cover mr-3" 
                            />
                            <div>
                                <h3 className="text-sm font-semibold text-white">{post.user?.name || 'User'}</h3>
                                <p className="text-xs text-zinc-400">{post.user?.username || '@user'} • {post.timestamp || 'now'}</p>
                            </div>
                        </div>

                        {/* Post Content */}
                        {post.title && (
                            <h2 className="text-lg font-semibold mb-2 text-lime-500">{post.title}</h2>
                        )}
                        <p className="text-sm text-white/90 mb-3">{post.content}</p>

                        {/* Tags */}
                        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                                {post.tags.map((tag, i) => (
                                    <span key={i} className="bg-zinc-800 text-lime-500 px-2 py-0.5 text-xs rounded-md">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Post Image */}
                        {post.image && (
                            <div className="mb-3">
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="w-full rounded-lg object-cover max-h-[300px]"
                                />
                            </div>
                        )}

                        {/* Post Stats */}
                        <div className="flex items-center text-xs text-zinc-400 mb-3">
                            <span>{post.likes || 0} likes</span>
                            <span className="mx-1.5">•</span>
                            <span>{comments.length} comments</span>
                            {post.shares > 0 && (
                                <>
                                    <span className="mx-1.5">•</span>
                                    <span>{post.shares} shares</span>
                                </>
                            )}
                        </div>

                        {/* Post Actions */}
                        <div className="flex border-t border-zinc-800 pt-3">
                            {/* Like */}
                            <button
                                className={`flex-1 flex items-center justify-center py-2 hover:bg-zinc-800 rounded transition-colors ${post.hasLiked ? 'text-red-500' : 'text-zinc-300'}`}
                                onClick={() => onLikeToggle && onLikeToggle(post.id, post.hasLiked)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-1 ${post.hasLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.hasLiked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="text-sm">Like</span>
                            </button>

                            {/* Comment */}
                            <button className="flex-1 flex items-center justify-center py-2 hover:bg-zinc-800 rounded text-zinc-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span className="text-sm">Comment</span>
                            </button>

                            {/* Share */}
                            <button
                                onClick={() => onShare && onShare(post)}
                                className="flex-1 flex items-center justify-center py-2 hover:bg-zinc-800 rounded text-zinc-300 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                <span className="text-sm">Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="p-4">
                        <h4 className="text-sm font-medium text-white mb-4">
                            Comments ({comments.length})
                        </h4>

                        {/* Loading Comments */}
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500"></div>
                            </div>
                        ) : (
                            /* Comments List */
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                {comments.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-zinc-500 text-sm">No comments yet.</p>
                                        <p className="text-zinc-600 text-xs mt-1">Be the first to comment!</p>
                                    </div>
                                ) : (
                                    comments.map((comment, index) => (
                                        <div key={comment.id || index} className="flex items-start space-x-3">
                                            <img
                                                src={comment.userAvatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}
                                                alt={comment.userName || 'User'}
                                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="bg-zinc-800/70 px-3 py-2 rounded-2xl flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="font-medium text-xs text-white/90">
                                                        {comment.userName || 'User'}
                                                    </p>
                                                    <span className="text-xs text-zinc-500">
                                                        {formatCommentTime(comment.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-white/80 text-sm">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Comment Input - Fixed at bottom */}
                <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                    <form onSubmit={handleSubmitComment} className="flex items-start space-x-3">
                        <img
                            src={getCurrentUserAvatar()}
                            alt="Your Profile"
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2 flex items-center">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="bg-transparent w-full focus:outline-none text-sm text-white"
                                disabled={submitting}
                            />
                            <button 
                                type="submit"
                                disabled={!newComment.trim() || submitting}
                                className={`ml-2 transition-colors ${
                                    !newComment.trim() || submitting 
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
            </div>
        </div>
    );
};

export default CommentModal;