
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useUsage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const MAX_FREE_USAGE = 5;
  const MAX_CHARACTER_LIMIT = 10000;

  const canUseHumanizer = () => {
    if (!profile) return false;
    if (profile.user_type === 'premium' || profile.user_type === 'admin') return true;
    return profile.monthly_usage_count < MAX_FREE_USAGE;
  };

  const checkCharacterLimit = (text: string) => {
    if (!profile) return false;
    if (profile.user_type === 'premium' || profile.user_type === 'admin') return true;
    return text.length <= MAX_CHARACTER_LIMIT;
  };

  const recordUsage = async (charactersUsed: number) => {
    if (!user || !profile) return;

    setLoading(true);
    try {
      // Record usage log
      await supabase
        .from('usage_logs')
        .insert({
          user_id: user.id,
          characters_used: charactersUsed
        });

      // Update profile usage count
      await supabase
        .from('profiles')
        .update({
          monthly_usage_count: profile.monthly_usage_count + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      // Refresh profile to get updated usage
      await refreshProfile();
    } catch (error) {
      console.error('Error recording usage:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    canUseHumanizer,
    checkCharacterLimit,
    recordUsage,
    loading,
    maxFreeUsage: MAX_FREE_USAGE,
    maxCharacterLimit: MAX_CHARACTER_LIMIT,
    currentUsage: profile?.monthly_usage_count || 0,
    userType: profile?.user_type || 'standard'
  };
};
