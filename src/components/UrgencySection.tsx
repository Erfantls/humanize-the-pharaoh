
import React, { useState, useEffect } from 'react';
import { Clock, Fire, Users, ArrowRight } from 'lucide-react';

const UrgencySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const [signupsToday, setSignupsToday] = useState(1247);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 24 hours when it reaches 0
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    // Simulate signup counter
    const signupTimer = setInterval(() => {
      setSignupsToday(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(signupTimer);
    };
  }, []);

  return (
    <div className="py-16 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-red-500 to-orange-500">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
            <div className="flex items-center justify-center space-x-2 text-white">
              <Fire className="w-6 h-6 animate-pulse" />
              <span className="font-bold text-lg">LIMITED TIME OFFER</span>
              <Fire className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                🔥 50% OFF Premium - Ending Soon!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Get lifetime premium access for just <span className="line-through text-gray-500">$49.99</span>{' '}
                <span className="text-3xl font-bold text-red-600 dark:text-red-400">$24.99</span>
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-900 dark:bg-gray-700 rounded-2xl p-6">
                <div className="flex items-center space-x-4 text-white">
                  <div className="text-center">
                    <div className="bg-red-600 rounded-lg px-3 py-2 text-2xl font-bold min-w-[60px]">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs mt-1 text-gray-300">HOURS</div>
                  </div>
                  <div className="text-2xl font-bold">:</div>
                  <div className="text-center">
                    <div className="bg-red-600 rounded-lg px-3 py-2 text-2xl font-bold min-w-[60px]">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs mt-1 text-gray-300">MINUTES</div>
                  </div>
                  <div className="text-2xl font-bold">:</div>
                  <div className="text-center">
                    <div className="bg-red-600 rounded-lg px-3 py-2 text-2xl font-bold min-w-[60px]">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs mt-1 text-gray-300">SECONDS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center border border-green-200 dark:border-green-800">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {signupsToday.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Signed up today</div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-800">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">47</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Left at this price</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-800">
                <Fire className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Customer satisfaction</div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold text-xl px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-4 inline-flex items-center">
                Claim 50% Discount Now
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ⚡ Instant access • 💳 Secure USDT payment • 🔒 30-day money-back guarantee
              </p>
              
              <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                ⚠️ Price returns to $49.99 after this offer expires
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencySection;
