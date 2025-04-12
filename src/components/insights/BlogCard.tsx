'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostData } from '@/types/post';
import { ViewMode } from './InsightsListWrapper';
import EducationalCard from '../Common/EducationalCard';

interface BlogCardProps {
  post: PostData;
  viewMode?: ViewMode; // Made optional
  index?: number;      // Add index prop
  currentPage?: number; // Add currentPage prop
}

/**
 * BlogCard component following Bthecause spacing guide.
 * Presents educational blog content with consistent spacing
 * based on the 8pt grid system.
 */
const BlogCard: React.FC<BlogCardProps> = ({ post, index, currentPage /*, viewMode*/ }) => {
  const linkHref = `/insights/${post.slug}`;

  // --- "New" Badge Logic ---
  const isNew = (() => {
    if (!post.date) return false; // Can't determine if no date
    try {
      const postDate = new Date(post.date);
      const today = new Date();
      const timeDiff = today.getTime() - postDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24); // Difference in days
      return daysDiff <= 7; // Consider posts within the last 7 days as "New"
    } catch (error) {
      console.error("Error parsing date for blog card:", post.date, error);
      return false;
    }
  })();

  return (
    <EducationalCard 
      className="relative w-full p-0 overflow-hidden"
      variant="neutral"
    >
      {/* Link now wraps the entire content for full clickability */}
      <Link 
        href={linkHref}
        className="no-underline text-inherit flex flex-col flex-grow group overflow-hidden h-full" 
      >
        {isNew && (
          <span 
            className="absolute top-3 right-3 z-10 bg-primary text-white font-medium text-xs px-2 py-1 rounded-sm"
          >
            New
          </span>
        )}
        
        {/* Image container with consistent aspect ratio */} 
        <div className="relative overflow-hidden w-full">
          {post.image ? (
            <Image
              src={post.image || '/images/default-blog-banner.jpg'}
              alt={post.title}
              width={320}
              height={180}
              className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={index === 0 && currentPage === 1}
            />
          ) : (
            <div className="w-full aspect-video bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                Image Coming Soon
              </p>
            </div>
          )}
        </div>
        
        {/* Content Area with 8pt grid spacing (p-6 = 24px) */}
        <div className="p-6 flex-grow flex flex-col gap-4">
          {/* Category/Tag */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag, i) => (
                <span 
                  key={i} 
                  className="inline-block px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-medium rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Title - Maintain readability with proper heading size */}
          <h3 className="font-heading font-semibold text-xl text-neutral-900 dark:text-white leading-tight">
            {post.title}
          </h3>
          
          {/* Excerpt - Ensure readable with proper contrast */}
          <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          
          {/* Read more link at the bottom */}
          <div className="mt-auto pt-4 flex items-center text-primary font-medium text-sm">
            Read Article
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </EducationalCard>
  );
};

export default BlogCard;
