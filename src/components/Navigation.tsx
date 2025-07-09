
import React from 'react';
import { User, Crown, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  onLoginClick: () => void;
  onUpgradeClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onLoginClick, 
  onUpgradeClick, 
  isDark, 
  onThemeToggle 
}) => {
  const { user, profile, signOut, loading } = useAuth();

  console.log('Navigation render - user:', user?.email, 'profile:', profile, 'loading:', loading);

  const handleSignOut = async () => {
    try {
      console.log('Navigation: Signing out...');
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      // Force refresh as fallback
      window.location.reload();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors backdrop-blur-lg bg-opacity-95 dark:bg-opacity-95 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AI Text Humanizer
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Show authenticated user state
  const isAuthenticated = user && profile;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors backdrop-blur-lg bg-opacity-95 dark:bg-opacity-95 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Text Humanizer
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Info - Hidden on small screens */}
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {profile.full_name || profile.email}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Crown className={`w-3 h-3 mr-1 ${
                        profile.user_type === 'premium' ? 'text-yellow-500' : 
                        profile.user_type === 'admin' ? 'text-purple-500' : 'text-gray-400'
                      }`} />
                      {profile.user_type === 'premium' ? 'Premium' : 
                       profile.user_type === 'admin' ? 'Admin' : 'Standard'}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Usage</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {profile.monthly_usage_count}/{profile.user_type === 'standard' ? '5' : '∞'}
                    </div>
                  </div>
                </div>

                {/* Upgrade Button - Show for standard users */}
                {profile.user_type === 'standard' && (
                  <Button
                    onClick={onUpgradeClick}
                    size="sm"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold"
                  >
                    <Crown className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Upgrade</span>
                  </Button>
                )}

                {/* Sign Out Button */}
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
