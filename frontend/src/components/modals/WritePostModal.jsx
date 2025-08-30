import React, { useState } from 'react';
import { X, Edit } from 'lucide-react';

const WritePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text.trim()) {
      onSubmit(formData);
      setFormData({ title: '', text: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-monstrino-black border border-monstrino-purple/30 rounded-lg max-w-lg w-full shadow-2xl shadow-monstrino-purple/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-monstrino-purple/20">
          <div className="flex items-center space-x-2">
            <Edit className="w-5 h-5 text-monstrino-pink" />
            <h2 className="text-xl font-display font-bold text-monstrino-pink">
              Write Post
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-monstrino-white/60 hover:text-monstrino-white transition-colors duration-150"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Post Title */}
          <div className="space-y-2">
            <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
              Title (Optional)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="What's this post about?"
              className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg px-4 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
            />
          </div>

          {/* Post Content */}
          <div className="space-y-2">
            <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
              What's on your mind? *
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Share your thoughts with the monster community..."
              rows={6}
              className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg px-4 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent resize-none"
              required
            />
            <div className="text-right text-xs text-monstrino-white/50 font-mono">
              {formData.text.length}/500
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border border-monstrino-white/30 text-monstrino-white px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:bg-monstrino-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 cta-button bg-monstrino-pink hover:bg-monstrino-pink/90 text-monstrino-black px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePostModal;