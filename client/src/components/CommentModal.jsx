import React from 'react';

const CommentModal = ({ post, onClose, onShare }) => {
    if (!post) return null;

    const handleShare = () => {
        if (onShare) {
            onShare(post); // Trigger the share modal
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-2">
            <div className="bg-zinc-900 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-zinc-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Content */}
                <div className="p-4 md:p-6">
                    {/* User Info */}
                    <div className="flex items-center mb-4">
                        <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                        <div>
                            <h3 className="text-sm font-semibold kanit-medium text-white">{post.user.name}</h3>
                            <p className="text-xs text-zinc-400">{post.user.username} • {post.timestamp}</p>
                        </div>
                    </div>

                    {/* Post Text */}
                    <p className="text-sm text-white/90 mb-4">{post.content}</p>

                    {/* Post Image */}
                    {post.image && (
                        <div className="mb-4">
                            <img
                                src={post.image}
                                alt="Post"
                                className="w-full rounded-lg object-cover max-h-[300px] md:max-h-[400px]"
                            />
                        </div>
                    )}

                    {/* Post Stats */}
                    <div className="flex items-center text-xs text-zinc-400 mb-2 px-1">
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

                    {/* Post Actions */}
                    <div className="flex border-y border-zinc-800/60 mb-4">
                        {/* Like */}
                        <button
                            className={`flex-1 flex items-center justify-center py-3 hover:bg-zinc-800 transition-colors ${post.hasLiked ? 'text-red-500' : 'text-zinc-300'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 md:h-6 md:w-6 mr-1 ${post.hasLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={post.hasLiked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-sm md:text-base">Like</span>
                        </button>

                        {/* Comment */}
                        <button className="flex-1 flex items-center justify-center py-3 hover:bg-zinc-800 text-zinc-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-sm md:text-base">Comment</span>
                        </button>

                        {/* Share */}
                        <button
                            onClick={() => onShare && onShare(post)}
                            className="flex-1 flex items-center justify-center py-3 hover:bg-zinc-800 text-zinc-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <span className="text-sm md:text-base">Share</span>
                        </button>

                    </div>

                    {/* Comments Section */}
                    <div className="space-y-4">
                        {post.comments > 0 && (
                            <div className="flex items-start">
                                <img
                                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200"
                                    alt="Commenter"
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                                <div className="bg-zinc-800 px-4 py-2 rounded-2xl text-sm">
                                    <p className="font-medium text-white/90 mb-1 text-xs">Jessica Miller</p>
                                    <p className="text-white/80 text-sm">Looking great! What's your weekly routine like?</p>
                                </div>
                            </div>
                        )}

                        {/* New Comment Input */}
                        <div className="flex items-start border-t border-zinc-700 pt-4">
                            <img
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                                alt="Your Profile"
                                className="w-8 h-8 rounded-full object-cover mr-3"
                            />
                            <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2 flex items-center">
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="bg-transparent w-full focus:outline-none text-sm text-white"
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
            </div>
        </div>
    );
};

export default CommentModal;