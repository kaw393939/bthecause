'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../Common/Button';
import Heading from '../Common/Heading';
import Paragraph from '../Common/Paragraph';

const HeroSection = () => (
  <section
    className="min-h-[90vh] flex flex-col justify-center text-white bg-[url('/hero_star_bg.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden pt-20 sm:pt-24 md:pt-32"
  >
    {/* Overlay with improved contrast for text readability */}
    <div
      className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10"
    />
    
    {/* Content Container */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center">
      {/* Inner Content Box */}
      <div className="flex flex-col items-center text-center p-6 sm:p-8">
        {/* Main heading - increased weight and size for authority */}
        <Heading
          level={1}
          className="font-bold text-white text-3xl sm:text-5xl md:text-6xl mb-8 leading-tight"
        >
          Transforming Education Through Evidence-Based Innovation
        </Heading>
        
        {/* Subheading with clean, professional messaging */}
        <Paragraph className="text-white text-xl mb-10 max-w-3xl leading-relaxed">
          We partner with educational leaders to deliver 
          <span className="text-secondary-light font-semibold"> research-backed learning solutions</span> that 
          empower educators, enhance student outcomes, and create lasting educational impact through 
          <span className="text-secondary-light font-semibold"> innovative instructional approaches</span>.
        </Paragraph>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button 
            variant="primary"
            href="/about/learning-lab" 
            size="lg"
            className="shadow-md font-medium"
          >
            Explore Learning Lab
          </Button>
          <Button 
            variant="outline" 
            href="/contact"
            size="lg" 
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium"
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </div>
    
    {/* Professional accent line at bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-accent z-20"></div>
  </section>
);

export default HeroSection;
