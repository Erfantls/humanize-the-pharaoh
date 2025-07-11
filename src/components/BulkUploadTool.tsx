
import React, { useState, useCallback } from 'react';
import { Upload, File, Download, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface BulkUploadToolProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileJob {
  id: string;
  name: string;
  content: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: string;
  error?: string;
}

const BulkUploadTool: React.FC<BulkUploadToolProps> = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState<FileJob[]>([]);
  const [processing, setProcessing] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  const isPremium = profile?.user_type === 'premium' || profile?.user_type === 'admin';

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach((file) => {
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const newFile: FileJob = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            content,
            status: 'pending'
          };
          setFiles(prev => [...prev, newFile]);
        };
        reader.readAsText(file);
      } else {
        toast({
          title: "Unsupported file type",
          description: `${file.name} is not a supported text file.`,
          variant: "destructive"
        });
      }
    });
  }, [toast]);

  const processAllFiles = async () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Bulk upload is available for premium users only.",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    
    for (const file of files) {
      if (file.status === 'pending') {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'processing' } : f
        ));

        try {
          // Simulate humanization process
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const humanizedText = `[Humanized] ${file.content}`;
          
          setFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'completed', result: humanizedText }
              : f
          ));
        } catch (error) {
          setFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'error', error: 'Failed to humanize' }
              : f
          ));
        }
      }
    }
    
    setProcessing(false);
    toast({
      title: "Bulk processing complete!",
      description: "All files have been processed.",
      variant: "default"
    });
  };

  const downloadResults = () => {
    const completedFiles = files.filter(f => f.status === 'completed');
    
    completedFiles.forEach(file => {
      const blob = new Blob([file.result || ''], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `humanized_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const clearFiles = () => {
    setFiles([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full mx-4 animate-scale-in shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Upload className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Bulk Text Humanizer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {!isPremium && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-700 dark:text-yellow-300 font-medium">
                Premium Feature Required
              </span>
            </div>
            <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-1">
              Bulk upload is available for premium users only. Upgrade to process multiple files at once.
            </p>
          </div>
        )}

        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> text files
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                TXT files only (MAX 10MB each)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              multiple
              accept=".txt,text/plain"
              onChange={handleFileUpload}
              disabled={!isPremium}
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto mb-6">
          {files.length > 0 ? (
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {file.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {file.content.length} characters
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {file.status === 'processing' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      file.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                      file.status === 'processing' ? 'text-purple-600 dark:text-purple-400' :
                      file.status === 'error' ? 'text-red-600 dark:text-red-400' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      {file.status === 'pending' && 'Ready'}
                      {file.status === 'processing' && 'Processing...'}
                      {file.status === 'completed' && 'Complete'}
                      {file.status === 'error' && 'Failed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No files uploaded yet. Upload text files to get started.
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          {files.length > 0 && (
            <Button onClick={clearFiles} variant="outline" className="flex-1">
              Clear All
            </Button>
          )}
          
          {files.some(f => f.status === 'completed') && (
            <Button
              onClick={downloadResults}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Results</span>
            </Button>
          )}
          
          {files.some(f => f.status === 'pending') && (
            <Button
              onClick={processAllFiles}
              disabled={processing || !isPremium}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {processing ? 'Processing...' : 'Humanize All'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUploadTool;
