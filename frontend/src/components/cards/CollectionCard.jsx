import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Calendar } from 'lucide-react';

const CollectionCard = ({ collection }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/collection/${collection.id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      onClick={handleClick}
      className="project-card bg-monstrino-purple/20 hover:bg-monstrino-purple/30 border border-monstrino-purple/30 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-monstrino-purple/20"
    >
      {/* Collection Image */}
      <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-monstrino-black/50">
        {collection.coverImage ? (
          <img 
            src={collection.coverImage} 
            alt={collection.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FolderOpen className="w-12 h-12 text-monstrino-purple" />
          </div>
        )}
      </div>

      {/* Collection Info */}
      <div className="space-y-3">
        <h3 className="card-heading text-lg font-semibold text-monstrino-white hover:text-monstrino-pink transition-colors duration-150">
          {collection.name}
        </h3>
        
        <p className="body-medium text-sm text-monstrino-white/70 line-clamp-2">
          {collection.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 text-monstrino-pink">
            <FolderOpen className="w-3 h-3" />
            <span className="font-mono uppercase tracking-wide">
              {collection.dollsCount} {collection.dollsCount === 1 ? 'Doll' : 'Dolls'}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-monstrino-white/50">
            <Calendar className="w-3 h-3" />
            <span className="font-mono">
              {formatDate(collection.createdAt)}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="service-button bg-monstrino-purple/50 text-monstrino-white px-2 py-1 rounded-full font-mono text-xs uppercase tracking-wide">
            Collection
          </span>
          {collection.dollsCount > 10 && (
            <span className="service-button bg-monstrino-pink/50 text-monstrino-white px-2 py-1 rounded-full font-mono text-xs uppercase tracking-wide">
              Popular
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;