'use client';

import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import SectionHeading from '../Common/SectionHeading';
import Button from '../Common/Button';
import Paragraph from '../Common/Paragraph';

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const PuzzleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-500">
    <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.76 1.76 0 01-.348-1.804A1.75 1.75 0 0111.25 1H12.5c1.012 0 1.867.668 2.15 1.586l.27.864a.75.75 0 001.43 0l.27-.864C16.902 1.668 17.757 1 18.77 1h1.23c.97 0 1.75.787 1.75 1.75v1.24c0 .983-.678 1.828-1.598 2.07l-.864.27a.75.75 0 000 1.43l.864.27c.92.242 1.598 1.088 1.598 2.07v1.23c0 .967-.784 1.75-1.75 1.75H18.5c-1.01 0-1.865-.668-2.148-1.586l-.271-.864a.75.75 0 00-1.43 0l-.27.864c-.283.918-1.138 1.586-2.15 1.586h-1.23c-.967 0-1.75-.783-1.75-1.75v-.96c0-.354.186-.675.401-.959a1.934 1.934 0 00.348-1.83 1.75 1.75 0 00-2.599-1.001c-.631.256-1.177.667-1.5 1.29-.315.61-.75.96-1.65.96C3.167 9.5 2 8.333 2 6.75v-.963C2 3.167 3.167 2 5.75 2c.897 0 1.32.344 1.636.941.317.599.864.993 1.5 1.235.324.121.625.276.888.49a1.75 1.75 0 01.476 2.171z" />
  </svg>
);

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-500">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg>
);

const CommunitiesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-500">
    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
  </svg>
);

interface LabFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
}

const LabFeatureCard: React.FC<LabFeatureCardProps> = ({ title, description, icon, imageSrc }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
    <div className="relative h-48 w-full">
      <Image 
        src={imageSrc} 
        alt={title}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <Paragraph className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </Paragraph>
      <div className="mt-auto pt-4">
        <Button 
          href="/about/learning-lab" 
          variant="link" 
          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
          rightIcon={<ArrowRightIcon />}
        >
          Learn more
        </Button>
      </div>
    </div>
  </div>
);

const LearningLabSection: React.FC = () => {
  const labFeatures = [
    {
      title: "Personalized Learning",
      description: "Our Learning Lab creates customized educational pathways that adapt to individual learning styles, pace, and interests, ensuring each student achieves their full potential.",
      icon: <PersonIcon />,
      imageSrc: "/images/personalized-learning.jpg"
    },
    {
      title: "Educational Communities",
      description: "We reimagine the village by creating supportive learning communities where students connect with peers, mentors, and resources that nurture growth and development.",
      icon: <CommunitiesIcon />,
      imageSrc: "/images/learning-communities.jpg"
    },
    {
      title: "Practical Problem-Solving",
      description: "Students engage with real-world challenges through our Learning Lab, developing critical thinking skills while creating solutions that matter in their communities.",
      icon: <PuzzleIcon />,
      imageSrc: "/images/problem-solving.jpg"
    }
  ];

  return (
    <div>
      <SectionHeading className="md:text-5xl mb-2">
        Our Learning Lab
      </SectionHeading>
      <Paragraph 
        variant="body1" 
        className="mt-4 mb-6 leading-7 text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto"
      >
        Experience our innovative Learning Lab where we empower young people through <span className="text-purple-500 font-medium">personalized education</span>, <span className="text-purple-500 font-medium">supportive communities</span>, and <span className="text-purple-500 font-medium">real-world problem solving</span>. Our approach integrates technology with human connection to create transformative learning experiences.
      </Paragraph>
      
      <div className="flex justify-center mb-10">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5">
            <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.747 29.747 0 00-2.455 1.45.75.75 0 10.798 1.276A31.264 31.264 0 016 13.2v.75a.75.75 0 001.5 0v-.75a31.18 31.18 0 012.454-.983.75.75 0 10-.798-1.276A29.747 29.747 0 017.5 11.459v-1.51a30.286 30.286 0 003.539-2.092.75.75 0 00-.797-1.277 31.744 31.744 0 01-2.742 1.62v-1.073a.75.75 0 00-1.5 0v1.073a31.744 31.744 0 01-2.742-1.62.75.75 0 00-.797 1.277 30.296 30.296 0 003.539 2.091v1.51z" clipRule="evenodd" />
          </svg>
          Educational Transformation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-stretch">
        {labFeatures.map((feature, index) => (
          <LabFeatureCard 
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            imageSrc={feature.imageSrc}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button 
          href="/about/learning-lab" 
          variant="primary" 
          size="lg" 
          className="shadow-sm"
        >
          Explore Our Learning Lab
        </Button>
      </div>
    </div>
  );
};

export default LearningLabSection;
