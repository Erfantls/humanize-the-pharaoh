import React, { useState } from 'react';
import { Menu, X, Crown, User, LogOut, Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface NavigationProps {
  onLoginClick: () => void;
  onUpgradeClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  themePreference?: 'light' | 'dark' | 'system';
  getThemeIcon?: () => string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onLoginClick, 
  onUpgradeClick, 
  isDark, 
  onThemeToggle,
  themePreference = 'system',
  getThemeIcon
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const getThemeIconComponent = () => {
    const iconType = getThemeIcon ? getThemeIcon() : 'monitor';
    switch (iconType) {
      case 'sun': return <Sun className="w-5 h-5" />;
      case 'moon': return <Moon className="w-5 h-5" />;
      case 'monitor': return <Monitor className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Text Humanizer
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              onClick={onThemeToggle}
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={`Current: ${themePreference} theme`}
            >
              {getThemeIconComponent()}
            </Button>

            {user && profile ? (
              <>
                {/* Usage indicator for authenticated users */}
                <div className="text-sm text-gray-600 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {profile.monthly_usage_count}/5 uses
                </div>

                {/* Upgrade button */}
                <Button
                  onClick={onUpgradeClick}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                >
                  <Crown className="w-4 h-4" />
                  <span>Upgrade</span>
                </Button>

                {/* User menu */}
                <div className="relative">
                  <Button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {profile.full_name || 'User'}
                    </span>
                  </Button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {profile.full_name || 'User'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {profile.email}
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                          {profile.user_type} account
                        </div>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              onClick={onThemeToggle}
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {getThemeIconComponent()}
            </Button>
            
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {user && profile ? (
                <>
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {profile.full_name || 'User'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {profile.email}
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">
                      {profile.user_type} • {profile.monthly_usage_count}/5 uses
                    </div>
                  </div>
                  
                  <Button
                    onClick={onUpgradeClick}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Upgrade to Premium</span>
                  </Button>
                  
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onLoginClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
