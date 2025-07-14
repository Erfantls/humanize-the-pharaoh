
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How accurate is the AI detection bypass?",
      answer: "Our humanizer achieves a 99% success rate in bypassing AI detection tools including GPTZero, Turnitin, Originality.ai, and others. We continuously update our algorithms to stay ahead of detection methods."
    },
    {
      question: "Will the humanized text maintain its original meaning?",
      answer: "Absolutely! Our advanced AI preserves the core meaning, context, and intent of your original text while transforming the writing style to sound naturally human. The content quality remains high."
    },
    {
      question: "What languages are supported?",
      answer: "We support 25+ languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, and many more. Each language maintains native-level humanization quality."
    },
    {
      question: "How fast is the processing?",
      answer: "Most texts are processed in under 5 seconds, regardless of length. Our servers are optimized for speed without compromising quality, ensuring you get instant results."
    },
    {
      question: "Is there a character limit?",
      answer: "Free users can process up to 10,000 characters per request with 5 requests per month. Premium users enjoy unlimited characters and requests with priority processing."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, your privacy is our priority. All text is encrypted during processing and never stored on our servers. We're GDPR compliant and follow strict data protection protocols."
    },
    {
      question: "Can I use this for academic work?",
      answer: "While our tool helps create natural-sounding content, we encourage users to follow their institution's academic integrity policies and use our service responsibly."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept USDT (Tether) payments for secure, fast, and global transactions. This ensures your payment is processed quickly regardless of your location."
    }
  ];

  return (
    <div className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about our AI text humanizer
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-lg">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="inline-flex items-center justify-center border-2 border-purple-600 text-purple-600 dark:text-purple-400 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
