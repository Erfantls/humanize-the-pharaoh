
import React from 'react';
import { Shield, Award, Users, Zap, Star, Lock } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your content is encrypted and never stored'
    },
    {
      icon: Award,
      title: 'Industry Leading',
      description: '99% AI detection bypass success rate'
    },
    {
      icon: Users,
      title: '50K+ Users',
      description: 'Trusted by professionals worldwide'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process content in under 5 seconds'
    },
    {
      icon: Star,
      title: '4.9/5 Rating',
      description: 'Based on 10,000+ reviews'
    },
    {
      icon: Lock,
      title: 'GDPR Compliant',
      description: 'Full data protection compliance'
    }
  ];

  return (
    <div className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <badge.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
