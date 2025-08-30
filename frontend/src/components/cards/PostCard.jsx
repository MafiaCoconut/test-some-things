import React from 'react';
import { Heart, MessageCircle, Calendar } from 'lucide-react';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="project-card bg-monstrino-white/5 hover:bg-monstrino-white/10 border border-monstrino-purple/20 rounded-lg p-4 transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-monstrino-purple" />
          <span className="text-monstrino-white/60 text-sm font-mono">
            {formatDate(post.date)}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-3">
        {post.title && (
          <h3 className="font-semibold text-monstrino-white text-lg leading-tight">
            {post.title}
          </h3>
        )}
        
        <p className="text-monstrino-white/80 leading-relaxed">
          {post.text}
        </p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-monstrino-purple/20">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-monstrino-pink hover:text-monstrino-white transition-colors duration-150">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-mono">{post.likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-monstrino-blue hover:text-monstrino-white transition-colors duration-150">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-mono">{post.comments}</span>
          </button>
        </div>

        <button className="text-monstrino-purple hover:text-monstrino-pink transition-colors duration-150 font-mono text-xs uppercase tracking-wide">
          View Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;