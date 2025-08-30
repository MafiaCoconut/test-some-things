import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout - in real app would clear auth token
    navigate('/');
  };

  return (
    <header className="bg-monstrino-black border-b border-monstrino-purple/20 px-4 py-3">
      <div className="flex items-center justify-between max-w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-xl font-display font-bold text-monstrino-pink">
            MONSTRINO
          </div>
          <div className="hidden sm:block text-xs text-monstrino-purple font-mono tracking-wide">
            MONSTER HIGH SOCIAL
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-1 text-monstrino-pink hover:text-monstrino-white transition-colors duration-150"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-wide">Home</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-monstrino-pink hover:text-monstrino-white transition-colors duration-150"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-wide">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;