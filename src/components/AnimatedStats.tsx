
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, CheckCircle, Zap } from 'lucide-react';

interface AnimatedStatsProps {
  className?: string;
}

const AnimatedStats: React.FC<AnimatedStatsProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    users: 0,
    processed: 0,
    success: 0,
    speed: 0
  });
  
  const statsRef = useRef<HTMLDivElement>(null);

  const finalValues = {
    users: 50000,
    processed: 10000000,
    success: 99,
    speed: 5
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const intervals = Object.keys(finalValues).map(key => {
      const finalValue = finalValues[key as keyof typeof finalValues];
      const increment = finalValue / steps;
      let currentValue = 0;

      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(intervals.find(interval => interval === this));
        }
        
        setCounts(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, stepTime);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const stats = [
    {
      icon: Users,
      value: formatNumber(counts.users) + '+',
      label: 'Happy Users',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      value: formatNumber(counts.processed) + '+',
      label: 'Words Processed',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: CheckCircle,
      value: counts.success + '%',
      label: 'Success Rate',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Zap,
      value: '<' + counts.speed + 's',
      label: 'Average Speed',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div ref={statsRef} className={`grid grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
            <stat.icon className="w-7 h-7 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedStats;
