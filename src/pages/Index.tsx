
import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Shield, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useUsage } from '@/hooks/useUsage';
import { useTheme } from '@/hooks/useTheme';
import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import PremiumModal from '@/components/PremiumModal';
import UsageLimiter from '@/components/UsageLimiter';
import { humanizeText } from '@/utils/textHumanizer';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  const { toast } = useToast();
  const { user, profile, loading: authLoading } = useAuth();
  const { canUseHumanizer, checkCharacterLimit, recordUsage, loading: usageLoading } = useUsage();
  const { isDark, toggleTheme } = useTheme();

  // Auto-close modals when user becomes authenticated
  useEffect(() => {
    if (user && profile) {
      setShowAuthModal(false);
    }
  }, [user, profile]);

  const handleHumanize = async () => {
    if (!user || !profile) {
      setShowAuthModal(true);
      toast({
        title: "Authentication Required",
        description: "Please log in to use the AI Text Humanizer.",
        variant: "destructive"
      });
      return;
    }

    if (!inputText.trim()) {
      toast({
        title: "No text provided",
        description: "Please enter some text to humanize.",
        variant: "destructive"
      });
      return;
    }

    if (!canUseHumanizer()) {
      setShowPremiumModal(true);
      toast({
        title: "Usage limit reached",
        description: "You've reached your monthly limit. Upgrade to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!checkCharacterLimit(inputText)) {
      toast({
        title: "Text too long",
        description: "Standard accounts are limited to 10,000 characters. Upgrade for unlimited usage.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      console.log('Starting humanization process...');
      const result = await humanizeText(inputText);
      setOutputText(result);
      
      // Record usage
      await recordUsage(inputText.length);
      
      toast({
        title: "Text humanized successfully!",
        description: "Your AI-generated text has been transformed to sound more natural.",
      });
    } catch (error) {
      console.error('Humanization error:', error);
      toast({
        title: "Humanization failed",
        description: "There was an error processing your text. Please try again.",
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
        title: "Copied to clipboard",
        description: "The humanized text has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text to clipboard.",
        variant: "destructive"
      });
    }
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Advanced AI Detection Bypass",
      description: "Our sophisticated algorithms transform AI-generated content to pass detection tools while maintaining quality and meaning."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Preserve Original Meaning",
      description: "Your content's core message remains intact while we enhance naturalness and human-like flow."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Trusted by Thousands",
      description: "Join thousands of users who trust our humanizer for their content needs across various industries."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Content Creator",
      content: "This tool has been a game-changer for my content creation workflow. The results are incredibly natural!",
      rating: 5
    },
    {
      name: "David L.",
      role: "Student",
      content: "Perfect for making my essays sound more natural while keeping the original ideas intact.",
      rating: 5
    },
    {
      name: "Jessica R.",
      role: "Marketing Manager",
      content: "Our team uses this daily for creating human-like marketing content. Highly recommended!",
      rating: 5
    }
  ];

  const isAuthenticated = user && profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors">
      <Navigation
        onLoginClick={() => setShowAuthModal(true)}
        onUpgradeClick={() => setShowPremiumModal(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full px-6 py-2 mb-8 border border-purple-200 dark:border-purple-800">
              <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-purple-700 dark:text-purple-300 font-medium">
                AI-Powered Text Humanization
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Make AI Text
              <br />
              <span className="relative">
                Human-Like
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              Transform AI-generated content into natural, human-sounding text that passes detection tools while preserving your original message and intent.
            </p>

            {/* Main Humanizer Tool */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
              {isAuthenticated && (
                <UsageLimiter
                  usageCount={profile?.monthly_usage_count || 0}
                  maxUsage={5}
                  onUpgrade={() => setShowPremiumModal(true)}
                />
              )}
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">AI-Generated Text</h3>
                  <Textarea
                    placeholder="Paste your AI-generated text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[200px] resize-none border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 focus:ring-purple-400 rounded-xl text-base"
                    disabled={isProcessing}
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Characters: {inputText.length}/10,000 {!isAuthenticated && '(Login required)'}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Humanized Text</h3>
                  <div className="relative">
                    <Textarea
                      placeholder="Your humanized text will appear here..."
                      value={outputText}
                      readOnly
                      className="min-h-[200px] resize-none bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-base"
                    />
                    {outputText && (
                      <Button
                        onClick={handleCopy}
                        size="sm"
                        className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white"
                      >
                        Copy
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button
                  onClick={handleHumanize}
                  disabled={isProcessing || authLoading || usageLoading || !inputText.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3" />
                      Humanize Text
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Why Choose Our Humanizer?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced AI technology ensures your content sounds natural while maintaining its original meaning and quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-600">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 transition-colors">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">What Our Users Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied users who trust our humanizer
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Humanize Your Content?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who create natural, human-like content every day
          </p>
          <Button
            onClick={() => !isAuthenticated ? setShowAuthModal(true) : document.querySelector('textarea')?.focus()}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-lg"
          >
            {isAuthenticated ? 'Start Humanizing' : 'Get Started Free'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <PremiumModal 
        isOpen={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
};

export default Index;
