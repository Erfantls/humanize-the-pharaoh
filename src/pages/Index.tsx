
import { useState } from 'react';
import { Copy, Wand2, FileText, CheckCircle, AlertTriangle, Sparkles, Zap, Shield } from 'lucide-react';
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

  console.log('Index render - user:', user?.email, 'profile:', profile, 'authLoading:', authLoading);

  const handleHumanize = async () => {
    console.log('Humanize button clicked');
    
    // Check authentication first
    if (!user) {
      console.log('User not authenticated');
      toast({
        title: "Authentication Required",
        description: "Please sign in to use the AI Text Humanizer.",
        variant: "destructive"
      });
      setShowAuthModal(true);
      return;
    }

    if (!profile) {
      console.log('Profile not loaded');
      toast({
        title: "Profile Loading",
        description: "Please wait while we load your profile.",
        variant: "destructive"
      });
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
      toast({
        title: "Usage limit reached",
        description: "You've reached your monthly limit. Upgrade to premium for unlimited usage.",
        variant: "destructive"
      });
      setShowPremiumModal(true);
      return;
    }

    console.log('Starting humanization process');
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
        console.log('Recording usage...');
        await recordUsage(inputText.length);
        
        toast({
          title: "Text humanized successfully!",
          description: "Your text has been transformed to sound more natural.",
        });
      }, 1500);
    } catch (error) {
      console.error('Humanization error:', error);
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
    console.log('Upgrade button clicked');
    setShowPremiumModal(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setShowUSDTModal(false);
    if (method === 'usdt') {
      setShowPaymentProofModal(true);
    }
  };

  const isUserAuthenticated = user && profile;

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
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white shadow-2xl">
              <Wand2 className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            AI Text Humanizer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform AI-generated content into natural, human-like text that flows naturally and engages readers. 
            Bypass AI detection with our advanced humanization technology.
          </p>
        </div>

        {/* Usage Limiter */}
        {isUserAuthenticated && profile.user_type === 'standard' && (
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
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 animate-fade-in shadow-lg">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-yellow-500 rounded-full mr-3">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">Authentication Required</h3>
              </div>
              <p className="text-yellow-700 dark:text-yellow-300 mb-4 text-lg">
                Please sign in or create an account to use the AI Text Humanizer and unlock powerful features.
              </p>
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Sign In / Sign Up
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {authLoading && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Loading your profile...</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 animate-scale-in transition-colors border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Original Text</h2>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {inputText.length}/{isUserAuthenticated && profile?.user_type === 'standard' ? maxCharacterLimit : '∞'} characters
                </span>
              </div>
              
              <Textarea
                placeholder={isUserAuthenticated 
                  ? "Paste your AI-generated text here to make it sound more human and natural..." 
                  : "Please sign in to use the AI Text Humanizer..."
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none border-gray-200 dark:border-gray-600 focus:border-purple-400 focus:ring-purple-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-lg p-6 rounded-2xl"
                disabled={!isUserAuthenticated || authLoading}
              />
              
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={handleHumanize}
                  disabled={isProcessing || !inputText.trim() || !isUserAuthenticated || authLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-3" />
                      {!isUserAuthenticated ? 'Sign In to Humanize' : 'Humanize Text'}
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="px-8 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-medium"
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
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 animate-scale-in transition-colors border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Humanized Text</h2>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {outputText.length} characters
                </span>
              </div>
              
              <div className={`min-h-[300px] p-6 border-2 rounded-2xl transition-all duration-300 ${
                outputText 
                  ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
              }`}>
                {outputText ? (
                  <div className="text-gray-800 dark:text-gray-200 leading-relaxed animate-fade-in text-lg">
                    {outputText}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-lg">
                    Your humanized text will appear here...
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className={`flex-1 font-semibold py-4 rounded-2xl transition-all duration-200 text-lg ${
                    copied 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                  } hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-3" />
                      Copy Text
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Ad */}
          {user && (
            <div className="mt-12 flex justify-center">
              <AdBanner position="sidebar" />
            </div>
          )}

          {/* Features Section */}
          <div className="mt-20 text-center animate-fade-in">
            <h3 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Why Choose Our Humanizer?</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Experience the most advanced AI text humanization technology available today
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-12 h-12 text-purple-600" />,
                  title: "Smart AI Detection Bypass",
                  description: "Advanced algorithms that make text undetectable by AI checkers and plagiarism detectors"
                },
                {
                  icon: <Sparkles className="w-12 h-12 text-blue-600" />,
                  title: "Natural Flow",
                  description: "Creates human-like sentence variations and natural transitions that feel authentic"
                },
                {
                  icon: <Zap className="w-12 h-12 text-green-600" />,
                  title: "Instant Results",
                  description: "Get humanized text in seconds, ready for immediate use in any context"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-center mb-6">{feature.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Ad Banner */}
        {user && (
          <div className="mt-20">
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
