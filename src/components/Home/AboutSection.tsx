'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '../Common/SectionHeading';
import Button from '../Common/Button';
import Heading from '../Common/Heading';
import Paragraph from '../Common/Paragraph';

const AboutSection: React.FC = () => {
  return (
    <div className="scroll-mt-20 bg-white dark:bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-3xl sm:text-4xl md:text-5xl mb-12 text-center">
          <span className="text-neutral-900 dark:text-white font-heading font-semibold">About Our Mission</span>
        </SectionHeading>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-neutral-800 dark:text-neutral-200 text-lg">
            We provide educational leaders with <span className="text-primary font-medium">technology empowerment</span>, <span className="text-primary font-medium">educational transformation</span>, and <span className="text-primary font-medium">equitable learning solutions</span> that meet people where they are
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Paragraph className="text-neutral-800 dark:text-neutral-200">
              Our organization integrates <span className="text-primary font-semibold">intelligent AI technology and interpersonal engagement</span> to reimagine educational support systems. We place learners at the center of our work to address equity and agency head-on, creating transformative learning experiences.
            </Paragraph>
            
            <p className="mt-4 text-neutral-800 dark:text-neutral-200">
              We focus on empowering young people to develop executive function, self-awareness, resilience, and meaningful relationships. Our platform is designed to help learners gain the competence, resources, and confidence they need to face future with confidence as they respond to tomorrow's needs.
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-lg h-80 md:h-full min-h-[320px]">
            <Image
              src="/images/about/students-learning.jpg"
              alt="Students engaged in learning"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative rounded-lg overflow-hidden shadow-lg h-80 md:h-full min-h-[320px]">
            <Image
              src="/images/about/keith.jpg"
              alt="Keith Williams, Founder"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <Heading level={3} className="text-2xl font-heading font-semibold text-neutral-900 dark:text-white mb-6">
              From Our Founder
            </Heading>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <Paragraph className="text-neutral-800 dark:text-neutral-200">
                Our organization was founded on the belief that we can create positive educational transformation through the thoughtful application of technology that centers human needs.
              </Paragraph>
              
              <p className="mt-4 text-neutral-800 dark:text-neutral-200">
                "I envision a future where educational technology serves as a powerful tool for equity, helping more young people achieve their full potential regardless of background or circumstance. Our mission is to develop and deploy solutions that foster both academic excellence and the essential human skills needed for success."
              </p>
              
              <p className="mt-4 text-neutral-800 dark:text-neutral-200">
                — Keith Williams, Founder
              </p>
            </div>
            
            <div className="mt-8">
              <Button 
                variant="primary" 
                href="/contact" 
                className="shadow-sm font-medium"
              >
                Connect With Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
