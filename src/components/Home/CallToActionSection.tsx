import React from 'react';
import Button from '../Common/Button';

const CallToActionSection = () => (
  <div className="bg-primary-dark text-white py-16 md:py-24 relative overflow-hidden">
    {/* Subtle professional background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-primary-light opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-secondary opacity-20 blur-xl"></div>
    </div>

    {/* Content container with proper width constraints */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold mb-6 text-white leading-tight">
          Ready to Transform Education with{' '}
          <span className="text-secondary-light font-semibold">Innovative Learning</span>
        </h2>
        
        <p className="text-lg mb-10 text-white/90 max-w-3xl mx-auto font-sans leading-relaxed">
          Schedule a consultation to explore how our educational technology expertise, transformation strategies, and evidence-based approaches can enhance learning experiences and deliver measurable educational outcomes.
        </p>
        
        <Button 
          href="/contact" 
          variant="secondary" 
          size="lg"
          className="font-medium shadow-md hover:shadow-lg transition-all duration-300"
        >
          Schedule Your Consultation
        </Button>
      </div>
    </div>
  </div>
);

export default CallToActionSection;
