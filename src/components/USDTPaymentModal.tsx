
import React, { useState } from 'react';
import { X, Copy, QrCode, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface USDTPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
}

const USDTPaymentModal: React.FC<USDTPaymentModalProps> = ({ 
  isOpen, 
  onClose,
  amount = 24.99 
}) => {
  const [paymentStep, setPaymentStep] = useState<'method' | 'payment'>('method');
  const { toast } = useToast();
  
  // Replace these with your actual USDT details
  const USDT_ADDRESS = "TYourUSDTAddressHere123456789";
  const USDT_QR_CODE = "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png"; // Replace with your QR code image

  if (!isOpen) return null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Address copied to clipboard",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the address manually",
        variant: "destructive"
      });
    }
  };

  const handleMethodSelect = (method: string) => {
    if (method === 'usdt') {
      setPaymentStep('payment');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {paymentStep === 'method' ? 'Choose Payment Method' : 'USDT Payment'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {paymentStep === 'method' ? (
          <div className="space-y-4">
            <button
              onClick={() => handleMethodSelect('usdt')}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group"
            >
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-colors mr-4">
                  <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">USDT (Crypto)</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pay with USDT cryptocurrency</div>
                </div>
              </div>
            </button>

            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${amount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">One-time payment for Premium access</div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                Send ${amount} USDT to:
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-xl shadow-lg">
                <img 
                  src={USDT_QR_CODE} 
                  alt="USDT QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                USDT Address (TRC-20):
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm break-all">
                  {USDT_ADDRESS}
                </div>
                <button
                  onClick={() => copyToClipboard(USDT_ADDRESS)}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                <strong>Important:</strong>
                <ul className="mt-2 space-y-1 list-disc ml-4">
                  <li>Send exactly ${amount} USDT</li>
                  <li>Use TRC-20 network only</li>
                  <li>Payment confirmation takes 5-10 minutes</li>
                  <li>Contact support if payment is not confirmed within 1 hour</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setPaymentStep('method')}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                I've Sent Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default USDTPaymentModal;
