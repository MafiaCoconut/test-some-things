import React from 'react';
import { mockUserData } from '../../data/mockAppData';

const UserHeader = () => {
  const user = mockUserData.currentUser;

  return (
    <div className="bg-monstrino-purple/10 border-b border-monstrino-purple/20 p-6">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-monstrino-pink flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-monstrino-black">
              {user.username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-monstrino-white mb-1">
            {user.username}
          </h2>
          <p className="text-monstrino-white/70 text-sm leading-relaxed">
            {user.bio}
          </p>
        </div>

        {/* Stats */}
        <div className="hidden md:flex space-x-6 text-center">
          <div>
            <div className="text-lg font-bold text-monstrino-pink">{user.stats.collections}</div>
            <div className="text-xs text-monstrino-white/60 font-mono uppercase tracking-wide">Collections</div>
          </div>
          <div>
            <div className="text-lg font-bold text-monstrino-pink">{user.stats.dolls}</div>
            <div className="text-xs text-monstrino-white/60 font-mono uppercase tracking-wide">Dolls</div>
          </div>
          <div>
            <div className="text-lg font-bold text-monstrino-pink">{user.stats.friends}</div>
            <div className="text-xs text-monstrino-white/60 font-mono uppercase tracking-wide">Friends</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;