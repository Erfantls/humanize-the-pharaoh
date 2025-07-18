
import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Wand2, RefreshCw, Users, Upload, FileText, Mail, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useUsage } from '@/hooks/useUsage';
import { humanizeText } from '@/utils/textHumanizer';
import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import UsageLimiter from '@/components/UsageLimiter';
import UpgradePrompt from '@/components/UpgradePrompt';
import USDTPaymentModal from '@/components/USDTPaymentModal';
import HumanizationPreview from '@/components/HumanizationPreview';
import TextReplacementDisplay from '@/components/TextReplacementDisplay';
import OnboardingWalkthrough from '@/components/OnboardingWalkthrough';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import EmailCapture from '@/components/EmailCapture';
import HumanizationModes from '@/components/HumanizationModes';
import OutputQualityGrading from '@/components/OutputQualityGrading';
import BulkUploadTool from '@/components/BulkUploadTool';
import InAppNotifications from '@/components/InAppNotifications';
import ReferralSystem from '@/components/ReferralSystem';
import AdBanner from '@/components/AdBanner';
import ProgressAnimation from '@/components/ProgressAnimation';
import InAppPurchases from '@/components/InAppPurchases';
import GrammarToneEnhancer from '@/components/GrammarToneEnhancer';
import AIDetectionScoreMonitor from '@/components/AIDetectionScoreMonitor';
import AbuseReportingTool from '@/components/admin/AbuseReportingTool';
import LandingHero from '@/components/LandingHero';
import TestimonialsSection from '@/components/TestimonialsSection';
import FeatureShowcase from '@/components/FeatureShowcase';
import PricingSection from '@/components/PricingSection';
import TrustBadges from '@/components/TrustBadges';
import AnimatedStats from '@/components/AnimatedStats';
import FAQSection from '@/components/FAQSection';
import ComparisonSection from '@/components/ComparisonSection';
import SocialProofBanner from '@/components/SocialProofBanner';
import UrgencySection from '@/components/UrgencySection';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [showUSDTModal, setShowUSDTModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<'usage_limit' | 'character_limit' | 'feature_locked'>('usage_limit');
  const [replacements, setReplacements] = useState<Array<{ original: string; humanized: string; position: number }>>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [selectedMode, setSelectedMode] = useState('casual');
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showReferralSystem, setShowReferralSystem] = useState(false);
  const [showInAppPurchases, setShowInAppPurchases] = useState(false);
  const [showGrammarEnhancer, setShowGrammarEnhancer] = useState(false);
  const [showAbuseReporting, setShowAbuseReporting] = useState(false);
  
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const { canUseHumanizer, checkCharacterLimit, recordUsage, currentUsage, maxFreeUsage, userType } = useUsage();
  const { isDark, toggleTheme, themePreference, getThemeIcon } = useTheme();

  // Quality scores (simulated)
  const [humanScore, setHumanScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  useEffect(() => {
    // Show onboarding for new users
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding && !user) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleGetStarted = () => {
    console.log('Get Started clicked, user:', !!user);
    if (!user) {
      setShowAuthModal(true);
    } else {
      // Scroll to the main tool
      const toolSection = document.getElementById('humanizer-tool');
      if (toolSection) {
        toolSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleViewPricing = () => {
    const pricingSection = document.querySelector('[data-section="pricing"]');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReferFriends = () => {
    console.log('Refer Friends clicked');
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowReferralSystem(true);
    }
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Add text to humanize before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!canUseHumanizer()) {
      setUpgradeReason('usage_limit');
      setShowUpgradePrompt(true);
      return;
    }

    if (!checkCharacterLimit(inputText)) {
      setUpgradeReason('character_limit');
      setShowUpgradePrompt(true);
      return;
    }

    setIsProcessing(true);
    setReplacements([]);
    
    try {
      const result = await humanizeText(inputText, selectedMode);
      setOutputText(result.humanizedText);
      setReplacements(result.replacements || []);
      
      // Simulate quality scores
      setHumanScore(Math.floor(Math.random() * 30) + 70); // 70-100
      setAiScore(Math.floor(Math.random() * 40) + 10); // 10-50
      
      await recordUsage(inputText.length);
      
      toast({
        title: "Text humanized successfully!",
        description: `Processed ${inputText.length} characters with ${result.replacements?.length || 0} improvements.`,
        variant: "default"
      });

      // Show email capture for non-premium users occasionally
      if (userType === 'standard' && Math.random() < 0.3) {
        setTimeout(() => setShowEmailCapture(true), 2000);
      }
    } catch (error) {
      console.error('Humanization error:', error);
      toast({
        title: "Error",
        description: "Failed to humanize text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied to clipboard!",
        description: "Humanized text copied successfully.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive"
      });
    }
  };

  const handleUpgrade = () => {
    setShowUpgradePrompt(false);
    setShowUSDTModal(true);
  };

  const handleYearlyUpgrade = () => {
    // For yearly premium, we'll also redirect to USDT payment with yearly amount
    setShowUSDTModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navigation 
        onLoginClick={() => setShowAuthModal(true)}
        onUpgradeClick={() => setShowUSDTModal(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        themePreference={themePreference}
        getThemeIcon={getThemeIcon}
      />

      {/* Landing Hero Section */}
      <LandingHero onGetStarted={handleGetStarted} />

      {/* Social Proof Banner */}
      <SocialProofBanner />

      {/* Animated Stats */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real-time statistics from our growing community
            </p>
          </div>
          <AnimatedStats />
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      <AdBanner onUpgrade={() => setShowUSDTModal(true)} />

      {/* Main Humanizer Tool */}
      <div id="humanizer-tool" className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
              Transform Your Content Now
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Paste your AI-generated text below and watch it transform into natural, human-like content.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
              <Button
                onClick={() => setShowBulkUpload(true)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 text-xs sm:text-sm"
              >
                <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Bulk Upload</span>
              </Button>
              
              <Button
                onClick={handleReferFriends}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 text-xs sm:text-sm"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Refer Friends</span>
              </Button>
              
              <Button
                onClick={() => setShowEmailCapture(true)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 text-xs sm:text-sm"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Newsletter</span>
              </Button>

              {profile?.user_type === 'admin' && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 text-xs sm:text-sm">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Admin Panel</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {user && profile && (
            <div className="mb-6 sm:mb-8">
              <UsageLimiter
                usageCount={currentUsage}
                maxUsage={maxFreeUsage}
                onUpgrade={() => setShowUSDTModal(true)}
              />
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 animate-scale-in border border-gray-200 dark:border-gray-700">
            <div className="mb-6 sm:mb-8">
              <HumanizationModes
                selectedMode={selectedMode}
                onModeChange={setSelectedMode}
                userType={userType}
              />
            </div>

            {/* Main content area with equal-sized text areas */}
            <div className="space-y-6">
              {/* Text areas - side by side on desktop, stacked on mobile with equal heights */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Original Text */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Original Text
                    </label>
                    <Button
                      onClick={() => setShowGrammarEnhancer(true)}
                      variant="ghost"
                      size="sm"
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Grammar Check
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Paste your AI-generated text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="h-[450px] resize-none border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base rounded-lg bg-gray-50 dark:bg-gray-900"
                  />
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{inputText.length} characters</span>
                    {userType === 'standard' && (
                      <span>Limit: 10,000 characters</span>
                    )}
                  </div>
                </div>

                {/* Humanized Text */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Humanized Text
                    </label>
                    {outputText && (
                      <Button
                        onClick={() => setShowAbuseReporting(true)}
                        variant="ghost"
                        size="sm"
                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Report Issue
                      </Button>
                    )}
                  </div>
                  <Textarea
                    ref={outputRef}
                    placeholder="Your humanized text will appear here..."
                    value={outputText}
                    readOnly
                    className="h-[450px] resize-none bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-base rounded-lg"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {outputText.length} characters
                    </span>
                    <Button
                      onClick={handleCopy}
                      disabled={!outputText}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Humanize Button - Centered below text areas */}
              <div className="flex flex-col items-center space-y-6 py-8">
                <Button
                  onClick={handleHumanize}
                  disabled={isProcessing || !inputText.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xl min-w-[280px]"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-6 h-6 mr-3" />
                      Humanize Text
                    </>
                  )}
                </Button>

                {isProcessing && <ProgressAnimation />}
              </div>

              {/* Results and Analytics */}
              {outputText && (
                <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <HumanizationPreview
                    originalText={inputText}
                    humanizedText={outputText}
                  />
                  
                  <OutputQualityGrading
                    humanScore={humanScore}
                    aiScore={aiScore}
                  />

                  <AIDetectionScoreMonitor
                    originalText={inputText}
                    humanizedText={outputText}
                    aiScore={aiScore}
                    humanScore={humanScore}
                  />
                </div>
              )}

              <TextReplacementDisplay
                replacements={replacements}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <FeatureShowcase 
        onGetStarted={handleGetStarted}
        onViewPricing={handleViewPricing}
      />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Urgency Section */}
      <UrgencySection />

      {/* Pricing */}
      <PricingSection 
        onUpgrade={() => setShowUSDTModal(true)} 
        onGetStarted={handleGetStarted}
      />

      {/* FAQ Section */}
      <FAQSection />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        onUpgrade={handleUpgrade}
        reason={upgradeReason}
        currentUsage={currentUsage}
        maxUsage={maxFreeUsage}
      />

      <OnboardingWalkthrough
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
      />

      <ExitIntentPopup
        onUpgrade={handleYearlyUpgrade}
      />

      <EmailCapture
        isOpen={showEmailCapture}
        onClose={() => setShowEmailCapture(false)}
        source="homepage"
      />

      <BulkUploadTool
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
      />

      <ReferralSystem
        isOpen={showReferralSystem}
        onClose={() => setShowReferralSystem(false)}
      />

      <InAppPurchases
        isOpen={showInAppPurchases}
        onClose={() => setShowInAppPurchases(false)}
      />

      <GrammarToneEnhancer
        isOpen={showGrammarEnhancer}
        onClose={() => setShowGrammarEnhancer(false)}
        text={inputText}
        onTextUpdate={setInputText}
      />

      <AbuseReportingTool
        isOpen={showAbuseReporting}
        onClose={() => setShowAbuseReporting(false)}
        inputText={inputText}
        outputText={outputText}
      />
    
      <USDTPaymentModal
        isOpen={showUSDTModal}
        onClose={() => setShowUSDTModal(false)}
        amount={24.99}
      />
    </div>
  );
};

export default Index;
