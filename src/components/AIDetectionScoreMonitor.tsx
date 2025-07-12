
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Shield, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIDetectionScoreMonitorProps {
  originalText: string;
  humanizedText: string;
  aiScore: number;
  humanScore: number;
}

const AIDetectionScoreMonitor: React.FC<AIDetectionScoreMonitorProps> = ({
  originalText,
  humanizedText,
  aiScore,
  humanScore
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResults, setDetectionResults] = useState({
    originalAiScore: aiScore,
    humanizedAiScore: aiScore * 0.3, // Simulated improvement
    humanizedHumanScore: humanScore,
    improvement: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    if (originalText && humanizedText) {
      calculateDetectionScores();
    }
  }, [originalText, humanizedText, aiScore, humanScore]);

  const calculateDetectionScores = () => {
    // Simulate AI detection analysis
    const originalScore = aiScore;
    const humanizedScore = Math.max(5, aiScore * (Math.random() * 0.4 + 0.2)); // 20-60% of original
    const improvement = originalScore - humanizedScore;

    setDetectionResults({
      originalAiScore: originalScore,
      humanizedAiScore: humanizedScore,
      humanizedHumanScore: humanScore,
      improvement
    });
  };

  const reanalyzeText = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call to detection services
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate slightly different scores
      const newHumanizedScore = Math.max(5, detectionResults.originalAiScore * (Math.random() * 0.4 + 0.2));
      const newImprovement = detectionResults.originalAiScore - newHumanizedScore;

      setDetectionResults(prev => ({
        ...prev,
        humanizedAiScore: newHumanizedScore,
        improvement: newImprovement
      }));

      toast({
        title: "Analysis Complete",
        description: "AI detection scores have been updated",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to reanalyze text",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 20) return 'text-green-600';
    if (score <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score <= 20) return { text: 'Low Risk', color: 'bg-green-100 text-green-800' };
    if (score <= 50) return { text: 'Medium Risk', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'High Risk', color: 'bg-red-100 text-red-800' };
  };

  const getProgressColor = (score: number) => {
    if (score <= 20) return 'bg-green-500';
    if (score <= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            AI Detection Analysis
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={reanalyzeText}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reanalyze
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
              Original Text
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Detection Score</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold ${getScoreColor(detectionResults.originalAiScore)}`}>
                    {Math.round(detectionResults.originalAiScore)}%
                  </span>
                  <Badge className={getScoreBadge(detectionResults.originalAiScore).color}>
                    {getScoreBadge(detectionResults.originalAiScore).text}
                  </Badge>
                </div>
              </div>
              <Progress
                value={detectionResults.originalAiScore}
                className="h-2"
                style={{
                  '--progress-background': getProgressColor(detectionResults.originalAiScore)
                } as React.CSSProperties}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Humanized Text
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Detection Score</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold ${getScoreColor(detectionResults.humanizedAiScore)}`}>
                    {Math.round(detectionResults.humanizedAiScore)}%
                  </span>
                  <Badge className={getScoreBadge(detectionResults.humanizedAiScore).color}>
                    {getScoreBadge(detectionResults.humanizedAiScore).text}
                  </Badge>
                </div>
              </div>
              <Progress
                value={detectionResults.humanizedAiScore}
                className="h-2"
                style={{
                  '--progress-background': getProgressColor(detectionResults.humanizedAiScore)
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        {/* Improvement Summary */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800 dark:text-green-400">
                Detection Score Improved
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                -{Math.round(detectionResults.improvement)}%
              </div>
              <div className="text-sm text-green-600">
                Reduction in AI detection
              </div>
            </div>
          </div>
        </div>

        {/* Human Score */}
        <div className="space-y-3">
          <h4 className="font-semibold">Human-like Score</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm">Humanization Quality</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-blue-600">
                {Math.round(detectionResults.humanizedHumanScore)}%
              </span>
              <Badge className="bg-blue-100 text-blue-800">
                {detectionResults.humanizedHumanScore >= 80 ? 'Excellent' : 
                 detectionResults.humanizedHumanScore >= 60 ? 'Good' : 'Fair'}
              </Badge>
            </div>
          </div>
          <Progress
            value={detectionResults.humanizedHumanScore}
            className="h-2 bg-blue-200"
          />
        </div>

        {/* Detection Services */}
        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-medium">Simulated Detection Services:</p>
          <div className="grid grid-cols-2 gap-2">
            <span>• GPTZero: {Math.round(detectionResults.humanizedAiScore * 0.9)}%</span>
            <span>• Originality.ai: {Math.round(detectionResults.humanizedAiScore * 1.1)}%</span>
            <span>• Copyleaks: {Math.round(detectionResults.humanizedAiScore * 0.8)}%</span>
            <span>• Writer.com: {Math.round(detectionResults.humanizedAiScore * 1.2)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIDetectionScoreMonitor;
