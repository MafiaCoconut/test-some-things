import React from 'react';
import { Trash2, Eye, Heart } from 'lucide-react';

const DollCard = ({ doll, onRemove }) => {
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove(doll.id);
  };

  return (
    <div className="project-card bg-monstrino-pink/20 hover:bg-monstrino-pink/30 border border-monstrino-pink/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-monstrino-pink/20 group">
      {/* Doll Image */}
      <div className="aspect-[3/4] bg-monstrino-black/50 relative overflow-hidden">
        {doll.image ? (
          <img 
            src={doll.image} 
            alt={doll.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl">🧸</div>
          </div>
        )}
        
        {/* Remove Button */}
        <button
          onClick={handleRemoveClick}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Trash2 className="w-3 h-3" />
        </button>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <button className="bg-monstrino-white/20 p-2 rounded-full hover:bg-monstrino-white/30 transition-colors duration-150">
            <Eye className="w-4 h-4 text-white" />
          </button>
          <button className="bg-monstrino-white/20 p-2 rounded-full hover:bg-monstrino-white/30 transition-colors duration-150">
            <Heart className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Doll Info */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-monstrino-white text-sm leading-tight">
          {doll.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-monstrino-pink font-mono uppercase tracking-wide">
            {doll.character}
          </span>
          <span className="text-monstrino-white/60 font-mono">
            {doll.year}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          <span className="service-button bg-monstrino-purple/50 text-monstrino-white px-2 py-1 rounded-full font-mono text-xs uppercase tracking-wide">
            {doll.series}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DollCard;