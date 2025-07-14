
import React from 'react';
import { Zap, Shield, Brain, Clock, Globe, Award } from 'lucide-react';

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bypass AI Detection',
      description: 'Advanced algorithms that make your content undetectable by AI detection tools with 99% success rate.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Brain,
      title: 'Preserve Meaning',
      description: 'Maintains the original context and meaning while transforming the writing style to sound human.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process thousands of words in seconds. No waiting around - get instant results every time.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Globe,
      title: 'Multiple Languages',
      description: 'Support for 25+ languages with native-level humanization quality for global content needs.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Always available when you need it. Process content anytime, anywhere with our reliable service.',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Industry-leading quality that produces natural, engaging content that readers love.',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our AI Humanizer?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to give you the best AI text humanization experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-600 hover:border-purple-200 dark:hover:border-purple-400"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your AI Content?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust our AI humanizer for their content needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
