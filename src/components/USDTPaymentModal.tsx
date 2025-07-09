
import React from 'react';
import { X, Wallet, CreditCard } from 'lucide-react';

interface USDTPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentMethodSelect: (method: string) => void;
}

const USDTPaymentModal: React.FC<USDTPaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentMethodSelect 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Choose Payment Method</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onPaymentMethodSelect('usdt')}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors mr-4">
                <Wallet className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">USDT (Crypto)</div>
                <div className="text-sm text-gray-600">Pay with USDT cryptocurrency</div>
              </div>
            </div>
          </button>

          <button
            disabled
            className="w-full p-4 border-2 border-gray-200 rounded-xl opacity-50 cursor-not-allowed"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-full mr-4">
                <CreditCard className="w-6 h-6 text-gray-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">Credit Card</div>
                <div className="text-sm text-gray-600">Coming soon...</div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Secure payment processing • Instant activation after verification
        </div>
      </div>
    </div>
  );
};

export default USDTPaymentModal;
