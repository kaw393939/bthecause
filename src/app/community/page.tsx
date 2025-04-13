import React from 'react';
import SectionContainer from '@/components/Layout/SectionContainer';
import Heading from '@/components/Common/Heading';
import Paragraph from '@/components/Common/Paragraph';
import Button from '@/components/Common/Button';
import { DiscordLogoIcon, ChatBubbleIcon, RocketIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Image from 'next/image';
import { createMetadataGenerator } from '@/lib/metadataUtils';

// Generate metadata dynamically from community content
export const generateMetadata = createMetadataGenerator('community');

// Placeholder data for insight cards - replace with actual data fetching later
const placeholderInsights = [
    {
        slug: 'navigating-ai-strategy',
        title: 'Beyond the Buzzwords: Forging Your Real-World AI Strategy (Sage/Hero)',
        excerpt: 'Cut through the hype. Define a clear, actionable AI roadmap aligned with your specific business goals and overcome implementation hurdles.',
        category: 'Strategic Vision',
        date: '2024-04-08',
        author: 'Michael B. Minor',
    },
    {
        slug: 'disrupting-legacy-thinking',
        title: "Is Your 'Digital Transformation' Already Obsolete? (Outlaw)", // Use double quotes to wrap string with single quotes
        excerpt: 'Challenge the slow pace of traditional change. Explore how targeted AI disruption can create immediate competitive advantages.',
        category: 'Implementation & Modernization',
        date: '2024-04-01',
        author: 'Michael B. Minor',
    },
    {
        slug: 'building-ai-literacy',
        title: "Empower Your Workforce: Building AI Capability from Within (Sage/Hero)",
        excerpt: "AI mastery isn't just for data scientists. Learn practical strategies to upskill your entire team for the AI era.",
        category: 'AI Literacy',
        date: '2024-03-25',
        author: 'Michael B. Minor',
    },
     {
        slug: 'responsible-ai-imperative',
        title: 'The Ethical Compass: Navigating Responsible AI Deployment (Sage)',
        excerpt: 'Move beyond compliance. Build trust and long-term value by embedding ethical considerations into your AI framework from day one.',
        category: 'Responsible AI',
        date: '2024-03-18',
        author: 'Michael B. Minor',
    },
];

// Re-insert InsightCardProps interface
interface InsightCardProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    slug: string;
    author: string;
}

// Re-insert Insight Card Component
const InsightCard: React.FC<InsightCardProps> = ({ title, excerpt, category, date, slug, author }) => {
    return (
        <div className="border border-border rounded-lg p-6 bg-card dark:bg-card-dark shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            <span className="text-xs font-medium uppercase text-primary dark:text-primary-light mb-2">{category}</span>
            <Heading level={3} className="text-xl font-semibold mb-3 font-poppins text-neutral-900 dark:text-neutral-100">
                 <a href={`/insights/${slug}`} className="hover:text-primary dark:hover:text-primary-light transition-colors duration-200">{title}</a>
            </Heading>
            <Paragraph className="text-neutral-700 dark:text-neutral-300 mb-4 flex-grow">
                {excerpt}
            </Paragraph>
            <div className="text-sm text-muted-foreground dark:text-muted-foreground-dark mt-auto pt-4 border-t border-border">
                <span>{author}</span> | <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>
    );
};

const InsightsPage = () => {
    return (
        <>
            {/* --- Community Hero Section with Educational Renaissance Theme --- */}
            <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-800/10 via-background to-primary/5 dark:from-purple-900/20 dark:via-background-dark dark:to-primary/10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    {/* Left side - Hero Text */}
                    <div className="lg:col-span-3 text-left">
                        <Heading
                            level={1}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins mb-4 text-neutral-900 dark:text-neutral-100"
                        >
                            The <span className="text-primary dark:text-primary-dark">Educational Renaissance</span> Community
                        </Heading>
                        <Paragraph className="text-xl max-w-2xl text-neutral-700 dark:text-neutral-300 mb-8">
                            Join a vibrant network of educators, leaders, and innovators dedicated to moving beyond the Prussian model and fostering cognitive resilience through classical education enhanced by AI.
                        </Paragraph>
                        
                        {/* Community Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-start">
                                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                                    <ChatBubbleIcon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Socratic Dialogues</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400">Engage in thought-provoking conversations on classical education principles and AI integration</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                                    <RocketIcon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Cognitive Resilience</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400">Discover practical strategies to foster critical thinking and combat digital skill erosion</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* CTA Button */}
                        <Button
                            href="https://discord.gg/fp4NrUjCa5" // Updated Discord invite link
                            variant="secondary"
                            size="lg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shadow-md"
                        >
                            Join Our Discord Community <DiscordLogoIcon className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                    
                    {/* Right side - Educational Renaissance Image */}
                    <div className="lg:col-span-2 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent rounded-2xl -z-10 blur-lg"></div>
                            <div className="bg-card dark:bg-card-dark p-6 border border-border rounded-2xl shadow-xl relative">
                                <div className="absolute top-4 right-4 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <LightningBoltIcon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg border-4 border-primary/30 shadow-lg relative">
                                        <Image 
                                            src="/images/community/community.png" 
                                            alt="Educational Renaissance Community" 
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <Heading level={2} className="text-2xl font-semibold mb-2">
                                        Join the Renaissance
                                    </Heading>
                                    <Paragraph className="text-neutral-700 dark:text-neutral-300 mb-4">
                                        Connect with educators and innovators who are reimagining education for the AI age while preserving classical learning ideals.
                                    </Paragraph>
                                    <Button 
                                        href="/contact" 
                                        variant="outline"
                                        className="border-primary text-primary hover:bg-primary/10"
                                    >
                                        Start Your Renaissance Journey
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>

            {/* --- Community Benefits Section --- */}
            <SectionContainer className="py-16 md:py-24 bg-muted/30 dark:bg-muted-dark/30">
                <Heading level={2} className="text-3xl font-semibold font-poppins mb-6 text-center text-neutral-900 dark:text-neutral-100">
                    Join the Educational Renaissance Movement
                </Heading>
                <Paragraph className="text-center max-w-3xl mx-auto mb-16 text-neutral-700 dark:text-neutral-300">
                    Connect with educators, leaders, and innovators who are committed to moving beyond the Prussian industrial model and embracing a classical, human-centered approach to education enhanced by AI.
                </Paragraph>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-card dark:bg-card-dark rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-border">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-primary-dark/20 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Classical Education Reimagined</h3>
                        <p className="text-neutral-700 dark:text-neutral-300">
                            Explore how timeless pedagogical principles can be enhanced with AI to create more engaging, personalized learning experiences that develop critical thinking.
                        </p>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="bg-card dark:bg-card-dark rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-border">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-primary-dark/20 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Cognitive Resilience Development</h3>
                        <p className="text-neutral-700 dark:text-neutral-300">
                            Learn strategies to combat digital skill erosion and develop robust memory, critical thinking, and expressive skills through balanced technology integration.
                        </p>
                    </div>
                    
                    {/* Card 3 */}
                    <div className="bg-card dark:bg-card-dark rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-border">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-primary-dark/20 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">AI-Enhanced Learning</h3>
                        <p className="text-neutral-700 dark:text-neutral-300">
                            Discover how AI can be thoughtfully integrated to support Socratic dialogue, provide personalized feedback, and free educators to focus on mentorship and character development.
                        </p>
                    </div>
                </div>
                
                {/* Final CTA */}
                <div className="text-center mt-16">
                    <Button
                        href="https://discord.gg/fp4NrUjCa5" // Updated Discord invite link
                        variant="primary"
                        size="lg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Join the Educational Renaissance
                    </Button>
                    <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                        Be part of transforming education beyond the Prussian model
                    </p>
                </div>
            </SectionContainer>
        </>
    );
};

export default InsightsPage;
