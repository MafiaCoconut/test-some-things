import React, { useState } from 'react';
import { X, MessageSquare, Users, Search, Plus } from 'lucide-react';

const GroupsModal = ({ isOpen, onClose, groups }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-monstrino-black border border-monstrino-purple/30 rounded-lg max-w-lg w-full max-h-[80vh] shadow-2xl shadow-monstrino-purple/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-monstrino-purple/20">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-monstrino-pink" />
            <h2 className="text-xl font-display font-bold text-monstrino-pink">
              My Groups ({groups.length})
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
              placeholder="Search groups..."
              className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg pl-10 pr-4 py-2 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
            />
          </div>
        </div>

        {/* Groups List */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {filteredGroups.map((group) => (
            <div key={group.id} className="project-card bg-monstrino-white/5 hover:bg-monstrino-white/10 border border-monstrino-purple/20 rounded-lg p-4 transition-all duration-300">
              <div className="flex items-start space-x-3">
                {/* Group Image */}
                <div className="w-12 h-12 rounded-lg bg-monstrino-purple flex items-center justify-center overflow-hidden">
                  {group.image ? (
                    <img 
                      src={group.image} 
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MessageSquare className="w-6 h-6 text-monstrino-white" />
                  )}
                </div>

                {/* Group Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-monstrino-white mb-1">
                    {group.name}
                  </h3>
                  <p className="text-sm text-monstrino-white/70 mb-2 leading-relaxed">
                    {group.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-monstrino-purple">
                      <Users className="w-3 h-3" />
                      <span className="text-xs font-mono">
                        {group.members} members
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-monstrino-pink hover:text-monstrino-white font-mono text-xs uppercase tracking-wide">
                        View
                      </button>
                      <button className="text-red-400 hover:text-red-300 font-mono text-xs uppercase tracking-wide">
                        Leave
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-monstrino-purple mx-auto mb-3" />
              <p className="text-monstrino-white/60">
                {searchTerm ? 'No groups found' : 'No groups yet'}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-monstrino-purple/20 space-y-3">
          <button className="w-full cta-button bg-monstrino-purple hover:bg-monstrino-purple/90 text-monstrino-white px-4 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Join Group</span>
          </button>
          
          <button className="w-full bg-transparent border border-monstrino-white/30 text-monstrino-white px-4 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:bg-monstrino-white/10">
            Browse All Groups
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupsModal;