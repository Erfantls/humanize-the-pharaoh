
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface OutputQualityGradingProps {
  humanScore: number;
  aiScore: number;
}

const OutputQualityGrading: React.FC<OutputQualityGradingProps> = ({ humanScore, aiScore }) => {
  const getGrade = () => {
    if (humanScore >= 80) {
      return {
        grade: 'Highly Human',
        color: 'text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <CheckCircle className="w-5 h-5" />
      };
    } else if (humanScore >= 60) {
      return {
        grade: 'Good',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        icon: <AlertTriangle className="w-5 h-5" />
      };
    } else {
      return {
        grade: 'Needs Work',
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <XCircle className="w-5 h-5" />
      };
    }
  };

  const grade = getGrade();

  return (
    <div className={`p-4 rounded-lg border-2 ${grade.bgColor} ${grade.borderColor} animate-fade-in`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={grade.color}>
            {grade.icon}
          </div>
          <h3 className={`font-semibold ${grade.color}`}>
            Quality Grade: {grade.grade}
          </h3>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Detection Risk: {aiScore}%
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Human-like Score</span>
            <span className={`font-medium ${grade.color}`}>{humanScore}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                humanScore >= 80 ? 'bg-green-500' : 
                humanScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${humanScore}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">AI Detection Risk</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{aiScore}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                aiScore <= 20 ? 'bg-green-500' : 
                aiScore <= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${aiScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        {humanScore >= 80 && "Excellent! This text should pass most AI detectors."}
        {humanScore >= 60 && humanScore < 80 && "Good result, but consider another pass for better scores."}
        {humanScore < 60 && "Consider using a different mode or running the humanizer again."}
      </div>
    </div>
  );
};

export default OutputQualityGrading;
