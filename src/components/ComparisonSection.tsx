
import React from 'react';
import { Check, X, Crown } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  const features = [
    {
      feature: 'AI Detection Bypass Rate',
      free: '85-90%',
      premium: '99%+',
      competitor: '70-80%'
    },
    {
      feature: 'Monthly Usage',
      free: '5 requests',
      premium: 'Unlimited',
      competitor: '10 requests'
    },
    {
      feature: 'Character Limit',
      free: '10K per request',
      premium: 'Unlimited',
      competitor: '5K per request'
    },
    {
      feature: 'Processing Speed',
      free: '< 10 seconds',
      premium: '< 5 seconds',
      competitor: '30+ seconds'
    },
    {
      feature: 'Humanization Modes',
      free: 'Basic',
      premium: 'All modes',
      competitor: 'Limited'
    },
    {
      feature: 'Language Support',
      free: '5 languages',
      premium: '25+ languages',
      competitor: '3 languages'
    },
    {
      feature: 'Bulk Processing',
      free: false,
      premium: true,
      competitor: false
    },
    {
      feature: 'API Access',
      free: false,
      premium: true,
      competitor: false
    },
    {
      feature: 'Priority Support',
      free: false,
      premium: true,
      competitor: false
    },
    {
      feature: 'Advanced Analytics',
      free: false,
      premium: true,
      competitor: false
    }
  ];

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-500 mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us Over Competitors?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how our AI humanizer compares to other solutions in the market
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                    Our Free Plan
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 relative">
                    <div className="flex items-center justify-center">
                      <Crown className="w-5 h-5 mr-2" />
                      Our Premium
                    </div>
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs px-2 py-1 rounded-bl-lg font-bold">
                      BEST
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                    Competitors
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-t border-gray-200 dark:border-gray-600 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                      {renderValue(item.free)}
                    </td>
                    <td className="px-6 py-4 text-center text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-900/20">
                      {renderValue(item.premium)}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      {renderValue(item.competitor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied users who've upgraded their content creation with our premium features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
