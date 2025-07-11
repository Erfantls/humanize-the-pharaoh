
import React, { useState } from 'react';
import { Mail, Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EmailCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ isOpen, onClose, source = 'newsletter' }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('email_captures')
        .insert({
          email: email.trim(),
          source
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed!",
            description: "You're already on our newsletter list.",
            variant: "default"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been added to our newsletter. Check your email for updates!",
          variant: "default"
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Email capture error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-800 dark:text-white">Get Updates</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Stay in the Loop!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get notified about new features, tips, and exclusive offers.
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>New humanization modes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Tips & best practices</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Exclusive discounts</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl"
          >
            {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </Button>
        </form>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default EmailCapture;
