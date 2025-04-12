'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '../Common/SectionHeading';
import Paragraph from '../Common/Paragraph';
import Button from '../Common/Button';

const HomeLearningLabSection: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
        {/* Content Side */}
        <div className="lg:w-1/2 px-4">
          <SectionHeading className="text-3xl sm:text-4xl md:text-5xl mb-6 text-purple-600 dark:text-purple-400">
            The Learning Lab
          </SectionHeading>
          
          <Paragraph className="text-lg mb-6">
            Our innovative Learning Lab is where educational transformation happens. We develop and 
            test AI-enhanced learning experiences in real educational settings before implementing them for our partners.
          </Paragraph>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Personalized Learning Experiences</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Tailored educational pathways that adapt to individual learning styles and needs
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full bg-turquoise-100 dark:bg-turquoise-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-turquoise-600 dark:text-turquoise-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Educational Knowledge Graphs</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Visualize connections between concepts and explore educational philosophies
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">AI-Enhanced Curriculum</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Innovative approaches that combine human expertise with AI capabilities
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            href="/about/learning-lab" 
            variant="primary" 
            size="lg"
            className="mt-2"
            rightIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            }
          >
            Explore The Lab
          </Button>
        </div>
        
        {/* Image Side */}
        <div className="lg:w-1/2 px-4">
          <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3]">
            <Image 
              src="/images/about/living.png" 
              alt="Bthecause Learning Lab" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6">
                <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  Innovation Hub
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLearningLabSection;
