
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PaymentProofReviewDashboard from '@/components/admin/PaymentProofReviewDashboard';
import UserAnalyticsDashboard from '@/components/admin/UserAnalyticsDashboard';
import AbuseReportingTool from '@/components/admin/AbuseReportingTool';
import { ArrowLeft, Users, CreditCard, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user || !profile || profile.user_type !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage users, reviews, and analytics
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to App</span>
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Payment Proofs</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Abuse Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <UserAnalyticsDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Proof Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentProofReviewDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Abuse Reports Management</CardTitle>
              </CardHeader>
              <CardContent>
                <AbuseReportingTool 
                  isOpen={true}
                  onClose={() => {}}
                  inputText=""
                  outputText=""
                  isAdminView={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
