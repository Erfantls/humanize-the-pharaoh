
import React, { useState } from 'react';
import { X, Crown, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdBannerProps {
  onUpgrade: () => void;
}

const AdBanner: React.FC<AdBannerProps> = ({ onUpgrade }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-yellow-300" />
              <span className="font-bold text-lg">Limited Time Offer!</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Unlimited Humanizations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Advanced AI Modes</span>
              </div>
              <div className="text-sm">
                <span className="line-through opacity-75">$49.99</span>
                <span className="ml-2 font-bold text-yellow-300">$24.99/year</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={onUpgrade}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Upgrade Now - 50% OFF
            </Button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="md:hidden mt-3 text-sm opacity-90">
          🚀 Unlimited access • Advanced modes • Priority support
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
