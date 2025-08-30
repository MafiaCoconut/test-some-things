import React, { useState } from 'react';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import CollectionCard from '../cards/CollectionCard';
import CreateCollectionModal from '../modals/CreateCollectionModal';
import { mockUserData } from '../../data/mockAppData';
import { Plus } from 'lucide-react';

const AllCollectionsPage = () => {
  const [collections, setCollections] = useState(mockUserData.collections);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateCollection = (newCollection) => {
    const collection = {
      ...newCollection,
      id: Date.now(),
      dollsCount: 0,
      createdAt: new Date().toISOString()
    };
    setCollections([collection, ...collections]);
    setIsCreateModalOpen(false);
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
            {/* Page Title and Actions */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-display font-bold text-monstrino-pink">
                All Collections
              </h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="cta-button bg-monstrino-purple hover:bg-monstrino-purple/90 text-monstrino-white px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wide transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Collection</span>
              </button>
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                />
              ))}
            </div>

            {/* Empty State */}
            {collections.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">👻</div>
                <h3 className="text-xl font-semibold text-monstrino-white mb-2">
                  No Collections Yet
                </h3>
                <p className="text-monstrino-white/60 mb-6">
                  Start building your monster collection today!
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="cta-button bg-monstrino-pink hover:bg-monstrino-pink/90 text-monstrino-black px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300"
                >
                  Create Your First Collection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AppFooter />

      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCollection}
      />
    </div>
  );
};

export default AllCollectionsPage;