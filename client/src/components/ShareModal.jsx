import React from 'react';

const ShareModal = ({ post, onClose, onShare }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center px-2">
      <div className="bg-zinc-900 w-full max-w-screen-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-zinc-700">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-zinc-700">
          <h2 className="text-lg md:text-xl font-bold kanit-medium">Share Post</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-xl">
            ✕
          </button>
        </div>

        {/* Share Input */}
        <div className="flex p-4 md:p-6 space-x-3 md:space-x-4">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
            alt="You"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          />
          <textarea
            rows={3}
            className="flex-1 bg-zinc-800 rounded-lg p-2 md:p-3 text-sm md:text-base text-white resize-none focus:outline-none"
            placeholder="Add a caption..."
          />
        </div>

        {/* Shared Post Preview */}
        <div className="bg-zinc-800 rounded-xl mx-4 md:mx-6 mb-4 md:mb-6 p-3 md:p-4 text-sm md:text-base">
          <div className="flex items-center mb-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full mr-2 object-cover"
            />
            <div className="font-medium text-white">{post.user.name}</div>
            <span className="ml-2 text-xs md:text-sm text-zinc-400">{post.timestamp}</span>
          </div>
          <p className="text-white/90 mb-3">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Shared"
              className="rounded-md object-cover w-full max-h-40 md:max-h-56 lg:max-h-72"
            />
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 px-4 md:px-6 pb-4 md:pb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-zinc-700 hover:bg-zinc-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onShare(post);
              onClose();
            }}
            className="px-4 py-2 rounded-md text-sm bg-lime-500 hover:bg-lime-400 text-black font-semibold"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
