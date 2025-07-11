
import React from 'react';
import { Brain, Briefcase, Palette, GraduationCap, Heart } from 'lucide-react';

interface HumanizationModesProps {
  selectedMode: string;
  onModeChange: (mode: string) => void;
  userType: string;
}

const HumanizationModes: React.FC<HumanizationModesProps> = ({ 
  selectedMode, 
  onModeChange, 
  userType 
}) => {
  const modes = [
    {
      id: 'casual',
      name: 'Casual',
      description: 'Relaxed, conversational tone',
      icon: <Heart className="w-5 h-5" />,
      free: true
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Formal business communication',
      icon: <Briefcase className="w-5 h-5" />,
      free: true
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Engaging, imaginative style',
      icon: <Palette className="w-5 h-5" />,
      free: false
    },
    {
      id: 'academic',
      name: 'Academic',
      description: 'Scholarly, research-focused',
      icon: <GraduationCap className="w-5 h-5" />,
      free: false
    },
    {
      id: 'friendly',
      name: 'Friendly',
      description: 'Warm, approachable tone',
      icon: <Brain className="w-5 h-5" />,
      free: false
    }
  ];

  const isPremium = userType === 'premium' || userType === 'admin';

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Humanization Mode
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {modes.map((mode) => {
          const isDisabled = !mode.free && !isPremium;
          const isSelected = selectedMode === mode.id;
          
          return (
            <button
              key={mode.id}
              onClick={() => !isDisabled && onModeChange(mode.id)}
              disabled={isDisabled}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : isDisabled
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-full ${
                  isSelected 
                    ? 'bg-purple-500 text-white' 
                    : isDisabled
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                }`}>
                  {mode.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                    <span>{mode.name}</span>
                    {!mode.free && (
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full">
                        PRO
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {mode.description}
                  </div>
                </div>
              </div>
              
              {isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Premium Only
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HumanizationModes;
