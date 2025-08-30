import React from 'react';
import { Heart } from 'lucide-react';

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-monstrino-black border-t border-monstrino-purple/20 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-monstrino-white/60 text-sm mb-2 md:mb-0">
          © {currentYear} Monstrino. Made with{' '}
          <Heart className="w-4 h-4 inline text-monstrino-pink mx-1" />
          for monster fans everywhere.
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-monstrino-white/40 font-mono">
          <span>BE FREAKY • BE FABULOUS • BE YOU</span>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;