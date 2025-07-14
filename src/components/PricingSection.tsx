
import React from 'react';
import { Check, Crown, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingSectionProps {
  onUpgrade: () => void;
  onGetStarted?: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onUpgrade, onGetStarted }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our service',
      features: [
        '5 humanizations per month',
        '1,000 characters per request',
        'Basic humanization mode',
        'Email support'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      icon: Users
    },
    {
      name: 'Premium',
      price: '$24.99',
      period: 'lifetime',
      originalPrice: '$49.99',
      description: 'Best value for regular users',
      features: [
        'Unlimited humanizations',
        'Unlimited characters',
        'All humanization modes',
        'Priority processing',
        'Advanced AI detection bypass',
        'Priority support',
        'API access',
        'Bulk processing'
      ],
      buttonText: 'Upgrade to Premium',
      popular: true,
      icon: Crown
    }
  ];

  const handleFreeButtonClick = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Scroll to the main tool
      const toolSection = document.getElementById('humanizer-tool');
      if (toolSection) {
        toolSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900" data-section="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.popular ? 'bg-white/20' : 'bg-gradient-to-r from-purple-600 to-blue-600'
                }`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-white'}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}`}>
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`ml-2 ${plan.popular ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}`}>
                      /{plan.period}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center mt-2">
                      <span className="text-sm line-through text-purple-200 mr-2">{plan.originalPrice}</span>
                      <span className="text-sm bg-green-400 text-black px-2 py-1 rounded-full font-medium">
                        50% OFF
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                      plan.popular ? 'text-green-300' : 'text-green-500'
                    }`} />
                    <span className={plan.popular ? 'text-purple-100' : 'text-gray-700 dark:text-gray-300'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={index === 1 ? onUpgrade : handleFreeButtonClick}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All plans include secure USDT payment processing
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <span>✓ 30-day money back guarantee</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
