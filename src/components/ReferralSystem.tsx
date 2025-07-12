
import React, { useState, useEffect } from 'react';
import { Users, Copy, Gift, CheckCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReferralSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Referral {
  id: string;
  referred_email: string;
  status: string;
  reward_granted: boolean;
  created_at: string;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ isOpen, onClose }) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const referralUrl = `https://pharaoh-humanize-ai.vercel.app?ref=${profile?.referral_code}`;

  useEffect(() => {
    if (isOpen && user) {
      fetchReferrals();
    }
  }, [isOpen, user]);

  const fetchReferrals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
    } catch (error) {
      console.error('Error fetching referrals:', error);
    }
  };

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: user.id,
          referred_email: email.trim()
        });

      if (error) throw error;

      toast({
        title: "Invitation sent!",
        description: `We've sent an invitation to ${email}`,
        variant: "default"
      });

      setEmail('');
      fetchReferrals();
    } catch (error) {
      console.error('Error sending referral:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralUrl);
    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard",
      variant: "default"
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Text Humanizer',
        text: 'Check out this amazing AI text humanizer!',
        url: referralUrl
      });
    } else {
      copyReferralLink();
    }
  };

  const completedReferrals = referrals.filter(r => r.status === 'completed').length;
  const bonusUses = completedReferrals * 2; // 2 bonus uses per referral

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Refer Friends
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            ×
          </button>
        </div>

        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-3 mb-3">
            <Gift className="w-6 h-6 text-purple-500" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Earn Bonus Uses!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get 2 free uses for each successful referral
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {completedReferrals}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Successful Referrals
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {bonusUses}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Bonus Uses Earned
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 dark:text-white mb-3">
            Share Your Referral Link
          </h4>
          <div className="flex space-x-2 mb-3">
            <Input
              value={referralUrl}
              readOnly
              className="flex-1 bg-gray-50 dark:bg-gray-700"
            />
            <Button onClick={copyReferralLink} variant="outline" size="sm">
              <Copy className="w-4 h-4" />
            </Button>
            <Button onClick={shareReferralLink} variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            When someone signs up using your link, you both get bonus uses!
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 dark:text-white mb-3">
            Send Direct Invitation
          </h4>
          <form onSubmit={sendInvite} className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loading ? 'Sending...' : 'Invite'}
            </Button>
          </form>
        </div>

        {referrals.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white mb-3">
              Your Referrals ({referrals.length})
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {referral.referred_email}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(referral.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {referral.status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      referral.status === 'completed'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {referral.status === 'completed' ? 'Joined' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralSystem;
