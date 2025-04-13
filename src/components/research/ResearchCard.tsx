'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PaperData } from '@/types/paper';
import { formatDate } from '@/lib/utils';

interface ResearchCardProps {
  paper: PaperData;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ paper }) => {
  const { id, title, date, excerpt, author, image, tags } = paper;
  
  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition duration-200">
      {/* Card image */}
      <div className="relative w-full pt-[56.25%] overflow-hidden">
        <Link href={`/research/${id}`} className="absolute inset-0">
          <Image
            src={image || '/images/research/default-paper.jpg'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      
      {/* Card content */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                +{tags.length - 2} more
              </span>
            )}
          </div>
        )}
        
        {/* Title */}
        <Link href={`/research/${id}`} className="block">
          <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-400 transition-colors duration-200">
            {title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-grow">
          {excerpt}
        </p>
        
        {/* Author and date */}
        <div className="flex items-center justify-between pt-3 mt-auto text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
          <span>{author}</span>
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
