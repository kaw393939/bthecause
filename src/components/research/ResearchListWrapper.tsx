'use client';

import React, { useState, useEffect } from 'react';
import { PaperData } from '@/types/paper';
import ResearchCard from '@/components/research/ResearchCard';
import FeaturedResearchCard from '@/components/research/FeaturedResearchCard';
import FilterChips from './FilterChips';

interface ResearchListWrapperProps {
  allPapersData: PaperData[];
}

const ResearchListWrapper: React.FC<ResearchListWrapperProps> = ({ allPapersData }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPapers, setFilteredPapers] = useState<PaperData[]>(allPapersData);

  // Extract all unique tags from papers
  const allTags = Array.from(
    new Set(
      allPapersData.flatMap(paper => paper.tags || [])
    )
  );

  // Get featured papers
  const featuredPapers = allPapersData.filter(paper => paper.featured);
  
  // Handle tag selection changes
  useEffect(() => {
    if (selectedTag) {
      setFilteredPapers(
        allPapersData.filter(paper => paper.tags && paper.tags.includes(selectedTag))
      );
    } else {
      setFilteredPapers(allPapersData);
    }
  }, [selectedTag, allPapersData]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Filter chips */}
      <div className="mb-8">
        <FilterChips 
          allTags={allTags} 
          selectedTag={selectedTag} 
          setSelectedTag={setSelectedTag} 
        />
      </div>

      {/* Featured papers section (only show if no tag is selected) */}
      {!selectedTag && featuredPapers.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-6">
            Featured Research
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {featuredPapers.map((paper) => (
              <FeaturedResearchCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      )}

      {/* All papers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredPapers
          .filter(paper => !selectedTag || !featuredPapers.includes(paper))
          .map((paper) => (
            <ResearchCard key={paper.id} paper={paper} />
          ))}
      </div>

      {/* No results message */}
      {filteredPapers.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl text-gray-600 dark:text-gray-400">
            No research papers found for this filter.
          </h3>
          <button 
            onClick={() => setSelectedTag(null)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ResearchListWrapper;
