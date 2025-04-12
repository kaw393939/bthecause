// src/components/Forge/ForgeProjectCard.tsx
import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import EducationalCard from '../Common/EducationalCard';
import Button from '../Common/Button';
import JdenticonIcon from '../Common/JdenticonIcon';
import Heading from '../Common/Heading';
import Paragraph from '../Common/Paragraph';
import { ForgeProjectData } from '@/lib/forgeUtils';
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'; // Icons for links
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface ForgeProjectCardProps {
  project: ForgeProjectData;
}

/**
 * ForgeProjectCard component following Bthecause spacing guide.
 * Displays educational tools and projects with consistent spacing
 * based on the 8pt grid system.
 */
const ForgeProjectCard: React.FC<ForgeProjectCardProps> = ({ project }) => {
  const { 
    id, 
    title, 
    content, 
    image, 
    tags, 
    githubUrl, 
    tryUrl, 
    status 
  } = project;

  const isComingSoon = status === 'Coming Soon';

  // Determine if the link is internal or external
  const isInternalLink = tryUrl && tryUrl.startsWith('/');
  
  // Handle tracking for GitHub button clicks
  const handleGitHubClick = () => {
    trackEvent(AnalyticsEvents.EXTERNAL_LINK_CLICK, {
      destination: 'github',
      project_id: id,
      project_title: title
    });
  };
  
  // Handle tracking for Try It button clicks
  const handleTryClick = () => {
    trackEvent(AnalyticsEvents.FORGE_PROJECT_CLICKED, {
      project_id: id,
      project_title: title,
      project_status: status || 'unknown',
      destination: isInternalLink ? 'internal' : 'external'
    });
  };

  return (
    <EducationalCard 
      key={id} 
      className="h-full"
      padding="md"
      variant="primary"
    > 
      {/* Image with consistent aspect ratio following 8pt grid */}
      {image ? (
        <div className="w-full mb-4 rounded-lg overflow-hidden bg-purple-100 dark:bg-purple-900/30 aspect-[4/3] flex items-center justify-center"> 
          <Image
            src={image}
            alt={`${title} preview`}
            width={320}
            height={180}
            className="w-full h-auto object-cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"> 
          <JdenticonIcon value={title} size={40} />
        </div>
      )}

      {/* Content with consistent spacing following 8pt grid */}
      <div className="flex flex-col flex-grow gap-4">
        {/* Title */}
        <Heading level={4} className="font-semibold text-lg text-neutral-900 dark:text-neutral-50">
          {title}
        </Heading>

        {/* Description */}
        <Paragraph variant="body2" className="text-neutral-700 dark:text-neutral-300 flex-grow text-sm">
          {content}
        </Paragraph>

        {/* Tags with proper spacing */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-md dark:bg-purple-900/30 dark:text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Status Badge */}
        {status && !isComingSoon && (
          <div>
            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${ 
              isComingSoon 
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' 
                : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
            }`}>
              {status}
            </span>
          </div>
        )}
        
        {/* Buttons */}
        <div className="mt-auto pt-4 border-t border-purple-100 dark:border-purple-900/30 flex flex-wrap gap-2">
          {githubUrl && (
            <Button 
              href={githubUrl} 
              variant="outline" 
              size="sm" 
              leftIcon={<FaGithub />} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleGitHubClick}
            >
              GitHub
            </Button>
          )}
          {tryUrl && (
            <Button 
              href={tryUrl} 
              variant="primary"
              size="sm"
              leftIcon={<FaArrowUpRightFromSquare />} 
              target={isInternalLink ? "_self" : "_blank"}
              rel={isInternalLink ? "" : "noopener noreferrer"}
              disabled={isComingSoon}
              onClick={!isComingSoon ? handleTryClick : undefined}
            >
              {isComingSoon ? 'Coming Soon' : 'Try It'}
            </Button>
          )}
        </div>
      </div>
    </EducationalCard>
  );
};

export default ForgeProjectCard;
