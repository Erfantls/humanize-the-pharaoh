
import React from 'react';
import { X, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface USDTPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const USDTPaymentModal: React.FC<USDTPaymentModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  // Placeholder values - you can update these later
  const usdtAddress = "TQn9Y2khEsLJW1ChVWFMSMeRDow5oREqjK";
  const qrCodeUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjZmZmIi8+PHRleHQgeD0iMTAwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCI+UVIgQ29kZTwvdGV4dD48L3N2Zz4=";

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(usdtAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Address copied!",
        description: "USDT address has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the address manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Pay with USDT</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-green-600 mb-2">$9.99</div>
          <p className="text-sm text-gray-600 mb-4">Send USDT to upgrade to Premium</p>
          
          {/* QR Code */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-4 inline-block">
            <img 
              src={qrCodeUrl} 
              alt="USDT Payment QR Code" 
              className="w-48 h-48 mx-auto"
            />
          </div>
        </div>

        {/* USDT Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            USDT Address (TRC20)
          </label>
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-3">
            <span className="flex-1 text-sm font-mono text-gray-800 break-all mr-2">
              {usdtAddress}
            </span>
            <button
              onClick={handleCopyAddress}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-blue-900 mb-2">Payment Instructions:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Send exactly $9.99 USDT (TRC20)</li>
            <li>• Use the QR code or copy the address</li>
            <li>• Your upgrade will be activated within 5 minutes</li>
            <li>• Contact support if you need help</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors"
          >
            I've Sent Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default USDTPaymentModal;
