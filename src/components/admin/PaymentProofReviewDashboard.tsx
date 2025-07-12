
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentProof {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  proof_image_url: string | null;
  transaction_hash: string | null;
  submitted_at: string;
  admin_notes: string | null;
}

const PaymentProofReviewDashboard = () => {
  const [proofs, setProofs] = useState<PaymentProof[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentProofs();
  }, [selectedStatus]);

  const fetchPaymentProofs = async () => {
    try {
      let query = supabase
        .from('payment_proofs')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (selectedStatus !== 'all') {
        query = query.eq('status', selectedStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      setProofs(data || []);
    } catch (error) {
      console.error('Error fetching payment proofs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch payment proofs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProofStatus = async (proofId: string, status: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('payment_proofs')
        .update({
          status,
          admin_notes: notes,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', proofId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Payment proof ${status}`,
        variant: "default"
      });

      fetchPaymentProofs();
    } catch (error) {
      console.error('Error updating proof status:', error);
      toast({
        title: "Error",
        description: "Failed to update payment proof",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payment Proof Reviews</h2>
        <div className="flex space-x-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {proofs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No payment proofs found</p>
            </CardContent>
          </Card>
        ) : (
          proofs.map((proof) => (
            <Card key={proof.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Payment Proof #{proof.id.slice(0, 8)}
                  </CardTitle>
                  {getStatusBadge(proof.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Amount</p>
                    <p className="text-lg">{proof.amount} {proof.currency}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p>{new Date(proof.submitted_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {proof.transaction_hash && (
                  <div>
                    <p className="text-sm font-medium">Transaction Hash</p>
                    <p className="text-xs font-mono bg-gray-100 p-2 rounded">
                      {proof.transaction_hash}
                    </p>
                  </div>
                )}

                {proof.admin_notes && (
                  <div>
                    <p className="text-sm font-medium">Admin Notes</p>
                    <p className="text-sm text-gray-600">{proof.admin_notes}</p>
                  </div>
                )}

                {proof.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => updateProofStatus(proof.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateProofStatus(proof.id, 'rejected')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentProofReviewDashboard;
