
import React from 'react';
import { Crown, Zap, Calendar, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  reason: 'usage_limit' | 'character_limit' | 'feature_locked';
  currentUsage?: number;
  maxUsage?: number;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  reason,
  currentUsage = 0,
  maxUsage = 5
}) => {
  if (!isOpen) return null;

  const getPromptContent = () => {
    switch (reason) {
      case 'usage_limit':
        return {
          title: 'Monthly Limit Reached',
          description: `You've used all ${maxUsage} free humanizations this month. Upgrade to get unlimited access for the entire year!`,
          icon: <Zap className="w-8 h-8 text-yellow-500" />,
          benefits: [
            'Unlimited text humanization',
            'No character limits',
            'Priority processing speed',
            'Advanced AI detection bypass',
            'Full year access'
          ]
        };
      case 'character_limit':
        return {
          title: 'Text Too Long',
          description: 'Your text exceeds the 10,000 character limit for free accounts. Upgrade for unlimited character processing!',
          icon: <Crown className="w-8 h-8 text-purple-500" />,
          benefits: [
            'Unlimited character processing',
            'Bulk text humanization',
            'Advanced algorithms',
            'Priority support',
            'Full year access'
          ]
        };
      case 'feature_locked':
        return {
          title: 'Premium Feature',
          description: 'This advanced feature is available for premium users only. Upgrade to unlock all features!',
          icon: <Calendar className="w-8 h-8 text-blue-500" />,
          benefits: [
            'All premium features',
            'Advanced humanization modes',
            'API access (future)',
            'Custom styles',
            'Full year access'
          ]
        };
      default:
        return {
          title: 'Upgrade Required',
          description: 'Upgrade to premium for unlimited access!',
          icon: <Crown className="w-8 h-8 text-purple-500" />,
          benefits: ['Unlimited access', 'Premium features']
        };
    }
  };

  const content = getPromptContent();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {content.icon}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {content.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {content.description}
        </p>

        {reason === 'usage_limit' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-700 dark:text-red-300">Usage this month</span>
              <span className="font-bold text-red-700 dark:text-red-300">
                {currentUsage}/{maxUsage}
              </span>
            </div>
            <div className="mt-2 bg-red-200 dark:bg-red-800 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((currentUsage / maxUsage) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
            What you'll get:
          </h4>
          <ul className="space-y-2">
            {content.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            $49.99
            <span className="text-sm font-normal text-gray-500 ml-1">/year</span>
          </div>
          <div className="text-xs text-gray-500">
            One-time payment • No recurring charges
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Crown className="w-5 h-5" />
            <span>Upgrade Now</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;
