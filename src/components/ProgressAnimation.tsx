
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Brain, Sparkles, Wand2 } from 'lucide-react';

const ProgressAnimation: React.FC = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Reset for continuous animation
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  const getProgressStage = () => {
    if (progress < 30) return { icon: Brain, text: "Analyzing AI patterns..." };
    if (progress < 60) return { icon: Wand2, text: "Applying humanization..." };
    if (progress < 90) return { icon: Sparkles, text: "Polishing output..." };
    return { icon: Sparkles, text: "Finalizing text..." };
  };

  const stage = getProgressStage();
  const IconComponent = stage.icon;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <IconComponent className="w-6 h-6 text-purple-600 animate-pulse" />
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {stage.text}
        </p>
      </div>
      
      <div className="space-y-2">
        <Progress value={progress} className="w-full h-2" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Processing</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="flex justify-center space-x-1">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
            style={{
              animationDelay: `${dot * 0.1}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressAnimation;
