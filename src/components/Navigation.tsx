
import React from 'react';
import { User, Crown, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface NavigationProps {
  onLoginClick: () => void;
  onUpgradeClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLoginClick, onUpgradeClick }) => {
  const { user, profile, signOut, loading } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Text Humanizer
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
            ) : user && profile ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">
                      {profile.full_name || profile.email}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Crown className={`w-3 h-3 mr-1 ${
                        profile.user_type === 'premium' ? 'text-yellow-500' : 
                        profile.user_type === 'admin' ? 'text-purple-500' : 'text-gray-400'
                      }`} />
                      {profile.user_type === 'premium' ? 'Premium' : 
                       profile.user_type === 'admin' ? 'Admin' : 'Standard'}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Usage</div>
                    <div className="text-sm font-medium">
                      {profile.monthly_usage_count}/{profile.user_type === 'standard' ? '5' : '∞'}
                    </div>
                  </div>
                </div>

                {profile.user_type === 'standard' && (
                  <Button
                    onClick={onUpgradeClick}
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade
                  </Button>
                )}

                <Button
                  onClick={() => signOut()}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
