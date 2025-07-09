
import React from 'react';
import { X, Check, Crown, Sparkles, Zap, Shield, Clock, Calendar } from 'lucide-react';

interface YearlyPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
}

const YearlyPaymentModal: React.FC<YearlyPaymentModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  const features = [
    {
      icon: <Calendar className="w-5 h-5 text-purple-500" />,
      title: 'Full Year Access',
      description: 'Complete access for 365 days'
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      title: 'Unlimited Humanization',
      description: 'Process as much text as you need'
    },
    {
      icon: <Clock className="w-5 h-5 text-green-500" />,
      title: 'Priority Processing',
      description: 'Skip queues with faster processing'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
      title: 'Advanced AI Detection Bypass',
      description: 'Latest algorithms for better results'
    },
    {
      icon: <Shield className="w-5 h-5 text-red-500" />,
      title: 'Premium Support',
      description: '24/7 priority customer support'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Yearly Premium</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">One payment, full year access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="mb-8">
          <div className="text-center mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$49.99</span>
              <span className="text-lg text-gray-600 dark:text-gray-300 ml-2">/year</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="line-through text-gray-400">$119.88</span>
              <span className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                Save 58%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">One-time payment • No recurring charges</p>
          </div>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  {feature.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{feature.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Crown className="w-5 h-5" />
            <span>Get Yearly Premium</span>
          </button>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Secure payment • 30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyPaymentModal;
