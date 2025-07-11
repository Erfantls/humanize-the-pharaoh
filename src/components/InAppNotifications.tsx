
import React, { useState, useEffect } from 'react';
import { Bell, X, Crown, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface Notification {
  id: string;
  type: 'usage_limit' | 'upgrade_approved' | 'new_feature' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const InAppNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    // Generate notifications based on user state
    const generateNotifications = () => {
      const newNotifications: Notification[] = [];

      if (profile?.monthly_usage_count >= 5 && profile.user_type === 'standard') {
        newNotifications.push({
          id: 'usage_limit',
          type: 'usage_limit',
          title: 'Monthly Limit Reached',
          message: 'You\'ve used all 5 free humanizations this month. Upgrade for unlimited access!',
          timestamp: new Date(),
          read: false
        });
      }

      if (profile?.monthly_usage_count >= 4 && profile.user_type === 'standard') {
        newNotifications.push({
          id: 'near_limit',
          type: 'usage_limit',
          title: 'Almost at Limit',
          message: `You've used ${profile.monthly_usage_count} of 5 free humanizations.`,
          timestamp: new Date(),
          read: false
        });
      }

      // Sample new feature notification
      newNotifications.push({
        id: 'new_modes',
        type: 'new_feature',
        title: 'New Humanization Modes Released!',
        message: 'Try our new Creative and Academic modes for better results.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false
      });

      setNotifications(newNotifications);
    };

    if (profile) {
      generateNotifications();
    }
  }, [profile]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'usage_limit':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'upgrade_approved':
        return <Crown className="w-5 h-5 text-purple-500" />;
      case 'new_feature':
        return <Sparkles className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {notification.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InAppNotifications;
