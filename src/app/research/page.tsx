import React, { Suspense } from 'react';
import { getSortedPapersData } from '@/lib/papers';
import { PaperData } from '@/types/paper';
import { Metadata } from 'next';
import ResearchListWrapper from '@/components/research/ResearchListWrapper';
import PageContainer from '@/components/Layout/PageContainer';
import { createMetadataGenerator } from '@/lib/metadataUtils';

// Generate metadata dynamically from research papers content
export const generateMetadata = createMetadataGenerator('research');

export default async function ResearchPage() {
  const allPapersData: PaperData[] = await getSortedPapersData();
  
  const pageTitle = "Educational Renaissance Research";
  const pageSubtitle = "Our research papers provide in-depth analysis on the intersection of classical education principles and AI technology to foster cognitive resilience in the digital era.";

  return (
    <main>
      <PageContainer title={pageTitle} subtitle={pageSubtitle}>
        <Suspense fallback={<div>Loading research papers...</div>}>
          <ResearchListWrapper 
            allPapersData={allPapersData}
          />
        </Suspense>
      </PageContainer>
    </main>
  );
};
