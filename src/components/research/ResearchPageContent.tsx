'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PaperData } from '@/types/paper';
import { formatDate } from '@/lib/utils';
import { ArrowLeftIcon, DownloadIcon, BookmarkIcon, ShareIcon, LinkIcon } from 'lucide-react';
import SocialShare from '../insights/SocialShare';

interface ResearchPageContentProps {
  paperData: PaperData;
}

const ResearchPageContent: React.FC<ResearchPageContentProps> = ({ paperData }) => {
  const {
    title,
    date,
    author,
    tags,
    image,
    contentHtml,
    abstract,
    pdfUrl,
    doi,
    institution,
    excerpt
  } = paperData;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/research"
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Research
        </Link>
      </div>

      {/* Paper header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center">
            <div className="font-medium text-gray-900 dark:text-white mr-1">By:</div>
            <span>{author}</span>
          </div>
          
          {institution && (
            <div className="flex items-center">
              <div className="font-medium text-gray-900 dark:text-white mr-1">Institution:</div>
              <span>{institution}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <div className="font-medium text-gray-900 dark:text-white mr-1">Published:</div>
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
          
          {doi && (
            <div className="flex items-center">
              <div className="font-medium text-gray-900 dark:text-white mr-1">DOI:</div>
              <a
                href={`https://doi.org/${doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-primary dark:hover:text-primary-400 transition-colors"
              >
                {doi}
                <LinkIcon className="w-3 h-3 ml-1" />
              </a>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/research?tag=${tag}`}
                className="inline-block px-3 py-1 text-sm font-medium rounded-md bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Featured image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-6">
          <Image
            src={image || '/images/research/default-paper.jpg'}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex flex-wrap gap-3">
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            )}
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Print / Save
            </button>
          </div>
          
          {/* Social sharing */}
          <SocialShare 
            title={title} 
            url={typeof window !== 'undefined' ? window.location.href : ''}
            description={abstract || excerpt || `Read "${title}" - A research paper by ${author}`}
          />
        </div>
      </header>

      {/* Abstract section */}
      {abstract && (
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
            Abstract
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{abstract}</p>
        </div>
      )}

      {/* Main content */}
      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:font-semibold prose-a:text-primary dark:prose-a:text-primary-400 prose-img:rounded-lg">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>

      {/* References section */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
          References & Citations
        </h2>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <p className="italic">The citations in this paper follow academic standards and are presented in the text with the format [Author, Year].</p>
          <p>All sources have been carefully reviewed and are included to support the Educational Renaissance Framework that forms the foundation of Bthecause's approach to education.</p>
        </div>
      </div>

      {/* Citation info */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
          How to Cite This Research
        </h2>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">APA Style</h3>
            <p className="font-mono p-3 bg-gray-100 dark:bg-gray-800 rounded">
              {`${author.split(',')[0]}, ${author.split(',')[1] ? author.split(',')[1].trim()[0] + '.' : ''} (${new Date(date).getFullYear()}). ${title}. Bthecause Educational Renaissance Research${institution ? `, ${institution}` : ''}.`}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">MLA Style</h3>
            <p className="font-mono p-3 bg-gray-100 dark:bg-gray-800 rounded">
              {`${author.split(',')[0]}, ${author.split(',')[1] ? author.split(',')[1].trim() : ''}. "${title}." Bthecause Educational Renaissance Research, ${formatDate(date, false)}${institution ? `, ${institution}` : ''}.`}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ResearchPageContent;
