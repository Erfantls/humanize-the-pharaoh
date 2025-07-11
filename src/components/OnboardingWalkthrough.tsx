
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingWalkthrough: React.FC<OnboardingWalkthroughProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to AI Text Humanizer!",
      description: "Transform AI-generated text into natural, human-like content in seconds.",
      icon: <Sparkles className="w-16 h-16 text-purple-500" />,
      features: [
        "Bypass AI detection systems",
        "Maintain original meaning",
        "Multiple humanization modes"
      ]
    },
    {
      title: "How It Works",
      description: "Simple 3-step process to humanize your content.",
      icon: <Zap className="w-16 h-16 text-blue-500" />,
      features: [
        "1. Paste your AI-generated text",
        "2. Choose your preferred mode",
        "3. Get human-like results instantly"
      ]
    },
    {
      title: "Ready to Get Started?",
      description: "You get 5 free humanizations per month. Upgrade for unlimited access!",
      icon: <Crown className="w-16 h-16 text-yellow-500" />,
      features: [
        "5 free uses per month",
        "10,000 character limit",
        "Upgrade for unlimited access"
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const skipTutorial = () => {
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-purple-500'
                      : index < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={skipTutorial}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {currentStepData.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {currentStepData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {currentStepData.description}
          </p>
          
          <div className="space-y-3">
            {currentStepData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-left">
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          {currentStep > 0 && (
            <Button
              onClick={() => setCurrentStep(currentStep - 1)}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={nextStep}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center justify-center space-x-2"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWalkthrough;
