import React, { useState } from 'react';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import PostCard from '../cards/PostCard';
import CollectionCard from '../cards/CollectionCard';
import WritePostModal from '../modals/WritePostModal';
import FriendsModal from '../modals/FriendsModal';
import GroupsModal from '../modals/GroupsModal';
import { mockUserData } from '../../data/mockAppData';
import { Edit, Users, MessageSquare, Clock } from 'lucide-react';

const UserPage = () => {
  const [posts, setPosts] = useState(mockUserData.posts);
  const [isWritePostModalOpen, setIsWritePostModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [isGroupsModalOpen, setIsGroupsModalOpen] = useState(false);

  const handleCreatePost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now(),
      date: new Date().toISOString(),
      likes: 0,
      comments: 0
    };
    setPosts([newPost, ...posts]);
    setIsWritePostModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-monstrino-black text-monstrino-white">
      <AppHeader />
      
      <div className="flex">
        <LeftMenu />
        
        <div className="flex-1">
          <UserHeader />
          
          {/* Main Content */}
          <div className="p-6">
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <button
                onClick={() => setIsWritePostModalOpen(true)}
                className="project-card bg-monstrino-purple/20 hover:bg-monstrino-purple/30 border border-monstrino-purple/30 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Edit className="w-5 h-5 text-monstrino-pink" />
                <span className="font-mono text-sm uppercase tracking-wide">Write Post</span>
              </button>

              <button
                onClick={() => setIsFriendsModalOpen(true)}
                className="project-card bg-monstrino-pink/20 hover:bg-monstrino-pink/30 border border-monstrino-pink/30 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5 text-monstrino-pink" />
                <span className="font-mono text-sm uppercase tracking-wide">Friends</span>
              </button>

              <button
                onClick={() => setIsGroupsModalOpen(true)}
                className="project-card bg-monstrino-yellow/20 hover:bg-monstrino-yellow/30 border border-monstrino-yellow/30 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-5 h-5 text-monstrino-yellow" />
                <span className="font-mono text-sm uppercase tracking-wide text-monstrino-black">Groups</span>
              </button>

              <div className="project-card bg-monstrino-blue/20 border border-monstrino-blue/30 rounded-lg p-4 flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5 text-monstrino-blue" />
                <span className="font-mono text-sm uppercase tracking-wide">Hours</span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Posts Section */}
              <div>
                <h2 className="text-lg font-display font-bold text-monstrino-pink mb-4">
                  Recent Posts
                </h2>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                  {posts.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">📝</div>
                      <p className="text-monstrino-white/60">No posts yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Collections Section */}
              <div>
                <h2 className="text-lg font-display font-bold text-monstrino-pink mb-4">
                  Featured Collections
                </h2>
                <div className="space-y-4">
                  {mockUserData.collections.slice(0, 2).map((collection) => (
                    <div key={collection.id} className="transform scale-95">
                      <CollectionCard collection={collection} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppFooter />

      <WritePostModal
        isOpen={isWritePostModalOpen}
        onClose={() => setIsWritePostModalOpen(false)}
        onSubmit={handleCreatePost}
      />

      <FriendsModal
        isOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
        friends={mockUserData.friends}
      />

      <GroupsModal
        isOpen={isGroupsModalOpen}
        onClose={() => setIsGroupsModalOpen(false)}
        groups={mockUserData.groups}
      />
    </div>
  );
};

export default UserPage;