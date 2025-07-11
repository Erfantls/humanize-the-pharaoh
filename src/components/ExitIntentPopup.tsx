
import React, { useState, useEffect } from 'react';
import { X, Crown, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExitIntentPopupProps {
  onUpgrade: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ onUpgrade }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleUpgrade = () => {
    onUpgrade();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-800 dark:text-white">Wait!</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Special Launch Offer!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get 50% OFF our yearly premium plan before you leave!
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">$24.99</span>
                <span className="text-sm text-gray-500 ml-2 line-through">$49.99</span>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                Limited Time: 50% OFF
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300">Unlimited humanizations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Priority processing</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300">Advanced AI modes</span>
            </div>
          </div>

          <div className="text-center text-xs text-red-500 dark:text-red-400 mb-4">
            ⏰ This offer expires when you leave the page!
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Claim 50% OFF Now
          </Button>
          
          <Button
            onClick={handleClose}
            variant="ghost"
            className="w-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            No thanks, I'll pay full price later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
