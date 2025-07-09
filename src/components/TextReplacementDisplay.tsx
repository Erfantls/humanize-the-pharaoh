
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Replacement {
  original: string;
  humanized: string;
  position: number;
}

interface TextReplacementDisplayProps {
  replacements: Replacement[];
  isProcessing: boolean;
}

const TextReplacementDisplay: React.FC<TextReplacementDisplayProps> = ({ 
  replacements, 
  isProcessing 
}) => {
  if (!isProcessing && replacements.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg animate-fade-in">
      <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
        Humanization Changes
      </h3>
      
      {isProcessing ? (
        <div className="text-sm text-blue-700 dark:text-blue-300">
          Analyzing and humanizing text...
        </div>
      ) : (
        <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
          {replacements.map((replacement, index) => (
            <div 
              key={index} 
              className="flex items-center text-sm bg-white dark:bg-gray-800 rounded-lg p-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-red-600 dark:text-red-400 font-medium flex-shrink-0">
                "{replacement.original}"
              </span>
              <ArrowRight className="w-3 h-3 mx-2 text-gray-400 flex-shrink-0" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                "{replacement.humanized}"
              </span>
            </div>
          ))}
        </div>
      )}
      
      {!isProcessing && replacements.length > 0 && (
        <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
          {replacements.length} changes made to sound more human
        </div>
      )}
    </div>
  );
};

export default TextReplacementDisplay;
