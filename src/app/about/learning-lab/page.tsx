import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import SectionContainer from '@/components/Layout/SectionContainer';
import Heading from '@/components/Common/Heading';
import Button from '@/components/Common/Button';
import { ChevronRight, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: `The Learning Innovation Lab | ${siteConfig.name}`,
  description: 'Experience educational AI strategies proven in real learning environments before we implement them for partners.',
  openGraph: {
    title: `The Learning Innovation Lab | ${siteConfig.name}`,
    description: 'Experience educational AI strategies proven in real learning environments before we implement them for partners.',
    images: ['/images/about/living.png'],
  },
};

export default function LearningLabPage() {
  return (
    <>
      {/* Premium Hero Section with Dual-Layer Design */}
      <div className="relative">
        {/* Upper Section - Image with Overlay */}
        <div className="relative h-[45vh] sm:h-[50vh] md:h-[65vh] overflow-hidden">
          <Image 
            src="/images/about/living.png" 
            alt="Learning Innovation Lab" 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            priority
            className="brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/60 to-purple-900"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <span className="inline-block px-3 py-0.5 sm:px-4 sm:py-1 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full mb-4 sm:mb-6">
              <div className="flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="Bthecause Logo" 
                  width={90} 
                  height={15} 
                  className="inline-block mr-2 invert" 
                />
                <span>Innovation</span>
              </div>
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white text-center max-w-4xl mx-auto tracking-tight leading-none">
              The Learning Lab
            </h1>
          </div>
        </div>
        
        {/* Lower Section - Content Area */}
        <div className="bg-purple-800 relative pb-16">
          <div className="max-w-4xl mx-auto px-4 pt-8 sm:pt-10 md:pt-12 text-center">
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-10 max-w-3xl mx-auto">
              AI strategies proven in practice, not just theories on slides
            </p>
            
            <div className="flex justify-center">
              <Link href="/community" className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-turquoise-500 text-white rounded-lg font-medium shadow-lg hover:bg-turquoise-600 transition-all">
                <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">Join the Conversation</span>
              </Link>
            </div>
          </div>
          
          {/* Diagonal Cut Bottom Edge */}
          <div className="absolute -bottom-12 sm:-bottom-16 left-0 right-0 h-12 sm:h-16 z-10 overflow-hidden">
            <div className="absolute inset-0 bg-white dark:bg-background transform -skew-y-2"></div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <SectionContainer className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-lg sm:text-xl">
              At 
              <span className="inline-flex items-center mx-1">
                <Image 
                  src="/logo.png" 
                  alt="Bthecause Logo" 
                  width={90} 
                  height={15} 
                  className="inline-block dark:invert" 
                />
              </span>, 
              we don't theorize about AI in education—we implement and test it directly. Our Learning Innovation Lab ensures every strategy we recommend has been rigorously validated in real educational environments. 
            </p>
            <p>
              This practical approach means our guidance comes from direct implementation experience, not just academic research or theoretical frameworks. When we recommend an approach for your educational institution, it's because we've already proven its effectiveness in enhancing learning outcomes.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* The Genesis Engine Title Section */}
      <div className="bg-neutral-50 dark:bg-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Heading level={2} className="text-3xl md:text-4xl font-bold mb-4">
            The Genesis Engine: Educational Innovation in Action
          </Heading>
          <p className="text-lg text-neutral-800 dark:text-neutral-200 max-w-3xl mx-auto">
            Our innovation hub where we develop functioning AI solutions that transform educational experiences.
          </p>
        </div>
      </div>

      {/* Educational AI Engagement Section */}
      <SectionContainer className="py-10 sm:py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 max-w-7xl mx-auto">
          <div className="lg:w-1/2 order-2 lg:order-1 px-4">
            <div className="mb-5 sm:mb-6">
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-2 sm:mb-3">Personalized Learning</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-2 sm:mb-3">Educational AI Engagement</h3>
              <p className="text-neutral-800 dark:text-neutral-200 mb-4 text-sm sm:text-base">
                Our educational AI platform transforms student engagement and educator support with personalized, context-aware learning interactions.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Pedagogically Sound AI Characters</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Maintain educational integrity while ensuring developmentally appropriate interactions for learners of all ages.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Interactive Learning Experiences</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Accelerate concept mastery and knowledge retention through personalized dialogues and scaffolded learning.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Education-Grade Implementation</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Complete with safety measures, curriculum alignment tools, and seamless integration with existing learning management systems.</p>
                </div>
              </div>
            </div>

            <div>
              <Link href="/forge/character-chat" passHref>
                <Button 
                  variant="primary" 
                  size="sm"
                  rightIcon={<ExternalLink className="w-4 h-4 ml-1" />}
                >
                  Experience the Genesis Engine
                </Button>
              </Link>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-2">
                Powers our <Link href="/services/educational-transformation" className="text-purple-600 dark:text-purple-400 underline">Educational Transformation</Link> service
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2 px-4">
            <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
              <Image 
                src="/images/forge/characters/forge_characters_project.png" 
                alt="Educational AI Platform" 
                width={600} 
                height={400} 
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-4">
                  <span className="bg-turquoise-500 text-white px-2 py-1 rounded-full text-xs">Interactive Demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Educational Knowledge Graph Section */}
      <div className="bg-neutral-50 dark:bg-neutral-900 py-10 sm:py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
              <Image 
                src="/images/forge/philosphers/forge_philospher_project.png" 
                alt="Educational Knowledge Graph" 
                width={600} 
                height={400} 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-4">
                  <span className="bg-turquoise-500 text-white px-2 py-1 rounded-full text-xs">Interactive Visualization</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="mb-5 sm:mb-6">
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-2 sm:mb-3">Curriculum Visualization</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-2 sm:mb-3">Educational Knowledge Graph</h3>
              <p className="text-neutral-800 dark:text-neutral-200 mb-4 text-sm sm:text-base">
                Our Knowledge Graph transforms fragmented educational content into a unified, interconnected learning ecosystem.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Dynamic Curriculum Visualization</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Visualize connections between concepts across subjects, revealing learning pathways and knowledge gaps.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Intelligent Content Discovery</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Help students and educators discover relevant learning resources based on conceptual relationships, not just keywords.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Personalized Learning Paths</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Enable adaptive learning experiences that respond to individual student progress and understanding.</p>
                </div>
              </div>
            </div>

            <div>
              <Link href="/forge/philosopher-graph" passHref>
                <Button 
                  variant="primary" 
                  size="sm"
                  rightIcon={<ExternalLink className="w-4 h-4 ml-1" />}
                >
                  Explore the Knowledge Graph
                </Button>
              </Link>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-2">
                Powers our <Link href="/services/tech-strategy-leadership" className="text-purple-600 dark:text-purple-400 underline">Educational Technology Strategy</Link> service
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Educational AI Orchestration Section */}
      <SectionContainer className="py-10 sm:py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 max-w-7xl mx-auto">
          <div className="lg:w-1/2 order-2 lg:order-1 px-4">
            <div className="mb-5 sm:mb-6">
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-2 sm:mb-3">AI Integration Framework</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-2 sm:mb-3">Educational AI Orchestration</h3>
              <p className="text-neutral-800 dark:text-neutral-200 mb-4 text-sm sm:text-base">
                Our AI orchestration platform coordinates multiple AI systems to create cohesive, intelligent educational experiences.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Unified Education AI Governance</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Establish comprehensive oversight of AI deployments while maintaining educational standards and data privacy.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Multi-Agent Educational Systems</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Create specialized AI agents for different educational functions that collaborate seamlessly for comprehensive learning support.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Adaptive Learning Orchestration</h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200">Coordinate multiple AI systems to provide personalized learning experiences that adapt in real-time to student needs.</p>
                </div>
              </div>
            </div>

            <div>
              <Link href="/forge/mcp-agents" passHref>
                <Button 
                  variant="primary" 
                  size="sm"
                  rightIcon={<ExternalLink className="w-4 h-4 ml-1" />}
                >
                  See Orchestration in Action
                </Button>
              </Link>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-2">
                Powers our <Link href="/services/engineering-empowerment" className="text-purple-600 dark:text-purple-400 underline">Educational Technology Empowerment</Link> service
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2 px-4">
            <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
              <Image 
                src="/images/forge/agents/forge_mcp_project.png" 
                alt="Educational AI Orchestration" 
                width={600} 
                height={400} 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-4">
                  <span className="bg-turquoise-500 text-white px-2 py-1 rounded-full text-xs">Technical Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Learning Lab Approach Section */}
      <div className="bg-neutral-50 dark:bg-neutral-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <Heading level={2} className="text-3xl md:text-4xl font-bold mb-4">
              Our Learning Lab Approach
            </Heading>
            <p className="text-lg text-neutral-800 dark:text-neutral-200 max-w-3xl mx-auto">
              How we transform educational AI concepts into practical solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Research & Discovery",
                description: "We research emerging AI capabilities and educational needs to identify high-impact applications.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                )
              },
              {
                title: "Prototype & Test",
                description: "We build working prototypes and test them in real educational contexts, measuring impact on learning outcomes.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M9 9h6v6H9z"></path>
                  </svg>
                )
              },
              {
                title: "Refine & Validate",
                description: "We refine solutions based on educator and student feedback until we achieve measurable improvements.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="m10 14 11-11"></path>
                  </svg>
                )
              },
              {
                title: "Scale & Implement",
                description: "We develop scalable implementation frameworks that work with existing educational systems and infrastructure.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                    <rect width="10" height="14" x="3" y="8" rx="2"></rect>
                    <rect width="10" height="14" x="14" y="8" rx="2"></rect>
                    <rect width="10" height="14" x="3" y="8" rx="2"></rect>
                    <path d="M11 8a5 5 0 0 1 10 0"></path>
                    <path d="M3 12h18"></path>
                  </svg>
                )
              },
              {
                title: "Measure & Optimize",
                description: "We continuously measure educational impact and optimize solutions to improve outcomes over time.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                )
              },
              {
                title: "Transfer & Empower",
                description: "We transfer knowledge and capabilities to educational institutions, empowering them to take ownership and continue innovation.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )
              },
            ].map((step, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="mb-4 p-2 w-16 h-16 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-neutral-700 dark:text-neutral-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation CTA Section */}
      <SectionContainer className="py-12 md:py-16 bg-gradient-to-r from-purple-800 to-purple-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Heading level={2} className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Educational Approach?
          </Heading>
          <p className="text-lg text-white/90 mb-8">
            Schedule a consultation to explore how our Learning Lab innovations can enhance your educational programs and deliver measurable learning outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/contact" 
              variant="secondary" 
              size="lg"
              className="bg-white text-purple-800 hover:bg-white/90"
            >
              Book a Consultation
            </Button>
            <Button 
              href="/services" 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Explore Our Services
            </Button>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
