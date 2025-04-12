// src/components/Testimonials/TestimonialCard.tsx
import React from 'react';
import Image from 'next/image';
import EducationalCard from '../Common/EducationalCard';
import JdenticonIcon from '../Common/JdenticonIcon';
import { TestimonialData } from '@/lib/testimonialUtils'; 
import { FaQuoteLeft } from 'react-icons/fa6'; // Quotation mark icon
import Heading from '../Common/Heading'; // Import Heading
import Paragraph from '../Common/Paragraph'; // Import Paragraph

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { id, quote, name, title, company, image } = testimonial;

  return (
    <EducationalCard 
      key={id} 
      className="h-full"
      padding="md"
      variant="accent" // Using Amber accent color for testimonials - represents the human element
    > 
      {/* Image/Avatar Container (Top, full width, aspect-video) */}
      <div className="w-full relative aspect-video overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-700 mb-6">
        {image ? (
          <Image
            src={image}
            alt={`${name} - ${title}`}
            fill
            className="object-cover"
          />
        ) : (
          // Centered Jdenticon as fallback
          <div className="absolute inset-0 flex items-center justify-center">
            <JdenticonIcon value={name} size={64} />
          </div>
        )}
      </div>

      {/* Content Container with consistent 8pt grid spacing */}
      <div className="flex flex-col flex-grow"> 
        {/* Quote (First, with icon) */} 
        <div className="relative mb-6 flex-grow">
          <FaQuoteLeft className="text-amber-600 dark:text-amber-400 text-2xl mb-2" />
          <Paragraph 
            className="italic text-lg leading-relaxed"
          >
            {quote}
          </Paragraph>
        </div>

        {/* Author Info with proper spacing */}
        <div className="mt-auto pt-4 border-t border-amber-200 dark:border-amber-700/30"> 
          <Heading level={5} className="mb-2 font-semibold text-lg">
            {name}
          </Heading>
          <Paragraph variant="body2" className="text-neutral-700 dark:text-neutral-300">
            <span className="font-medium">{title}</span>{title && company ? ', ' : ''}{company}
          </Paragraph>
        </div>
      </div>
    </EducationalCard>
  );
};

export default TestimonialCard;
