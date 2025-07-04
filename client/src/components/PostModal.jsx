import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

const PostModal = ({ onClose, onPost }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePost = () => {
    onPost({
      content: text,
      image,
      user: {
        name: 'Your Name',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      },
      timestamp: 'Just now',
    });
    onClose();
  };

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
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center mb-4">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="user"
              className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-lime-500/20"
            />
            <span className="text-white font-medium text-sm">Your Name</span>
          </div>

          {/* Textarea */}
          <textarea
            rows="4"
            className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent placeholder-zinc-400"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Image Preview */}
          {image && (
            <div className="mt-4 relative">
              <img
                src={image}
                alt="preview"
                className="w-full rounded-xl max-h-60 object-cover border border-zinc-700"
              />
              <button
                onClick={() => setImage(null)}
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
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            disabled={!text.trim() && !image}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              text.trim() || image
                ? 'bg-lime-500 text-black hover:bg-lime-400'
                : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
