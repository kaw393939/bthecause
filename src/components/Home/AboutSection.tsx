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
          <span className="text-neutral-900 dark:text-white font-heading font-semibold">Leading the Educational Renaissance</span>
        </SectionHeading>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-neutral-800 dark:text-neutral-200 text-lg">
            We provide educational leaders with <span className="text-primary font-medium">cognitive resilience development</span>, <span className="text-primary font-medium">classical education reimagined</span>, and <span className="text-primary font-medium">AI-enhanced learning</span> that blend timeless principles with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Paragraph className="text-neutral-800 dark:text-neutral-200">
              Our organization integrates <span className="text-primary font-semibold">classical educational ideals with AI technology</span> to move beyond the limitations of the Prussian industrial model. We place learners at the center of our work to address equity and agency head-on, creating transformative learning experiences.
            </Paragraph>
            
            <p className="mt-4 text-neutral-800 dark:text-neutral-200">
              We focus on developing critical thinking, cognitive resilience, and meaningful human connections in an increasingly digital world. Our platform counteracts skill erosion while empowering educators to focus on what they do best: mentorship, inspiration, and character development.
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-lg h-80 md:h-full min-h-[320px]">
            <Image
              src="/images/about/2_1_collaborative.png"
              alt="Collaborative Learning Architecture"
              fill
              className="object-cover object-top"
              style={{ objectPosition: '50% 30%' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="order-2 md:order-1 relative rounded-lg overflow-hidden shadow-lg h-80 md:h-full min-h-[320px]">
            <Image
              src="/images/about/2_2_wisdom.png"
              alt="Educational Wisdom Council"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <Heading level={3} className="text-2xl font-heading font-semibold text-neutral-900 dark:text-white mb-6">
              From Our Co-Founders
            </Heading>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <Paragraph className="text-neutral-800 dark:text-neutral-200">
                Bthecause was founded by two visionaries with complementary strengths, creating a powerful partnership that drives our mission forward.
              </Paragraph>
              
              <blockquote className="mt-6 text-lg italic text-gray-500 dark:text-gray-400 relative pl-6 border-l-4 border-purple-400 dark:border-purple-500">
                With 30 years in software engineering, 20 years as a Senior University Lecturer at NJIT, and deep expertise in Generative AI, I've designed our Genesis Engine platform to transform education. Our technology enables a renaissance that blends classical educational ideals with AI innovation to create learning experiences that develop critical thinking and cognitive resilience.
                <span className="block mt-2 text-right">
                  — Keith Williams, Co-Founder & Technical Visionary
                </span>
              </blockquote>
              
              <p className="mt-4 text-neutral-800 dark:text-neutral-200">
                &quot;My passion is ensuring that our technological innovation remains deeply rooted in human values and equity. Through my network of relationships and focus on human connection, I help facilitate Keith's vision while ensuring our solutions are accessible to all learners regardless of background or circumstance.&quot;
              </p>
              
              <p className="mt-4 text-neutral-800 dark:text-neutral-200">
                — Michael B. Minor, Co-Founder & Human-Centered Strategist
              </p>
            </div>
            
            <div className="mt-8">
              <Button 
                variant="primary" 
                href="/contact" 
                className="shadow-sm font-medium"
              >
                Join the Educational Renaissance
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Heading level={3} className="text-2xl font-heading font-semibold text-neutral-900 dark:text-white mb-6">
              Complementary Leadership
            </Heading>
            
            <Paragraph className="text-neutral-800 dark:text-neutral-200">
              Our strength comes from the unique partnership of our co-founders. Keith Williams brings technical vision, educational expertise, and AI implementation knowledge, while Michael B. Minor contributes his exceptional talent for human connection, vast network, and unwavering commitment to equity.
            </Paragraph>
            
            <p className="mt-4 text-neutral-800 dark:text-neutral-200">
              Together, they ensure that Bthecause delivers solutions that are both technologically sophisticated and deeply rooted in human values—a combination essential for true educational transformation in the AI era.
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-lg h-80 md:h-full min-h-[320px]">
            <Image
              src="/images/about/2_4_leadership.png"
              alt="Complementary Leadership"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
