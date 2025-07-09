
import React from 'react';
import { X } from 'lucide-react';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
  onClose?: () => void;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, onClose }) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'w-full h-24 bg-gradient-to-r from-blue-100 to-purple-100 border-b';
      case 'bottom':
        return 'w-full h-20 bg-gradient-to-r from-green-100 to-blue-100 border-t';
      case 'sidebar':
        return 'w-64 h-48 bg-gradient-to-b from-purple-100 to-pink-100 border rounded-lg';
      default:
        return 'w-full h-20 bg-gray-100 border';
    }
  };

  return (
    <div className={`${getPositionClasses()} flex items-center justify-center relative animate-fade-in`}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-white/50 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      <div className="text-center p-4">
        <div className="text-sm font-medium text-gray-700 mb-2">
          {position === 'sidebar' ? 'Premium Features' : 'Advertisement'}
        </div>
        <div className="text-xs text-gray-600">
          {position === 'sidebar' ? (
            <>
              <div className="mb-2">✨ Unlimited text processing</div>
              <div className="mb-2">🚀 Advanced humanization</div>
              <div className="mb-2">📊 Detailed analytics</div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                Upgrade Now
              </button>
            </>
          ) : (
            'Your ad content here - 728x90 or 320x50'
          )}
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
