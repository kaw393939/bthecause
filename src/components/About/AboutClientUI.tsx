// src/components/About/AboutClientUI.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from '@/components/Layout/SectionContainer';
import Heading from '@/components/Common/Heading';
import Paragraph from '@/components/Common/Paragraph';
import Button from '@/components/Common/Button';

// Icons for sections
const PlaceholderIcon = ({ char }: { char: string }) => (
  <div className="mx-auto mb-4 w-16 h-16 bg-purple-500/10 dark:bg-purple-500/20 rounded-full flex items-center justify-center text-purple-500 dark:text-purple-300 text-3xl font-semibold font-poppins">
    {char}
  </div>
);

interface AboutClientUIProps {
  aboutData: any; // Prop kept for structure, but currently unused in this design
}

export const AboutClientUI: React.FC<AboutClientUIProps> = ({ aboutData }) => {
  return (
    <main className="bg-background dark:bg-neutral-950">
      {/* --- Hero Section --- */}
      <SectionContainer className="pt-20 pb-16 text-center">
        <Heading
          level={1}
          className="font-poppins font-semibold text-4xl sm:text-5xl mb-6 text-neutral-900 dark:text-neutral-100"
        >
          Empowering <span className="text-purple-500 dark:text-purple-400">Your Journey</span>
        </Heading>
        <Paragraph className="text-xl max-w-3xl mx-auto text-neutral-800 dark:text-neutral-200 mb-8">
          Our solutions are designed to meet people where they are, creating the greatest chance for success in education, employment, and life.
        </Paragraph>
        <Button 
          href="/about/learning-lab" 
          variant="primary" 
          size="lg"
          className="shadow-md"
        >
          Discover Our Learning Lab
        </Button>
      </SectionContainer>

      {/* --- BTC Is All About Solving Real Problems --- */}
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <Heading level={2} className="text-2xl md:text-3xl font-semibold mb-6 font-poppins text-center text-neutral-900 dark:text-neutral-100">
            Bthecause Is All About Solving Real Problems
          </Heading>
          <Paragraph className="mb-8 text-lg text-center text-neutral-800 dark:text-neutral-200">
            Too many young people face a lack of physical and digital equity in education, support, networking, resources, health and wellness services, and skill development. We place youth at the center of our work to address equity and agency head-on.
          </Paragraph>
        </div>
      </SectionContainer>

      {/* --- The BTC Platform --- */}
      <SectionContainer className="bg-gradient-to-br from-purple-500/5 via-background to-blue-500/5 dark:from-purple-500/10 dark:via-background-dark dark:to-blue-500/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={2} className="text-3xl font-semibold mb-2 font-poppins text-neutral-900 dark:text-neutral-100">
              Welcome to the Bthecause Platform
            </Heading>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Image
                src="/logo.png"
                alt="Bthecause Logo"
                width={240}
                height={60}
                className="mb-6"
                priority
              />
              <Heading level={3} className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
                Avatar Driven
              </Heading>
              <Paragraph className="text-lg text-neutral-800 dark:text-neutral-200">
                With real-time avatar interactions and support resources, members are more likely to develop executive function, self-awareness, resilience, relationships, and motivation to become prepared and empowered to take on life's challenges.
              </Paragraph>
              <Button 
                href="/contact" 
                variant="secondary" 
                className="mt-6"
              >
                Contact Us
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md">
              <Heading level={3} className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
                Reimagining the Village
              </Heading>
              <Paragraph className="text-neutral-800 dark:text-neutral-200 mb-6">
                Bthecause integrates smart AI technology and curated interpersonal engagements to reimagine or recreate the ecological support systems of family, community, education, wellness, professional networking and positive civic and social engagements to provide the different perspectives, skills, and experiences necessary for mastering resilience, rigor, relationships and voice.
              </Paragraph>
              <div className="flex justify-center">
                <Image
                  src="/images/about/2_3_transform.png"
                  alt="Educational Transformation Architects"
                  width={300}
                  height={200}
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* --- Technology + 4 Friends as a Village --- */}
      <SectionContainer className="bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <Heading level={2} className="text-center text-3xl font-semibold mb-8 font-poppins text-neutral-900 dark:text-neutral-100">
            Technology + 4 Friends as a Village
          </Heading>
          <Paragraph className="text-lg text-neutral-800 dark:text-neutral-200 mb-8">
            Our unique platform is designed to help young people: slow the pace, provide time to reflect and comprehend, connect and collaborate, and chart a course for their future, be confident in their capacity to overcome the obstacles on their path, and make a difference in the world.
          </Paragraph>
          <Paragraph className="text-lg text-neutral-800 dark:text-neutral-200 font-medium">
            No other youth-facing platform exists in the market to comprehensively empower young people, families and care providers to easily and safely access an array of accountable community resources while reinforcing positive human connections.
          </Paragraph>
        </div>
      </SectionContainer>

      {/* --- The BTC Outcome --- */}
      <SectionContainer className="bg-purple-500/10 dark:bg-purple-500/5">
        <Heading level={2} className="text-center mb-6 font-poppins font-semibold text-3xl text-neutral-900 dark:text-neutral-100">
          The Bthecause Outcome
        </Heading>
        <Paragraph className="text-center text-xl font-medium max-w-2xl mx-auto mb-12 text-neutral-800 dark:text-neutral-200">
          A Young Person who has taken full advantage of all that Bthecause has to offer…
        </Paragraph>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            "is emotionally resilient",
            "engages their communities",
            "is comfortable in their agency",
            "is attractive to appropriate post-secondary educational institutions or employers",
            "holds themself accountable",
            "asks for help and seeks available resources",
            "has created a life roadmap"
          ].map((outcome, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-purple-500">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <Paragraph className="font-medium text-gray-900 dark:text-white">
                  {outcome}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* --- BTC Senior Team --- */}
      <SectionContainer>
        <Heading level={2} className="text-center mb-12 font-poppins font-semibold text-3xl text-neutral-900 dark:text-neutral-100">
          Our Leadership Team
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Michael Minor", title: "Founder / Chairman" },
            { name: "Deborah Delisle", title: "CEO" },
            { name: "Mark De Revere", title: "Co-Founder / CTO" },
            { name: "Dr. Hortensia Kelly", title: "Co-Founder / Chief Medical Officer" },
            { name: "Steve Dawson", title: "Co-Founder / COO" },
            { name: "Dr. Michele Owens", title: "Chief Clinical Officer" },
            { name: "Yinka Fadahunsi", title: "Chief Financial Officer" },
            { name: "Keith Williams", title: "Educational Transformation Lead" }
          ].map((member, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <Image
                  src={`/team/${member.name.split(' ').join('')}.jpg`} 
                  alt={member.name}
                  width={96}
                  height={96}
                  className="object-cover"
                  onError={(e) => {
                    // @ts-ignore
                    e.target.src = "/team/placeholder.jpg";
                  }}
                />
              </div>
              <Heading level={4} className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                {member.name}
              </Heading>
              <Paragraph variant="body2" className="text-sm text-gray-600 dark:text-gray-400">
                {member.title}
              </Paragraph>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* --- Partners Section --- */}
      <SectionContainer className="bg-muted/30 dark:bg-muted/10">
        <Heading level={2} className="text-center mb-8 font-poppins font-semibold text-3xl text-neutral-900 dark:text-neutral-100">
          Partners
        </Heading>
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
          {/* Partner logos would go here */}
          <div className="w-32 h-16 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-gray-400">Partner Logo</div>
          </div>
          <div className="w-32 h-16 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-gray-400">Partner Logo</div>
          </div>
          <div className="w-32 h-16 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-gray-400">Partner Logo</div>
          </div>
          <div className="w-32 h-16 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-gray-400">Partner Logo</div>
          </div>
        </div>
      </SectionContainer>

      {/* --- CTA Section --- */}
      <SectionContainer className="text-center bg-gradient-to-br from-purple-500/10 via-background to-blue-500/10 dark:from-purple-500/20 dark:via-background-dark dark:to-blue-500/20">
        <Heading level={2} className="mb-4 text-3xl font-poppins font-semibold text-neutral-900 dark:text-neutral-100">
          Ready to Empower Your Educational Journey?
        </Heading>
        <Paragraph className="text-lg max-w-2xl mx-auto text-neutral-800 dark:text-neutral-200 mb-6">
          Let's discuss how Bthecause can help you navigate the educational landscape and build the resilience, relationships, and resources needed for success.
        </Paragraph>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/about/learning-lab" variant="secondary" size="lg">
            Explore Our Learning Lab
          </Button>
          <Button href="/contact" variant="primary" size="lg">
            Join Our Waitlist
          </Button>
        </div>
      </SectionContainer>
    </main>
  );
};

export default AboutClientUI;
