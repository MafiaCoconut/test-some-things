import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import CTASection from './CTASection';
import Footer from './Footer';
import AuthModal from './AuthModal';
import { mockData } from '../data/mock';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSubscribe = (email) => {
    // Mock subscription logic
    console.log('Subscribed:', email);
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="min-h-screen bg-monstrino-black text-monstrino-white">
      <Header onOpenAuth={handleOpenAuth} />
      <HeroSection 
        onOpenAuth={handleOpenAuth}
        onSubscribe={handleSubscribe}
        isSubscribed={isSubscribed}
      />
      <FeaturesSection features={mockData.features} />
      <CTASection onOpenAuth={handleOpenAuth} />
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />
    </div>
  );
};

export default LandingPage;