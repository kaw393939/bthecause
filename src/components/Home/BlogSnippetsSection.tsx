'use client';

import React from 'react';
import SectionHeading from '../Common/SectionHeading';
import BlogCard from '../insights/BlogCard';
import Button from '../Common/Button';
import { PostData } from '@/types/post';
import Image from 'next/image';

interface BlogSnippetsSectionProps {
  blogSnippets: PostData[];
}

const BlogSnippetsSection: React.FC<BlogSnippetsSectionProps> = ({ blogSnippets }) => (
  <div className="py-16 bg-white dark:bg-gray-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <SectionHeading className="text-3xl sm:text-4xl md:text-5xl mb-6 font-heading font-semibold">
          <div className="flex items-center justify-center">
            <span className="text-neutral-900 dark:text-white">Educational Resources &amp; Insights</span>
          </div>
        </SectionHeading>
        <p className="text-neutral-800 dark:text-neutral-200 max-w-3xl mx-auto text-lg font-sans">
          Explore our latest educational resources, research findings, and insights on AI in learning environments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        {blogSnippets.map((post, index) => (
          <BlogCard 
            key={index}
            post={post}
            index={index}
          />
        ))}
      </div>

      <div className="text-center">
        <Button 
          variant="primary" 
          href="/insights" 
          size="lg"
          className="font-medium shadow-sm"
        >
          View All Resources
        </Button>
      </div>
    </div>
  </div>
);

export default BlogSnippetsSection;
