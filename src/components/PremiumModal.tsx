
import React from 'react';
import { X, Check, Crown } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    'Unlimited text humanization',
    'Advanced AI detection bypass',
    'Priority processing speed',
    'Custom humanization styles',
    'Bulk text processing',
    'API access',
    'No advertisements',
    '24/7 premium support'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Crown className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Go Premium</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-purple-600">$9.99</div>
            <div className="text-gray-600">per month</div>
          </div>
          
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105">
          Upgrade to Premium
        </button>
        
        <div className="text-center mt-4 text-sm text-gray-500">
          Cancel anytime • 30-day money-back guarantee
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
