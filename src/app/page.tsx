import * as React from 'react';
import SectionContainer from '../components/Layout/SectionContainer';
import { Metadata } from 'next';
import { createMetadataGenerator } from '@/lib/metadataUtils';

import HeroSection from '../components/Home/HeroSection';
import ServicesSection from '../components/Home/ServicesSection';
import AboutSection from '../components/Home/AboutSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import BlogSnippetsSection from '../components/Home/BlogSnippetsSection';
import HomeLearningLabSection from '../components/Home/HomeLearningLabSection';
import CallToActionSection from '../components/Home/CallToActionSection';

// Import data fetching functions and types
import { getSortedPostsData } from '@/lib/posts';
import { getSortedServicesData } from '@/lib/services';
import { PostData } from '@/types/post';
import { ServiceData } from '@/types/service';

// Generate metadata dynamically from home/about content
export const generateMetadata = createMetadataGenerator('about');

export default async function HomePage() {
  // Fetch exactly 3 blog posts - now with await
  const allPosts: PostData[] = await getSortedPostsData();
  const latestPosts = allPosts.slice(0, 3);
  
  // Fetch services and slice to get exactly 3 for the homepage display
  const allServices: ServiceData[] = await getSortedServicesData(); 
  const displayServices = allServices.slice(0, 3);

  return (
    <main>
      <HeroSection />
 
      <SectionContainer id="about">
        <AboutSection />
      </SectionContainer>

      <SectionContainer id="services" className="bg-neutral-100 dark:bg-neutral-900">
        <ServicesSection services={displayServices} />
      </SectionContainer>

      <SectionContainer id="lab" className="bg-white dark:bg-neutral-950 py-16">
        <HomeLearningLabSection />
      </SectionContainer>

      <div className="bg-muted dark:bg-muted-dark">
        <SectionContainer id="testimonials">
          <TestimonialsSection />
        </SectionContainer>
      </div>

      <SectionContainer id="insights" className="bg-neutral-100 dark:bg-neutral-900">
        <BlogSnippetsSection blogSnippets={latestPosts} />
      </SectionContainer>

      {/* CTA section needs to be full-width */}
      <CallToActionSection />
    </main>
  );
}
