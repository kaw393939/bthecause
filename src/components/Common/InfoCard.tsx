'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import Image from 'next/image';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Button from './Button';
import EducationalCard from './EducationalCard';

interface InfoCardProps {
  title: string;
  content?: string;
  excerpt?: string; 
  imageSrc?: string;
  image?: string; 
  imageAlt?: string;
  buttonText?: string;
  buttonHref?: string;
  link?: string; 
  className?: string;
  reversed?: boolean;
  priorityImage?: boolean; 
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  content,
  excerpt,
  imageSrc,
  image,
  imageAlt = '',
  buttonText,
  buttonHref,
  link,
  className = '',
  reversed = false,
  priorityImage = false,
}) => {
  const displayContent = content || excerpt || '';
  
  const displayImage = imageSrc || image;
  
  const displayLink = buttonHref || link;

  return (
    <EducationalCard 
      className={className} 
      layout="vertical"
      padding="md"
      variant="neutral"
    >
      <div className={clsx(
        'flex flex-col gap-6',
        { 'md:flex-row-reverse': reversed, 'md:flex-row': !reversed }
      )}>
        {/* Left/Right column for image */}
        {displayImage && (
          <div className="flex-shrink-0 w-full md:w-2/5">
            <div className="relative aspect-video md:aspect-square w-full overflow-hidden rounded-md">
              <Image
                src={displayImage}
                alt={imageAlt || title}
                fill
                className="object-cover"
                priority={priorityImage}
              />
            </div>
          </div>
        )}
        
        {/* Right/Left column for content */}
        <div className={clsx(
          'flex flex-col justify-center',
          displayImage ? 'w-full md:w-3/5' : 'w-full'
        )}>
          <Heading level={3} className="mb-3 text-2xl font-semibold">
            {title}
          </Heading>
          <Paragraph className="mb-6">
            {displayContent}
          </Paragraph>
          {(buttonText && displayLink) ? (
            <div className="mt-auto">
              <Button 
                variant="primary" 
                size="sm" 
                href={displayLink}
              >
                {buttonText}
              </Button>
            </div>
          ) : displayLink && (
            <div className="mt-auto">
              <Button 
                variant="primary" 
                size="sm" 
                href={displayLink}
              >
                Learn More
              </Button>
            </div>
          )}
        </div>
      </div>
    </EducationalCard>
  );
};

export default InfoCard;
