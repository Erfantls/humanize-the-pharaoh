
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Lightbulb, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GrammarSuggestion {
  id: string;
  type: 'grammar' | 'tone' | 'clarity' | 'fluency';
  original: string;
  suggestion: string;
  start: number;
  end: number;
  confidence: number;
  applied: boolean;
}

interface GrammarToneEnhancerProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onTextUpdate: (text: string) => void;
}

const GrammarToneEnhancer: React.FC<GrammarToneEnhancerProps> = ({
  isOpen,
  onClose,
  text,
  onTextUpdate
}) => {
  const [suggestions, setSuggestions] = useState<GrammarSuggestion[]>([]);
  const [enhancedText, setEnhancedText] = useState(text);
  const [loading, setLoading] = useState(false);
  const [selectedTone, setSelectedTone] = useState<string>('professional');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && text) {
      setEnhancedText(text);
      generateSuggestions();
    }
  }, [isOpen, text]);

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-appropriate' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'academic', label: 'Academic', description: 'Scholarly and precise' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
    { value: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing' }
  ];

  const generateSuggestions = async () => {
    setLoading(true);
    try {
      // Simulate AI-powered grammar and tone analysis
      const mockSuggestions: GrammarSuggestion[] = [
        {
          id: '1',
          type: 'grammar',
          original: 'it\'s',
          suggestion: 'it is',
          start: text.indexOf('it\'s'),
          end: text.indexOf('it\'s') + 4,
          confidence: 0.9,
          applied: false
        },
        {
          id: '2',
          type: 'tone',
          original: 'really good',
          suggestion: 'excellent',
          start: text.indexOf('really good'),
          end: text.indexOf('really good') + 11,
          confidence: 0.85,
          applied: false
        },
        {
          id: '3',
          type: 'clarity',
          original: 'in order to',
          suggestion: 'to',
          start: text.indexOf('in order to'),
          end: text.indexOf('in order to') + 11,
          confidence: 0.8,
          applied: false
        }
      ].filter(s => s.start !== -1);

      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to analyze text",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (!suggestion) return;

    const newText = enhancedText.substring(0, suggestion.start) +
      suggestion.suggestion +
      enhancedText.substring(suggestion.end);

    setEnhancedText(newText);
    setSuggestions(prev =>
      prev.map(s =>
        s.id === suggestionId ? { ...s, applied: true } : s
      )
    );

    toast({
      title: "Suggestion Applied",
      description: `Replaced "${suggestion.original}" with "${suggestion.suggestion}"`,
      variant: "default"
    });
  };

  const applyAllSuggestions = () => {
    let newText = enhancedText;
    const sortedSuggestions = [...suggestions]
      .filter(s => !s.applied)
      .sort((a, b) => b.start - a.start); // Apply from end to start to maintain positions

    sortedSuggestions.forEach(suggestion => {
      newText = newText.substring(0, suggestion.start) +
        suggestion.suggestion +
        newText.substring(suggestion.end);
    });

    setEnhancedText(newText);
    setSuggestions(prev => prev.map(s => ({ ...s, applied: true })));

    toast({
      title: "All Suggestions Applied",
      description: `Applied ${sortedSuggestions.length} improvements`,
      variant: "default"
    });
  };

  const handleApplyChanges = () => {
    onTextUpdate(enhancedText);
    toast({
      title: "Text Updated",
      description: "Your enhanced text has been applied",
      variant: "default"
    });
    onClose();
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'grammar':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'tone':
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'clarity':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'fluency':
        return <Wand2 className="w-4 h-4 text-purple-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'grammar':
        return 'bg-green-100 text-green-800';
      case 'tone':
        return 'bg-blue-100 text-blue-800';
      case 'clarity':
        return 'bg-orange-100 text-orange-800';
      case 'fluency':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Wand2 className="w-6 h-6 mr-2" />
            Grammar & Tone Enhancer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Target Tone</label>
            <div className="flex flex-wrap gap-2">
              {toneOptions.map((tone) => (
                <Button
                  key={tone.value}
                  variant={selectedTone === tone.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTone(tone.value)}
                >
                  {tone.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Text Editor */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Original Text</label>
              <Textarea
                value={text}
                readOnly
                className="min-h-[200px] bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Enhanced Text</label>
              <Textarea
                value={enhancedText}
                onChange={(e) => setEnhancedText(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Suggestions ({suggestions.filter(s => !s.applied).length})
              </h3>
              {suggestions.some(s => !s.applied) && (
                <Button
                  onClick={applyAllSuggestions}
                  variant="outline"
                  size="sm"
                >
                  Apply All
                </Button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className={suggestion.applied ? 'opacity-50' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getSuggestionIcon(suggestion.type)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getSuggestionColor(suggestion.type)}>
                                {suggestion.type}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {Math.round(suggestion.confidence * 100)}% confidence
                              </span>
                            </div>
                            <p className="text-sm mt-1">
                              <span className="line-through text-red-600">"{suggestion.original}"</span>
                              {' → '}
                              <span className="text-green-600">"{suggestion.suggestion}"</span>
                            </p>
                          </div>
                        </div>
                        {!suggestion.applied && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => applySuggestion(suggestion.id)}
                          >
                            Apply
                          </Button>
                        )}
                        {suggestion.applied && (
                          <Badge variant="secondary">Applied</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600">No suggestions found. Your text looks great!</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApplyChanges}>
              Apply Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GrammarToneEnhancer;
