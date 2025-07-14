
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Writer",
      avatar: "SJ",
      rating: 5,
      text: "This tool is a game-changer! My AI-generated content now passes all detection tests while maintaining perfect readability. Saved me hours of manual editing."
    },
    {
      name: "Mike Chen",
      role: "Marketing Manager",
      avatar: "MC",
      rating: 5,
      text: "Incredible results! The humanized text feels completely natural and authentic. Our content marketing campaigns have seen a 40% increase in engagement."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Academic Researcher",
      avatar: "ER",
      rating: 5,
      text: "As someone who works with AI tools daily, I'm impressed by how well this preserves the original meaning while making text sound genuinely human."
    },
    {
      name: "James Wilson",
      role: "Freelance Blogger",
      avatar: "JW",
      rating: 5,
      text: "The best investment I've made for my writing business. Client satisfaction has skyrocketed since I started using this humanizer."
    },
    {
      name: "Lisa Thompson",
      role: "SEO Specialist",
      avatar: "LT",
      rating: 5,
      text: "Perfect for creating content that ranks well and reads naturally. The AI detection bypass rate is simply outstanding."
    },
    {
      name: "David Park",
      role: "Startup Founder",
      avatar: "DP",
      rating: 5,
      text: "This tool helped us scale our content creation without compromising quality. Our blog traffic increased by 60% in just two months."
    }
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by Thousands of Users
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See what our users say about transforming their AI content into human-like text
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-purple-600 dark:text-purple-400 opacity-50" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-4">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white dark:border-gray-800">
                  {letter}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-900 dark:text-white">50,000+</span>
              <span className="text-gray-600 dark:text-gray-300 ml-1">happy users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
