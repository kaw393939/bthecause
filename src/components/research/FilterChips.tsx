'use client';

import React from 'react';

interface FilterChipsProps {
  allTags: string[];
  selectedTag: string | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<string | null>>;
}

const FilterChips: React.FC<FilterChipsProps> = ({ allTags, selectedTag, setSelectedTag }) => {
  if (!allTags || allTags.length === 0) {
    return null;
  }

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null); // Toggle off if already selected
    } else {
      setSelectedTag(tag); // Select the new tag
    }
  };

  return (
    <div className="mb-4">
      <span className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Filter by Topic:
      </span>
      <div className="flex flex-row flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selectedTag === tag;
          const baseClasses = "px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors duration-150 ease-in-out";
          const selectedClasses = "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600";
          const defaultClasses = "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`${baseClasses} ${isSelected ? selectedClasses : defaultClasses}`}
            >
              {tag}
            </button>
          );
        })}
        {selectedTag && (
          <button
            onClick={() => setSelectedTag(null)}
            className="px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors duration-150 ease-in-out bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;
