
import React, { useState } from 'react';
import { ArrowLeftRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HumanizationPreviewProps {
  originalText: string;
  humanizedText: string;
  onToggle?: () => void;
}

const HumanizationPreview: React.FC<HumanizationPreviewProps> = ({ 
  originalText, 
  humanizedText, 
  onToggle 
}) => {
  const [showComparison, setShowComparison] = useState(false);
  const [viewMode, setViewMode] = useState<'original' | 'humanized' | 'side-by-side'>('humanized');

  const getChangedWords = () => {
    const originalWords = originalText.split(' ');
    const humanizedWords = humanizedText.split(' ');
    const changes: { word: string, type: 'changed' | 'added' | 'removed', index: number }[] = [];

    const maxLength = Math.max(originalWords.length, humanizedWords.length);
    
    for (let i = 0; i < maxLength; i++) {
      const original = originalWords[i];
      const humanized = humanizedWords[i];
      
      if (original && !humanized) {
        changes.push({ word: original, type: 'removed', index: i });
      } else if (!original && humanized) {
        changes.push({ word: humanized, type: 'added', index: i });
      } else if (original !== humanized) {
        changes.push({ word: humanized, type: 'changed', index: i });
      }
    }
    
    return changes;
  };

  const renderHighlightedText = (text: string, isOriginal: boolean) => {
    const words = text.split(' ');
    const changes = getChangedWords();
    
    return words.map((word, index) => {
      const change = changes.find(c => c.index === index);
      let className = '';
      
      if (change) {
        if (change.type === 'changed') {
          className = isOriginal ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
        } else if (change.type === 'added' && !isOriginal) {
          className = 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
        } else if (change.type === 'removed' && isOriginal) {
          className = 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 line-through';
        }
      }
      
      return (
        <span key={index} className={`px-1 rounded ${className}`}>
          {word}
        </span>
      );
    });
  };

  if (!humanizedText) return null;

  return (
    <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Humanization Preview
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowComparison(!showComparison)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            {showComparison ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showComparison ? 'Hide' : 'Show'} Changes</span>
          </Button>
          
          {showComparison && (
            <Button
              onClick={() => setViewMode(viewMode === 'side-by-side' ? 'humanized' : 'side-by-side')}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>{viewMode === 'side-by-side' ? 'Single' : 'Compare'}</span>
            </Button>
          )}
        </div>
      </div>

      {viewMode === 'side-by-side' && showComparison ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Original (AI-Generated)</h4>
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-red-200 dark:border-red-800 text-sm leading-relaxed">
              {showComparison ? renderHighlightedText(originalText, true) : originalText}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Humanized</h4>
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800 text-sm leading-relaxed">
              {showComparison ? renderHighlightedText(humanizedText, false) : humanizedText}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-green-600 dark:text-green-400">
            Humanized Result
          </h4>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800 text-sm leading-relaxed">
            {showComparison ? renderHighlightedText(humanizedText, false) : humanizedText}
          </div>
        </div>
      )}

      {showComparison && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Changed words</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Added words</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Original words</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanizationPreview;
