
import React, { useState, useEffect } from 'react';
import { Star, Users, TrendingUp } from 'lucide-react';

const SocialProofBanner: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    { name: "Alex M.", text: "Just processed 5000 words - 100% undetected!", time: "2 min ago" },
    { name: "Sarah K.", text: "This saved my research paper. Amazing quality!", time: "5 min ago" },
    { name: "Mike D.", text: "Better than any other humanizer I've tried", time: "8 min ago" },
    { name: "Lisa T.", text: "Premium was worth every penny. Unlimited is game-changer!", time: "12 min ago" },
    { name: "John R.", text: "Customer support responded in 30 seconds!", time: "15 min ago" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-y border-green-200 dark:border-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Live activity */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="font-bold text-green-600 dark:text-green-400">847</span> people using now
              </span>
            </div>
            
            <div className="hidden sm:flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold text-blue-600 dark:text-blue-400">2.3M</span> words processed today
              </span>
            </div>
          </div>

          {/* Live reviews */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">4.9/5</span>
            </div>
            
            <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {reviews[currentReview].name.split(' ')[0][0]}
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  "{reviews[currentReview].text}"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {reviews[currentReview].name} • {reviews[currentReview].time}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Join them:</span>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors">
              Try Free Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBanner;
