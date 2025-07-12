
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  monthly_uses: number | null;
  character_limit: number | null;
  features: Record<string, any>;
  stripe_price_id: string | null;
  is_active: boolean;
}

interface SubscriptionPlansProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ isOpen, onClose }) => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen]);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription plans",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    // Here you would integrate with Stripe or your payment processor
    toast({
      title: "Coming Soon",
      description: "Payment integration will be available soon!",
      variant: "default"
    });
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'basic':
        return <Star className="w-6 h-6" />;
      case 'pro':
        return <Zap className="w-6 h-6" />;
      case 'business':
        return <Crown className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'basic':
        return 'border-gray-200';
      case 'pro':
        return 'border-purple-500 ring-2 ring-purple-200';
      case 'business':
        return 'border-yellow-500 ring-2 ring-yellow-200';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Choose Your Plan
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Upgrade to unlock unlimited humanization and premium features
          </p>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${getPlanColor(plan.name)} transition-all duration-200 hover:shadow-lg`}
              >
                {plan.name.toLowerCase() === 'pro' && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {getPlanIcon(plan.name)}
                  </div>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">
                        {plan.monthly_uses ? `${plan.monthly_uses} uses/month` : 'Unlimited uses'}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">
                        {plan.character_limit ? `${plan.character_limit.toLocaleString()} character limit` : 'Unlimited characters'}
                      </span>
                    </div>

                    {plan.features.batch_processing && (
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Batch processing</span>
                      </div>
                    )}

                    {plan.features.priority_queue && (
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Priority queue</span>
                      </div>
                    )}

                    {plan.features.api_access && (
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">API access</span>
                      </div>
                    )}

                    {plan.features.team_license && (
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Team license</span>
                      </div>
                    )}

                    {plan.features.white_label && (
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">White-label option</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">
                        {plan.features.support || 'Standard'} support
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6"
                    variant={plan.name.toLowerCase() === 'pro' ? 'default' : 'outline'}
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={selectedPlan === plan.id}
                  >
                    {plan.price === 0 ? 'Current Plan' : 'Upgrade Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPlans;
