
import { useState } from 'react';
import { Copy, Wand2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { humanizeText } from '@/utils/textHumanizer';
import { useAuth } from '@/hooks/useAuth';
import { useUsage } from '@/hooks/useUsage';
import { useTheme } from '@/hooks/useTheme';
import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import PremiumModal from '@/components/PremiumModal';
import USDTPaymentModal from '@/components/USDTPaymentModal';
import PaymentProofModal from '@/components/PaymentProofModal';
import TextReplacementDisplay from '@/components/TextReplacementDisplay';
import AdBanner from '@/components/AdBanner';
import UsageLimiter from '@/components/UsageLimiter';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showUSDTModal, setShowUSDTModal] = useState(false);
  const [showPaymentProofModal, setShowPaymentProofModal] = useState(false);
  const [showTopAd, setShowTopAd] = useState(true);
  const [replacements, setReplacements] = useState<Array<{original: string; humanized: string; position: number}>>([]);
  
  const { user, profile, loading: authLoading } = useAuth();
  const { canUseHumanizer, checkCharacterLimit, recordUsage, maxCharacterLimit, currentUsage, maxFreeUsage } = useUsage();
  const { toast } = useToast();
  const { isDark, toggleTheme } = useTheme();

  const handleHumanize = async () => {
    // Require authentication first
    if (!user || !profile) {
      setShowAuthModal(true);
      return;
    }

    if (!inputText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Add the text you want to humanize first.",
        variant: "destructive"
      });
      return;
    }

    if (!checkCharacterLimit(inputText)) {
      toast({
        title: "Character limit exceeded",
        description: `Standard users are limited to ${maxCharacterLimit} characters per text.`,
        variant: "destructive"
      });
      return;
    }

    if (!canUseHumanizer()) {
      setShowPremiumModal(true);
      return;
    }

    setIsProcessing(true);
    setReplacements([]);
    
    try {
      // Simulate processing with replacement tracking
      setTimeout(async () => {
        const humanized = humanizeText(inputText);
        setOutputText(humanized);
        
        // Simulate some replacements for demo
        const mockReplacements = [
          { original: "it is important to note", humanized: "worth mentioning", position: 0 },
          { original: "furthermore", humanized: "oh, and another thing", position: 1 },
          { original: "utilize", humanized: "use", position: 2 },
          { original: "demonstrate", humanized: "show", position: 3 }
        ].filter(() => Math.random() > 0.5);
        
        setReplacements(mockReplacements);
        setIsProcessing(false);
        
        // Record usage
        await recordUsage(inputText.length);
        
        toast({
          title: "Text humanized successfully!",
          description: "Your text has been transformed to sound more natural.",
        });
      }, 1500);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Humanization failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied to clipboard!",
        description: "The humanized text is ready to use.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the text manually.",
        variant: "destructive"
      });
    }
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setCopied(false);
    setReplacements([]);
  };

  const handleUpgradeClick = () => {
    setShowPremiumModal(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setShowUSDTModal(false);
    if (method === 'usdt') {
      setShowPaymentProofModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Navigation */}
      <Navigation 
        onLoginClick={() => setShowAuthModal(true)}
        onUpgradeClick={handleUpgradeClick}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      {/* Top Ad Banner */}
      {showTopAd && user && (
        <AdBanner 
          position="top" 
          onClose={() => setShowTopAd(false)}
        />
      )}

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white shadow-lg">
              <Wand2 className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Text Humanizer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform AI-generated content into natural, human-like text that flows naturally and engages readers.
          </p>
        </div>

        {/* Usage Limiter */}
        {user && profile && profile.user_type === 'standard' && (
          <div className="max-w-6xl mx-auto mb-8">
            <UsageLimiter 
              usageCount={currentUsage}
              maxUsage={maxFreeUsage}
              onUpgrade={handleUpgradeClick}
            />
          </div>
        )}

        {/* Auth Required Message */}
        {!authLoading && !user && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Authentication Required</h3>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                Please sign in or create an account to use the AI Text Humanizer.
              </p>
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Sign In / Sign Up
              </Button>
            </div>
          </div>
        )}

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-scale-in transition-colors">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Original Text</h2>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                  {inputText.length}/{profile?.user_type === 'standard' ? maxCharacterLimit : '∞'} characters
                </span>
              </div>
              
              <Textarea
                placeholder="Paste your AI-generated text here to make it sound more human and natural..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none border-gray-200 dark:border-gray-600 focus:border-purple-400 focus:ring-purple-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                disabled={!user}
              />
              
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleHumanize}
                  disabled={isProcessing || !inputText.trim() || !user}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      {!user ? 'Sign In to Humanize' : 'Humanize Text'}
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="px-6 py-3 rounded-xl border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear
                </Button>
              </div>

              {/* Text Replacement Display */}
              <TextReplacementDisplay 
                replacements={replacements} 
                isProcessing={isProcessing}
              />
            </div>

            {/* Output Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-scale-in transition-colors">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Humanized Text</h2>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                  {outputText.length} characters
                </span>
              </div>
              
              <div className={`min-h-[300px] p-4 border rounded-xl transition-all duration-300 ${
                outputText 
                  ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
              }`}>
                {outputText ? (
                  <div className="text-gray-800 dark:text-gray-200 leading-relaxed animate-fade-in">
                    {outputText}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                    Your humanized text will appear here...
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className={`flex-1 font-medium py-3 rounded-xl transition-all duration-200 ${
                    copied 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                  } hover:scale-105 disabled:hover:scale-100`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Text
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Ad */}
          {user && (
            <div className="mt-8 flex justify-center">
              <AdBanner position="sidebar" />
            </div>
          )}

          {/* Features Section */}
          <div className="mt-16 text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">Why Choose Our Humanizer?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🧠",
                  title: "Smart AI Detection Bypass",
                  description: "Advanced algorithms that make text undetectable by AI checkers"
                },
                {
                  icon: "✨",
                  title: "Natural Flow",
                  description: "Creates human-like sentence variations and natural transitions"
                },
                {
                  icon: "🚀",
                  title: "Instant Results",
                  description: "Get humanized text in seconds, ready for immediate use"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Ad Banner */}
        {user && (
          <div className="mt-16">
            <AdBanner position="bottom" />
          </div>
        )}
      </div>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <PremiumModal 
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={() => {
          setShowPremiumModal(false);
          setShowUSDTModal(true);
        }}
      />

      <USDTPaymentModal 
        isOpen={showUSDTModal}
        onClose={() => setShowUSDTModal(false)}
        onPaymentMethodSelect={handlePaymentMethodSelect}
      />

      <PaymentProofModal 
        isOpen={showPaymentProofModal}
        onClose={() => setShowPaymentProofModal(false)}
      />
    </div>
  );
};

export default Index;
