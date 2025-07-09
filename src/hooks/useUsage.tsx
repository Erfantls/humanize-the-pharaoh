
import { useState } from 'react';
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
    if (!user || !profile) {
      console.error('No user or profile available for usage recording');
      return;
    }

    setLoading(true);
    try {
      console.log('Recording usage for user:', user.id, 'characters:', charactersUsed);
      
      // Record usage log
      const { error: logError } = await supabase
        .from('usage_logs')
        .insert({
          user_id: user.id,
          characters_used: charactersUsed
        });

      if (logError) {
        console.error('Error recording usage log:', logError);
      } else {
        console.log('Usage log recorded successfully');
      }

      // Update profile usage count
      const newUsageCount = profile.monthly_usage_count + 1;
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          monthly_usage_count: newUsageCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile usage:', updateError);
      } else {
        console.log('Profile usage updated successfully');
      }

      // Refresh profile to get updated usage
      await refreshProfile();
    } catch (error) {
      console.error('Error in recordUsage:', error);
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
