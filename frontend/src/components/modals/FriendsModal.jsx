import React, { useState } from 'react';
import { X, Users, UserPlus, Search, Circle } from 'lucide-react';

const FriendsModal = ({ isOpen, onClose, friends }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-monstrino-green';
      case 'away': return 'text-monstrino-yellow';
      default: return 'text-monstrino-white/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      default: return 'Offline';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-monstrino-black border border-monstrino-purple/30 rounded-lg max-w-md w-full max-h-[80vh] shadow-2xl shadow-monstrino-purple/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-monstrino-purple/20">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-monstrino-pink" />
            <h2 className="text-xl font-display font-bold text-monstrino-pink">
              My Friends ({friends.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-monstrino-white/60 hover:text-monstrino-white transition-colors duration-150"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-monstrino-purple/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-monstrino-purple w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search friends..."
              className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg pl-10 pr-4 py-2 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3 p-3 bg-monstrino-white/5 rounded-lg hover:bg-monstrino-white/10 transition-colors duration-150">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-monstrino-pink flex items-center justify-center overflow-hidden relative">
                {friend.avatar ? (
                  <img 
                    src={friend.avatar} 
                    alt={friend.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-monstrino-black">
                    {friend.username.charAt(0).toUpperCase()}
                  </span>
                )}
                <Circle className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(friend.status)} fill-current`} />
              </div>

              {/* Friend Info */}
              <div className="flex-1">
                <div className="font-semibold text-monstrino-white text-sm">
                  {friend.username}
                </div>
                <div className={`text-xs font-mono ${getStatusColor(friend.status)}`}>
                  {getStatusText(friend.status)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="text-monstrino-purple hover:text-monstrino-pink font-mono text-xs uppercase tracking-wide">
                  Message
                </button>
                <button className="text-monstrino-white/60 hover:text-red-400 font-mono text-xs uppercase tracking-wide">
                  Remove
                </button>
              </div>
            </div>
          ))}

          {filteredFriends.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-monstrino-purple mx-auto mb-3" />
              <p className="text-monstrino-white/60">
                {searchTerm ? 'No friends found' : 'No friends yet'}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-monstrino-purple/20">
          <button className="w-full cta-button bg-monstrino-purple hover:bg-monstrino-purple/90 text-monstrino-white px-4 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Add Friend</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;