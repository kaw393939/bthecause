import React, { useState, useEffect, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { GraphNode } from '@/types/graph';

const SearchIconSVG = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-5 h-5 text-gray-400"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
    />
  </svg>
);

const LoadingSpinnerSVG = () => (
  <svg 
    className="animate-spin h-5 w-5 text-gray-500" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

interface SearchBarProps {
  data?: GraphNode[];
  onSelect?: (node: GraphNode | null) => void;
  onSearchChange?: (query: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  data = [], 
  onSelect, 
  onSearchChange,
  value: externalValue,
  onChange: externalOnChange,
  placeholder = "Search...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredNodes, setFilteredNodes] = useState<GraphNode[]>([]);
  
  // Handle controlled vs uncontrolled input
  const isControlled = externalValue !== undefined && externalOnChange !== undefined;
  const currentValue = isControlled ? externalValue : query;
  
  // Handle query changes (internal state updates)
  const handleQueryChange = (newQuery: string) => {
    if (isControlled) {
      // If component is controlled externally, call the external handler
      externalOnChange(newQuery);
    } else {
      // Otherwise update internal state
      setQuery(newQuery);
    }
    
    // Notify parent of search change if callback provided
    if (onSearchChange) {
      onSearchChange(newQuery);
    }
    
    // If no data was provided, nothing to filter
    if (!data || data.length === 0) {
      setFilteredNodes([]);
      return;
    }
    
    // Filter data based on query
    if (newQuery.trim() === '') {
      setFilteredNodes([]);
    } else {
      setIsLoading(true);
      
      // Simulate API delay for smoother UX
      setTimeout(() => {
        const searchTerms = newQuery.toLowerCase().split(' ').filter(Boolean);
        const filtered = data.filter(node => {
          if (!node) return false;
          
          // Search in multiple fields
          const searchableFields = [
            node.name || '',
            node.era || '',
            node.description || '',
            ...(Array.isArray(node.keywords) ? node.keywords : [])
          ].map(field => field.toLowerCase());
          
          // All search terms must match at least one field
          return searchTerms.every(term => 
            searchableFields.some(field => field.includes(term))
          );
        });
        
        setFilteredNodes(filtered);
        setIsLoading(false);
      }, 150);
    }
  };
  
  // Handle node selection
  const handleNodeSelect = (node: GraphNode | null) => {
    setSelectedNode(node);
    if (onSelect) {
      onSelect(node);
    }
    // Reset the search query after selection
    if (!isControlled) {
      setQuery('');
    } else if (externalOnChange) {
      externalOnChange('');
    }
    setFilteredNodes([]);
  };
  
  useEffect(() => {
    // If data changes, we may need to update filtered nodes
    if (currentValue.trim() !== '') {
      handleQueryChange(currentValue);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className={`relative w-full ${className}`}>
      <Combobox value={selectedNode} onChange={handleNodeSelect}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <Combobox.Input
              className="w-full py-2 pl-10 pr-3 text-sm leading-5 text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none focus:ring-0 border-none"
              value={currentValue}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder={placeholder}
              spellCheck={false}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {isLoading ? <LoadingSpinnerSVG /> : <SearchIconSVG />}
            </div>
          </div>
          
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              // Clean up operations after dropdown closes
            }}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredNodes.length === 0 && currentValue !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-500 dark:text-gray-400">
                  {isLoading ? "Searching..." : "No results found."}
                </div>
              ) : (
                filteredNodes.map((node) => (
                  <Combobox.Option
                    key={node.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-900 dark:text-gray-100'
                      }`
                    }
                    value={node}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {node.name}
                        </span>
                        {node.era && (
                          <span
                            className={`block truncate text-xs ${
                              active ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {node.era}
                          </span>
                        )}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-blue-600'
                            }`}
                          >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchBar;
