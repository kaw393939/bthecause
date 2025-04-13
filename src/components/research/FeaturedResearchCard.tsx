'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PaperData } from '@/types/paper';
import { formatDate } from '@/lib/utils';
import { ArrowRightIcon, FileTextIcon, DownloadIcon } from 'lucide-react';

interface FeaturedResearchCardProps {
  paper: PaperData;
}

const FeaturedResearchCard: React.FC<FeaturedResearchCardProps> = ({ paper }) => {
  const { id, title, date, excerpt, author, image, tags, pdfUrl } = paper;
  
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-md hover:shadow-lg transition duration-200">
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="relative w-full md:w-2/5 pt-[56.25%] md:pt-0 overflow-hidden">
          <Link href={`/research/${id}`}>
            <Image
              src={image || '/images/research/default-paper.jpg'}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
        
        {/* Content section */}
        <div className="p-6 md:w-3/5 flex flex-col space-y-4">
          {/* Featured badge */}
          <div className="flex justify-between items-center">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-500 text-white">
              Featured Research
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(date)}
            </span>
          </div>
          
          {/* Title */}
          <Link href={`/research/${id}`} className="block">
            <h3 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-400 transition-colors duration-200">
              {title}
            </h3>
          </Link>
          
          {/* Author */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            By {author}
          </div>
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Excerpt */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-grow">
            {excerpt}
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <Link 
              href={`/research/${id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              <FileTextIcon className="w-4 h-4 mr-2" />
              Read Paper
            </Link>
            
            {pdfUrl && (
              <Link 
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download PDF
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedResearchCard;
