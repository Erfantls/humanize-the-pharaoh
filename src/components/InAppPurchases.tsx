
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, FileText, Boost, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InAppPurchasesProps {
  isOpen: boolean;
  onClose: () => void;
}

const InAppPurchases: React.FC<InAppPurchasesProps> = ({ isOpen, onClose }) => {
  const [selectedPurchase, setSelectedPurchase] = useState<string | null>(null);
  const { toast } = useToast();

  const purchases = [
    {
      id: 'extra_uses_100',
      title: '100 Extra Uses',
      description: 'Get 100 additional text humanizations',
      price: 4.99,
      type: 'extra_uses',
      quantity: 100,
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      popular: false
    },
    {
      id: 'extra_uses_500',
      title: '500 Extra Uses',
      description: 'Get 500 additional text humanizations',
      price: 19.99,
      type: 'extra_uses',
      quantity: 500,
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      popular: true,
      savings: '20% off'
    },
    {
      id: 'template_pack_professional',
      title: 'Professional Templates',
      description: 'Email templates, cover letters, and business writing',
      price: 9.99,
      type: 'template_pack',
      quantity: 1,
      icon: <FileText className="w-8 h-8 text-green-500" />,
      popular: false
    },
    {
      id: 'template_pack_academic',
      title: 'Academic Templates',
      description: 'Research papers, essays, and academic writing',
      price: 12.99,
      type: 'template_pack',
      quantity: 1,
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      popular: false
    },
    {
      id: 'one_time_boost',
      title: 'Premium Boost (24h)',
      description: 'Unlimited uses and priority processing for 24 hours',
      price: 2.99,
      type: 'one_time_boost',
      quantity: 1,
      icon: <Boost className="w-8 h-8 text-orange-500" />,
      popular: false
    }
  ];

  const handlePurchase = async (purchaseId: string) => {
    setSelectedPurchase(purchaseId);
    
    // Here you would integrate with your payment processor
    toast({
      title: "Coming Soon",
      description: "In-app purchases will be available soon!",
      variant: "default"
    });
    
    setTimeout(() => {
      setSelectedPurchase(null);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <CreditCard className="w-6 h-6 mr-2" />
            In-App Purchases
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Boost your usage with one-time purchases
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {purchases.map((purchase) => (
            <Card
              key={purchase.id}
              className={`relative transition-all duration-200 hover:shadow-lg ${
                purchase.popular ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
              }`}
            >
              {purchase.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
              )}

              {purchase.savings && (
                <Badge className="absolute -top-2 right-4 bg-green-600">
                  {purchase.savings}
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  {purchase.icon}
                </div>
                <CardTitle className="text-lg font-bold">{purchase.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">{purchase.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-purple-600">
                    ${purchase.price}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  {purchase.type === 'extra_uses' && (
                    <div className="text-center">
                      <span className="font-medium">{purchase.quantity} uses</span>
                      <br />
                      <span>${(purchase.price / purchase.quantity).toFixed(3)} per use</span>
                    </div>
                  )}

                  {purchase.type === 'template_pack' && (
                    <div className="text-center">
                      <span className="font-medium">50+ templates included</span>
                      <br />
                      <span>Lifetime access</span>
                    </div>
                  )}

                  {purchase.type === 'one_time_boost' && (
                    <div className="text-center">
                      <span className="font-medium">24-hour access</span>
                      <br />
                      <span>Unlimited usage</span>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full"
                  variant={purchase.popular ? 'default' : 'outline'}
                  onClick={() => handlePurchase(purchase.id)}
                  disabled={selectedPurchase === purchase.id}
                >
                  {selectedPurchase === purchase.id ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Purchase for $${purchase.price}`
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            All purchases are processed securely. Your payment information is never stored on our servers.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InAppPurchases;
