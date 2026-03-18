import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Package, ShoppingCart, Truck, Award, Layers, Info, Settings } from 'lucide-react';
import { faqData } from '../faqData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

// Icon mapping
const iconMap = {
  package: Package,
  'shopping-cart': ShoppingCart,
  truck: Truck,
  award: Award,
  layers: Layers,
  info: Info,
  settings: Settings
};

export const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [activeCategory, setActiveCategory] = useState('all');

  // Generate Schema.org FAQPage structured data for SEO
  const generateSchemaMarkup = () => {
    const mainEntity = faqData.flatMap(category =>
      category.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    );

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": mainEntity
    };
  };

  // Insert Schema markup into page head
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(generateSchemaMarkup());
    document.head.appendChild(script);

    // Update page metadata
    document.title = 'FAQ - Textile Manufacturing Questions Answered | Rajkumar Rameshkumar';
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Find answers to frequently asked questions about PV, PC, R/C fabrics, ordering, pricing, shipping, quality standards, and more from Rajkumar Rameshkumar, leading textile manufacturer in Ahmedabad.';
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Filter FAQs based on search and category
  useEffect(() => {
    let filtered = faqData;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = faqData.filter(cat => cat.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.map(category => ({
        ...category,
        questions: category.questions.filter(
          q =>
            q.question.toLowerCase().includes(query) ||
            q.answer.toLowerCase().includes(query) ||
            q.keywords.some(k => k.toLowerCase().includes(query))
        )
      })).filter(category => category.questions.length > 0);
    }

    setFilteredFAQs(filtered);
  }, [searchQuery, activeCategory]);

  const allCategories = ['all', ...faqData.map(cat => cat.category)];
  const totalQuestions = faqData.reduce((acc, cat) => acc + cat.questions.length, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to know about our PV, PC & R/C fabrics, ordering process, quality standards, and more
          </p>
          <div className="bg-white rounded-lg shadow-sm p-2 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search questions, keywords, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {totalQuestions} questions answered across {faqData.length} categories
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq-section" className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-12">
              {filteredFAQs.map((category) => {
                const Icon = iconMap[category.icon];
                return (
                  <div key={category.category}>
                    {/* Category Header */}
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {category.category}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {category.questions.length} questions in this category
                        </p>
                      </div>
                    </div>

                    {/* Questions Accordion */}
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 transition-colors">
                            <div className="flex items-start text-left">
                              <span className="font-semibold text-lg text-gray-900 pr-4">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6">
                            <div className="pt-4 border-t">
                              <p className="text-gray-700 leading-relaxed mb-4">
                                {faq.answer}
                              </p>
                              {/* Keywords for AI Search */}
                              <div className="flex flex-wrap gap-2 mt-4">
                                {faq.keywords.map((keyword, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-6">
                Try different keywords or browse all categories
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Can't find what you're looking for? Our team is here to help you with any questions about our fabrics, ordering process, or custom requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+919876543210"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Related Pages - Internal Linking for SEO */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Explore More
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <a
              href="/products"
              className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <h4 className="font-semibold text-gray-900 mb-1">Our Products</h4>
              <p className="text-sm text-gray-600">Browse PV, PC & R/C fabrics</p>
            </a>
            <a
              href="/about"
              className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <h4 className="font-semibold text-gray-900 mb-1">About Us</h4>
              <p className="text-sm text-gray-600">Learn about our company</p>
            </a>
            <a
              href="/gallery"
              className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <h4 className="font-semibold text-gray-900 mb-1">Gallery</h4>
              <p className="text-sm text-gray-600">View fabric collections</p>
            </a>
            <a
              href="/contact"
              className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <h4 className="font-semibold text-gray-900 mb-1">Contact</h4>
              <p className="text-sm text-gray-600">Get in touch with us</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
