import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Users, Heart, ArrowRight } from 'lucide-react';

const HeroSection = ({ onOpenAuth, onSubscribe, isSubscribed }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setEmail('');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-monstrino-black via-monstrino-purple/20 to-monstrino-black"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-monstrino-pink/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-monstrino-purple/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="brand-display text-6xl md:text-8xl lg:text-9xl font-display font-bold text-monstrino-pink mb-6 leading-none">
            MONSTRINO
          </h1>
          
          <div className="text-monstrino-purple font-mono text-lg md:text-xl tracking-wider uppercase mb-8">
            Where Monsters Unite
          </div>

          {/* Hero Description */}
          <p className="body-large text-xl md:text-2xl text-monstrino-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the most fang-tastic social network for Monster High fans! Connect with fellow ghouls, 
            share your monster moments, and embrace your inner monster.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
            <div className="flex items-center space-x-2 text-monstrino-pink">
              <Users className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wide">Monster Community</span>
            </div>
            <div className="flex items-center space-x-2 text-monstrino-pink">
              <Heart className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wide">Ghoul Friends</span>
            </div>
            <div className="flex items-center space-x-2 text-monstrino-pink">
              <Zap className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wide">Spooky Fun</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => onOpenAuth('register')}
              className="cta-button large bg-monstrino-pink hover:bg-monstrino-pink/90 text-monstrino-black border-monstrino-pink px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-monstrino-pink/25"
            >
              Join the Pack
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </button>
            <button
              onClick={() => navigate('/user')}
              className="cta-button large bg-transparent hover:bg-monstrino-white/10 text-monstrino-white border-monstrino-white px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105"
            >
              Watch Demo
            </button>
          </div>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for monster updates"
                className="flex-1 bg-monstrino-white/10 border border-monstrino-purple/30 rounded-full px-6 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className={`service-button ${isSubscribed ? 'bg-monstrino-green' : 'bg-monstrino-purple hover:bg-monstrino-purple/90'} text-monstrino-white px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wide transition-all duration-300 whitespace-nowrap`}
              >
                {isSubscribed ? 'Subscribed!' : 'Get Updates'}
              </button>
            </form>
            <p className="text-monstrino-white/60 text-sm mt-3">
              Be the first to hear about new monster features and community events
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;