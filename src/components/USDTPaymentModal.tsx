
import React, { useState } from 'react';
import { X, Copy, Wallet, Bitcoin, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface USDTPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
}

type PaymentMethod = {
  id: string;
  name: string;
  network: string;
  icon: React.ReactNode;
  address: string;
  qrCode: string;
  color: string;
};

const USDTPaymentModal: React.FC<USDTPaymentModalProps> = ({ 
  isOpen, 
  onClose,
  amount = 24.99 
}) => {
  const [paymentStep, setPaymentStep] = useState<'method' | 'payment'>('method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const { toast } = useToast();
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'usdt-trc20',
      name: 'USDT TRC-20',
      network: 'Tron Network',
      icon: <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />,
      address: "TJiqMPdFeRE6X2TiwYXvkzvxtVPYn4aoTh",
      qrCode: "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png",
      color: "green"
    },
    {
      id: 'usdt-erc20',
      name: 'USDT ERC-20',
      network: 'Ethereum Network',
      icon: <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      address: "0x742d35Cc6543C5432FbA3b2222c4fB35C5c5E9C1",
      qrCode: "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png",
      color: "blue"
    },
    {
      id: 'usdt-bep20',
      name: 'USDT BEP-20',
      network: 'BSC Network',
      icon: <Wallet className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
      address: "0x8B4A2C8C5A3D2E1F4B6C8D9E0F1A2B3C4D5E6F7G8H",
      qrCode: "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png",
      color: "yellow"
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin (BTC)',
      network: 'Bitcoin Network',
      icon: <Bitcoin className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      qrCode: "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png",
      color: "orange"
    },
    {
      id: 'bnb',
      name: 'BNB',
      network: 'BSC Network',
      icon: <Banknote className="w-6 h-6 text-yellow-500 dark:text-yellow-300" />,
      address: "bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64k",
      qrCode: "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png",
      color: "yellow"
    },
    {
      id: 'ethereum',
      name: 'Ethereum (ETH)',
      network: 'Ethereum Network',
      icon: <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      address: "0x742d35Cc6543C5432FbA3b2222c4fB35C5c5E9C1",
      qrCode: "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png",
      color: "purple"
    },
    {
      id: 'ltc',
      name: 'Litecoin (LTC)',
      network: 'Litecoin Network',
      icon: <Bitcoin className="w-6 h-6 text-gray-600 dark:text-gray-400" />,
      address: "ltc1qsgx5n7s9lw0cf5vxjuq4v5v4tqvjdcxhq8v7qc",
      qrCode: "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png",
      color: "gray"
    },
    {
      id: 'binance-pay',
      name: 'Binance Pay',
      network: 'Binance',
      icon: <Banknote className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
      address: "binancepay@youraddress.com",
      qrCode: "/lovable-uploads/12bd4e5a-3a58-4739-a212-44347f5bd813.png",
      color: "yellow"
    }
  ];

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

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentStep('payment');
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: "border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-500",
      blue: "border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500",
      yellow: "border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-500",
      orange: "border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-500",
      purple: "border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-500",
      gray: "border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 hover:border-gray-500"
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-4xl w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {paymentStep === 'method' ? 'Choose Payment Method' : `${selectedMethod?.name} Payment`}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {paymentStep === 'method' ? (
          <div className="space-y-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${amount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">One-time payment for Premium access</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method)}
                  className={`p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200 group ${getColorClasses(method.color)}`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-3 bg-${method.color}-100 dark:bg-${method.color}-900/30 rounded-full group-hover:bg-${method.color}-200 dark:group-hover:bg-${method.color}-800/30 transition-colors`}>
                      {method.icon}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{method.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{method.network}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : selectedMethod ? (
          <div className="space-y-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                Send ${amount} equivalent in {selectedMethod.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedMethod.network}
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-xl shadow-lg">
                <img 
                  src={selectedMethod.qrCode} 
                  alt={`${selectedMethod.name} QR Code`} 
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedMethod.name} Address:
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm break-all">
                  {selectedMethod.address}
                </div>
                <button
                  onClick={() => copyToClipboard(selectedMethod.address)}
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
                  <li>Send exactly ${amount} equivalent in {selectedMethod.name}</li>
                  <li>Use {selectedMethod.network} only</li>
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
        ) : null}
      </div>
    </div>
  );
};

export default USDTPaymentModal;
