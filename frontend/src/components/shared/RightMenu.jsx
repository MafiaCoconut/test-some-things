import React from 'react';
import { Plus, Palette, FolderPlus } from 'lucide-react';

const RightMenu = ({ onAddDoll }) => {
  const menuItems = [
    { 
      icon: Palette, 
      label: 'Change Colors', 
      action: () => console.log('Change colors clicked'),
      color: 'monstrino-purple'
    },
    { 
      icon: Plus, 
      label: 'Add Item', 
      action: onAddDoll,
      color: 'monstrino-pink'
    },
    { 
      icon: FolderPlus, 
      label: 'Create Collection', 
      action: () => console.log('Create collection clicked'),
      color: 'monstrino-yellow'
    },
  ];

  return (
    <div className="bg-monstrino-black border-l border-monstrino-purple/20 w-48 min-h-screen p-4">
      <h3 className="text-monstrino-pink font-mono text-xs uppercase tracking-wide mb-4">
        Quick Actions
      </h3>
      
      <div className="space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-300 hover:scale-105 bg-${item.color}/20 hover:bg-${item.color}/30 border border-${item.color}/30`}
            >
              <Icon className={`w-4 h-4 text-${item.color}`} />
              <span className="font-mono text-xs uppercase tracking-wide text-monstrino-white">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Collection Info */}
      <div className="mt-8 p-3 bg-monstrino-white/5 rounded-lg border border-monstrino-purple/20">
        <h4 className="text-monstrino-pink font-mono text-xs uppercase tracking-wide mb-2">
          Collection Info
        </h4>
        <div className="space-y-2 text-xs text-monstrino-white/70">
          <div>Created: Today</div>
          <div>Last Updated: Just now</div>
          <div>Visibility: Private</div>
        </div>
      </div>
    </div>
  );
};

export default RightMenu;