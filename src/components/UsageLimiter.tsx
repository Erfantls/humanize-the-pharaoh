
import React from 'react';
import { AlertTriangle, Crown } from 'lucide-react';

interface UsageLimiterProps {
  usageCount: number;
  maxUsage: number;
  onUpgrade: () => void;
}

const UsageLimiter: React.FC<UsageLimiterProps> = ({ usageCount, maxUsage, onUpgrade }) => {
  const isLimitReached = usageCount >= maxUsage;
  const isNearLimit = usageCount >= maxUsage * 0.8;

  if (!isNearLimit) return null;

  return (
    <div className={`p-4 rounded-lg border-2 ${
      isLimitReached 
        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    } animate-fade-in`}>
      <div className="flex items-center mb-2">
        <AlertTriangle className={`w-5 h-5 mr-2 ${
          isLimitReached ? 'text-red-500' : 'text-yellow-500'
        }`} />
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
          {isLimitReached ? 'Usage Limit Reached' : 'Almost at Limit'}
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {isLimitReached 
          ? `You've used all ${maxUsage} free humanizations today. Upgrade to continue.`
          : `You've used ${usageCount} of ${maxUsage} free humanizations today.`
        }
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isLimitReached ? 'bg-red-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${Math.min((usageCount / maxUsage) * 100, 100)}%` }}
          />
        </div>
        
        <button
          onClick={onUpgrade}
          className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105"
        >
          <Crown className="w-4 h-4 mr-1" />
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default UsageLimiter;
