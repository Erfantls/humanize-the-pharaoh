
import React, { useState } from 'react';
import { X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaymentProofModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentProofModal: React.FC<PaymentProofModalProps> = ({ isOpen, onClose }) => {
  const [transactionHash, setTransactionHash] = useState('');
  const [amount, setAmount] = useState('');
  const [proofImageUrl, setProofImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('payment_proofs')
        .insert({
          user_id: user.id,
          transaction_hash: transactionHash,
          amount: parseFloat(amount),
          proof_image_url: proofImageUrl,
          currency: 'USDT'
        });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Payment proof submitted!",
        description: "Your payment proof has been submitted for review. You'll be notified once it's approved.",
      });
    } catch (error) {
      console.error('Error submitting payment proof:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your payment proof. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (submitted) {
      setTransactionHash('');
      setAmount('');
      setProofImageUrl('');
      setSubmitted(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Submit Payment Proof</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Payment Proof Submitted!
            </h3>
            <p className="text-gray-600 mb-6">
              Your payment proof has been submitted for admin review. You'll receive an email notification once it's approved.
            </p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Payment Instructions:</p>
                  <p>Send $9.99 worth of USDT to our wallet and provide the transaction details below.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Hash
              </label>
              <Input
                type="text"
                placeholder="Enter transaction hash"
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="9.99"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proof Image URL (Optional)
              </label>
              <Input
                type="url"
                placeholder="https://example.com/screenshot.png"
                value={proofImageUrl}
                onChange={(e) => setProofImageUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload your screenshot to any image hosting service and paste the URL here
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {loading ? (
                <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Submit Payment Proof'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentProofModal;
