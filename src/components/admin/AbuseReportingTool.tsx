
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';

interface AbuseReportingToolProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  outputText: string;
  isAdminView?: boolean;
}

interface AbuseReport {
  id: string;
  input_text: string;
  output_text: string;
  report_reason: string;
  report_details: string | null;
  status: string;
  created_at: string;
  admin_notes: string | null;
  user_id: string;
}

const AbuseReportingTool: React.FC<AbuseReportingToolProps> = ({
  isOpen,
  onClose,
  inputText,
  outputText,
  isAdminView = false
}) => {
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reports, setReports] = useState<AbuseReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<AbuseReport | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (isAdminView) {
      fetchReports();
    }
  }, [isAdminView, statusFilter]);

  const fetchReports = async () => {
    try {
      let query = supabase
        .from('abuse_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch abuse reports.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitReport = async () => {
    if (!reportReason || !user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('abuse_reports')
        .insert({
          user_id: user.id,
          input_text: inputText,
          output_text: outputText,
          report_reason: reportReason,
          report_details: reportDetails || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Report submitted",
        description: "Thank you for reporting this issue. We'll review it shortly.",
        variant: "default"
      });

      setReportReason('');
      setReportDetails('');
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateReportStatus = async (reportId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('abuse_reports')
        .update({
          status: newStatus,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
          admin_notes: adminNotes || null
        })
        .eq('id', reportId);

      if (error) throw error;

      toast({
        title: "Report updated",
        description: `Report status changed to ${newStatus}.`,
        variant: "default"
      });

      fetchReports();
      setSelectedReport(null);
      setAdminNotes('');
    } catch (error) {
      console.error('Error updating report:', error);
      toast({
        title: "Error",
        description: "Failed to update report status.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600">Pending</Badge>;
      case 'reviewed':
        return <Badge variant="outline" className="text-blue-600">Reviewed</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="text-green-600">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isAdminView) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Abuse Reports</h3>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{report.report_reason}</span>
                  </CardTitle>
                  {getStatusBadge(report.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {report.report_details || 'No additional details provided'}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Reported: {new Date(report.created_at).toLocaleDateString()}
                </p>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                  {report.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600"
                        onClick={() => handleUpdateReportStatus(report.id, 'resolved')}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleUpdateReportStatus(report.id, 'reviewed')}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedReport && (
          <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Abuse Report Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Reason:</label>
                  <p className="text-sm">{selectedReport.report_reason}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Details:</label>
                  <p className="text-sm">{selectedReport.report_details || 'None provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Input Text:</label>
                  <Textarea value={selectedReport.input_text} readOnly className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Output Text:</label>
                  <Textarea value={selectedReport.output_text} readOnly className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Admin Notes:</label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add admin notes..."
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleUpdateReportStatus(selectedReport.id, 'resolved')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Mark as Resolved
                  </Button>
                  <Button
                    onClick={() => handleUpdateReportStatus(selectedReport.id, 'reviewed')}
                    variant="outline"
                  >
                    Mark as Reviewed
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report an Issue</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Reason for Report</label>
            <Select value={reportReason} onValueChange={setReportReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                <SelectItem value="poor_quality">Poor Quality Output</SelectItem>
                <SelectItem value="offensive_language">Offensive Language</SelectItem>
                <SelectItem value="spam_like">Spam-like Content</SelectItem>
                <SelectItem value="technical_error">Technical Error</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Additional Details (Optional)</label>
            <Textarea
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              placeholder="Please provide any additional details about the issue..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReport}
              disabled={!reportReason || isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AbuseReportingTool;
