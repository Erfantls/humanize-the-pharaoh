
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Activity, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalUsers: number;
  activeUsersToday: number;
  totalUsageToday: number;
  averageSessionDuration: number;
  dailyData: Array<{
    date: string;
    users: number;
    usage: number;
  }>;
  userTypeDistribution: Array<{
    type: string;
    count: number;
  }>;
}

const UserAnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch user analytics data
      const { data: userAnalytics, error: analyticsError } = await supabase
        .from('user_analytics')
        .select('*')
        .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

      if (analyticsError) throw analyticsError;

      // Fetch profile data for user type distribution
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_type');

      if (profilesError) throw profilesError;

      // Process the data
      const today = new Date().toISOString().split('T')[0];
      const todayData = userAnalytics?.filter(record => record.date === today) || [];
      
      const totalUsageToday = todayData.reduce((sum, record) => sum + (record.daily_uses || 0), 0);
      const activeUsersToday = todayData.length;
      const totalUsers = profiles?.length || 0;
      
      const averageSessionDuration = todayData.length > 0 
        ? todayData.reduce((sum, record) => sum + (record.session_duration || 0), 0) / todayData.length
        : 0;

      // Group data by date for charts
      const dailyDataMap = new Map();
      userAnalytics?.forEach(record => {
        const date = record.date;
        if (!dailyDataMap.has(date)) {
          dailyDataMap.set(date, { date, users: 0, usage: 0 });
        }
        const dayData = dailyDataMap.get(date);
        dayData.users += 1;
        dayData.usage += record.daily_uses || 0;
      });

      const dailyData = Array.from(dailyDataMap.values()).sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // User type distribution
      const userTypeMap = new Map();
      profiles?.forEach(profile => {
        const type = profile.user_type || 'standard';
        userTypeMap.set(type, (userTypeMap.get(type) || 0) + 1);
      });

      const userTypeDistribution = Array.from(userTypeMap.entries()).map(([type, count]) => ({
        type: type.charAt(0).toUpperCase() + type.slice(1),
        count
      }));

      setAnalytics({
        totalUsers,
        activeUsersToday,
        totalUsageToday,
        averageSessionDuration: Math.round(averageSessionDuration / 60), // Convert to minutes
        dailyData,
        userTypeDistribution
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Failed to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Analytics Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Active Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeUsersToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Usage Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsageToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Avg Session (min)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageSessionDuration}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.userTypeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAnalyticsDashboard;
