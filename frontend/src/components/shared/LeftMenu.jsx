import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, FolderOpen, Users, MessageSquare } from 'lucide-react';

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/user', label: 'My Page', icon: User },
    { path: '/collections', label: 'My Collections', icon: FolderOpen },
    { path: '/friends', label: 'My Friends', icon: Users },
    { path: '/groups', label: 'My Groups', icon: MessageSquare },
  ];

  return (
    <div className="bg-monstrino-black border-r border-monstrino-purple/20 w-48 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-150 ${
                isActive 
                  ? 'bg-monstrino-purple text-monstrino-white' 
                  : 'text-monstrino-pink hover:bg-monstrino-purple/20 hover:text-monstrino-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default LeftMenu;