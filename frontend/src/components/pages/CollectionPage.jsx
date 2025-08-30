import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '../shared/AppHeader';
import LeftMenu from '../shared/LeftMenu';
import UserHeader from '../shared/UserHeader';
import AppFooter from '../shared/AppFooter';
import DollCard from '../cards/DollCard';
import RightMenu from '../shared/RightMenu';
import AddDollModal from '../modals/AddDollModal';
import { mockUserData } from '../../data/mockAppData';
import { ArrowLeft, Plus } from 'lucide-react';

const CollectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddDollModalOpen, setIsAddDollModalOpen] = useState(false);
  
  // Find collection by ID
  const collection = mockUserData.collections.find(c => c.id === parseInt(id));
  const [dolls, setDolls] = useState(
    mockUserData.dolls.filter(doll => doll.collectionId === parseInt(id))
  );

  if (!collection) {
    return (
      <div className="min-h-screen bg-monstrino-black text-monstrino-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-monstrino-pink mb-4">Collection Not Found</h1>
          <button
            onClick={() => navigate('/collections')}
            className="cta-button bg-monstrino-purple hover:bg-monstrino-purple/90 text-monstrino-white px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300"
          >
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  const handleAddDoll = (dollData) => {
    const newDoll = {
      ...dollData,
      id: Date.now(),
      collectionId: parseInt(id)
    };
    setDolls([...dolls, newDoll]);
    setIsAddDollModalOpen(false);
  };

  const handleRemoveDoll = (dollId) => {
    if (window.confirm('Remove this doll from the collection?')) {
      setDolls(dolls.filter(doll => doll.id !== dollId));
    }
  };

  return (
    <div className="min-h-screen bg-monstrino-black text-monstrino-white">
      <AppHeader />
      
      <div className="flex">
        <LeftMenu />
        
        <div className="flex-1">
          <UserHeader />
          
          {/* Main Content */}
          <div className="flex">
            <div className="flex-1 p-6">
              {/* Back Button and Collection Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/collections')}
                    className="flex items-center space-x-2 text-monstrino-pink hover:text-monstrino-white transition-colors duration-150"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-mono text-xs uppercase tracking-wide">Back</span>
                  </button>
                  <div>
                    <h1 className="text-2xl font-display font-bold text-monstrino-pink">
                      {collection.name}
                    </h1>
                    <p className="text-monstrino-white/70 text-sm">
                      {collection.description}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-monstrino-pink">{dolls.length}</div>
                  <div className="text-xs text-monstrino-white/60 font-mono uppercase tracking-wide">
                    {dolls.length === 1 ? 'Doll' : 'Dolls'}
                  </div>
                </div>
              </div>

              {/* Dolls Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dolls.map((doll) => (
                  <DollCard 
                    key={doll.id} 
                    doll={doll}
                    onRemove={handleRemoveDoll}
                  />
                ))}
              </div>

              {/* Empty State */}
              {dolls.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🧸</div>
                  <h3 className="text-xl font-semibold text-monstrino-white mb-2">
                    No Dolls Yet
                  </h3>
                  <p className="text-monstrino-white/60 mb-6">
                    Start adding dolls to your collection!
                  </p>
                  <button
                    onClick={() => setIsAddDollModalOpen(true)}
                    className="cta-button bg-monstrino-pink hover:bg-monstrino-pink/90 text-monstrino-black px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300"
                  >
                    Add Your First Doll
                  </button>
                </div>
              )}
            </div>

            {/* Right Menu */}
            <RightMenu onAddDoll={() => setIsAddDollModalOpen(true)} />
          </div>
        </div>
      </div>

      <AppFooter />

      <AddDollModal
        isOpen={isAddDollModalOpen}
        onClose={() => setIsAddDollModalOpen(false)}
        onSubmit={handleAddDoll}
      />
    </div>
  );
};

export default CollectionPage;