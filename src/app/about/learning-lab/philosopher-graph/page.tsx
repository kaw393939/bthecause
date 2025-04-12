'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { PhilosopherData, GraphNode, GraphLink } from '@/types/graph';
import { NodeObject, ForceGraphMethods } from 'react-force-graph-2d';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/Graph/controls/SearchBar';
import GraphLegend from '@/components/Graph/GraphLegend'; 
import AnalyticsModal from '@/components/Graph/analytics/AnalyticsModal';
import { NodeDetailPanel } from '@/components/Graph/panels/NodeDetailPanel'; 
import PageContainer from '@/components/Layout/PageContainer'; 
import resolveConfig from 'tailwindcss/resolveConfig'; 
import tailwindConfig from '../../../../../tailwind.config.js'; 

// Define props interface to match the component
interface PhilosopherGraphComponentProps {
  graphData: PhilosopherData;
  width: number;
  height: number;
  getNodeColor: (era: string | undefined) => string;
  onNodeClick?: (node: GraphNode) => void;
  physicsEnabled?: boolean;
  selectedLayout?: string;
}

// Dynamically import the graph component to avoid SSR issues
const DynamicPhilosopherGraph = dynamic<PhilosopherGraphComponentProps>(
  () => import('@/components/Graph/PhilosopherGraphComponent').then(mod => mod.default),
  { ssr: false }
);

// Define the page component
export default function PhilosopherGraphPage() { 
  // --- Theme Colors (Resolved from Tailwind Config - MUST BE TOP LEVEL) ---
  const fullConfig = resolveConfig(tailwindConfig);
  const themeColors = useMemo(() => {
    const getColor = (path: string[], fallback: string): string => {
      let current: any = fullConfig.theme?.colors;
      for (const key of path) {
        if (!current || typeof current !== 'object' || !(key in current)) {
          return fallback;
        }
        current = current[key];
      }
      return typeof current === 'string' ? current : fallback;
    };

    return {
      primary: getColor(['primary', '600'], '#2563EB'), // blue-600
      secondary: getColor(['secondary'], '#B8860B'), // Muted Gold
      muted: getColor(['gray', '500'], '#6B7280'), // gray-500
      lightMuted: getColor(['gray', '300'], '#D1D5DB'), // gray-300
      background: getColor(['background'], '#FFFFFF') // background
    };
  }, [fullConfig]); // Dependency: fullConfig (though it rarely changes)

  // Graph data state
  const [graphData, setGraphData] = useState<PhilosopherData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [physicsEnabled, setPhysicsEnabled] = useState<boolean>(true);
  const [selectedLayout, setSelectedLayout] = useState('force'); // e.g., 'force', 'radial'
  
  // Filtering state
  const [activeEras, setActiveEras] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null); 
  
  // Ref for the graph container div to potentially measure later if needed
  const graphContainerRef = useRef<HTMLDivElement>(null);
  
  // Create a reference to the graph component
  const graphRef = useRef<ForceGraphMethods | null>(null);
  
  // Graph dimensions state
  const [graphDimensions, setGraphDimensions] = useState({ 
    width: 800, 
    height: 600 
  });
  
  // Reusable function to fetch graph data
  const loadGraphData = async (isRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add cache-busting parameter to prevent browser caching
      const cacheBuster = `?t=${Date.now()}`;
      const response = await fetch(`/data/philosophers.json${cacheBuster}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        credentials: 'same-origin'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Loaded ${data.nodes.length} philosophers and ${data.links.length} connections`);
      
      // Reset filters only on initial load, not on refresh potentially?
      // Or always reset them? Current logic resets on both. Let's keep it for now.
      setActiveEras([]);
      setSearchQuery('');
      
      // Set the graph data
      setGraphData(data);

      // Reset the view after refresh if needed
      if (isRefresh && graphRef.current && data.nodes.length > 0) {
        setTimeout(() => { 
          if (graphRef.current) {
            try {
              graphRef.current.zoomToFit(400);
            } catch (error) {
              console.error("Error resetting view after refresh:", error);
            }
          }
        }, 100);
      }

    } catch (err) {
      const error = err as Error;
      console.error("Error fetching/loading graph data:", error);
      setError(`Failed to load philosopher data. Please try again. (${error?.message || 'Unknown error'})`);
    } finally {
      // Ensure loading state is always turned off
      setLoading(false); 
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    const fetchData = async () => {
      // Reset states before fetching
      setLoading(true);
      setError(null);
      // Don't reset graphData or activeEras here, let filter handle empty state

      try {
        // Add cache-busting parameter and headers to initial fetch
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(`/data/philosophers.json${cacheBuster}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          credentials: 'same-origin'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PhilosopherData = await response.json();

        // Set data FIRST
        setGraphData(data);

        // THEN set active eras based on the *fetched* data
        const allEras = Array.from(new Set(data.nodes.map(node => node.era).filter(Boolean)));
        setActiveEras(allEras as string[]);

      } catch (e) {
        console.error("Failed to fetch philosopher data:", e);
        setError(e instanceof Error ? e.message : 'Failed to load data');
        // Reset data/eras on error
        setGraphData({ nodes: [], links: [] });
        setActiveEras([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  // Update Graph Dimensions on Container Resize
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ResizeObserver) {
      console.warn('ResizeObserver not supported or not available in this environment.');
      // Optionally set default dimensions or handle the lack of observer
      setGraphDimensions({ width: 600, height: 400 }); // Example default
      return;
    }

    const resizeObserver = new window.ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setGraphDimensions({ width, height });
      }
    });

    if (graphContainerRef.current) {
      resizeObserver.observe(graphContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Calculate available eras *only* when graphData.nodes changes and has items
  const availableEras = useMemo(() => {
    if (!graphData || graphData.nodes.length === 0) {
      return [];
    }
    // Get all eras from nodes, filter out nulls/undefineds, and get unique values
    return Array.from(new Set(graphData.nodes.map(node => node.era).filter(Boolean) as string[]));
  }, [graphData.nodes]);

  // Computed filtered graph data based on current filters
  const filteredGraphData = useMemo(() => {
    if (!graphData || !graphData.nodes || !graphData.links) {
      // Return empty graph if there's no data
      return { nodes: [], links: [] };
    }

    // Start with active era filtering (if there are any active eras selected)
    let filteredNodes = activeEras.length > 0
      ? graphData.nodes.filter(node => node.era && activeEras.includes(node.era))
      : [...graphData.nodes];

    // Then apply search query (case-insensitive, matching on multiple fields)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredNodes = filteredNodes.filter(node => {
        return (
          node.name?.toLowerCase().includes(query) ||
          node.era?.toLowerCase().includes(query) ||
          node.description?.toLowerCase().includes(query) ||
          (Array.isArray(node.keywords) && node.keywords.some(keyword => keyword.toLowerCase().includes(query)))
        );
      });
    }

    // Filter links to only include those where both source and target nodes are in filteredNodes
    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = graphData.links.filter(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      return filteredNodeIds.has(sourceId) && filteredNodeIds.has(targetId);
    });

    return {
      nodes: filteredNodes,
      links: filteredLinks
    };
  }, [graphData, activeEras, searchQuery]);

  // Handler for node selection (pass this to the Dynamic Graph component)
  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(prevNode => prevNode?.id === node.id ? null : node);
  }, []);

  // Handler for closing the detail panel
  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle era toggle (selecting/deselecting eras)
  const handleEraToggle = useCallback((era: string) => {
    setActiveEras(prevActiveEras => {
      const isActive = prevActiveEras.includes(era);
      if (isActive) {
        return prevActiveEras.filter(e => e !== era);
      } else {
        return [...prevActiveEras, era];
      }
    });
  }, []);

  // Toggle all eras
  const handleToggleAllEras = useCallback(() => {
    setActiveEras(prevActiveEras => {
      if (prevActiveEras.length === availableEras.length) {
        return []; // Deselect all if all are selected
      } else {
        return [...availableEras]; // Select all if not all are selected
      }
    });
  }, [availableEras]);

  // Handle search input changes
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  // Toggle the physics simulation
  const handleTogglePhysics = useCallback(() => {
    setPhysicsEnabled(prev => !prev);
  }, []);

  // Change the layout mode
  const handleChangeLayout = useCallback((layout: string) => {
    setSelectedLayout(layout);
  }, []);

  // Refresh the graph data
  const handleRefresh = useCallback(() => {
    loadGraphData(true);
  }, []);

  // Reset view/zoom level
  const handleResetView = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
    }
  }, []);

  // Calculate node color based on era or other attributes
  const getNodeColorByEra = useCallback((era: string | undefined): string => {
    if (!era) return themeColors.muted; // Default fallback

    // Map eras to colors (could also use a pre-defined mapping)
    const eraColorMap: Record<string, string> = {
      'Pre-Socratic': '#4C51BF', // indigo-600
      'Classical': '#805AD5', // purple-600
      'Hellenistic': '#3182CE', // blue-500
      'Roman': '#38A169', // green-600
      'Medieval': '#D69E2E', // yellow-600
      'Renaissance': '#DD6B20', // orange-600
      'Enlightenment': '#E53E3E', // red-600
      'Modern': '#4E342E', // brown-800
      'Contemporary': '#1F2937', // gray-800
    };

    return eraColorMap[era] || themeColors.muted;
  }, [themeColors]); // Dependency: themeColors

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Educational Philosopher Knowledge Graph
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the connections between influential educational thinkers throughout history. This interactive visualization demonstrates how ideas flow and influence each other across time, highlighting the interconnected nature of educational philosophy.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {/* Left side: Search and Era Filters */}
          <div className="flex-1 min-w-[250px]">
            <SearchBar 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search philosophers by name, era, or concepts..."
              className="w-full"
            />
          </div>
          
          {/* Right side: Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowAnalytics(true)}
              className="px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50"
            >
              View Analytics
            </button>
            <button
              onClick={handleResetView}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Reset View
            </button>
            <button
              onClick={handleRefresh}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Refresh Data
            </button>
          </div>
        </div>
        
        {/* Graph Container */}
        <div 
          ref={graphContainerRef}
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          style={{ height: '70vh', minHeight: '500px' }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700 dark:text-gray-300">Loading graph data...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 z-10">
              <div className="max-w-md p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Data</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
                <button 
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          
          {!loading && !error && filteredGraphData.nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 z-10">
              <div className="max-w-md p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Results Found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  No philosophers match your current search criteria. Try adjusting your filters or search query.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveEras(availableEras);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        
          {/* The Graph Visualization */}
          {DynamicPhilosopherGraph && (
            <DynamicPhilosopherGraph
              graphData={filteredGraphData}
              width={graphDimensions.width}
              height={graphDimensions.height}
              getNodeColor={getNodeColorByEra}
              onNodeClick={handleNodeClick}
              physicsEnabled={physicsEnabled}
              selectedLayout={selectedLayout}
            />
          )}
          
          {/* Bottom-left era filter panel */}
          <div className="absolute bottom-6 left-6 max-w-xs bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-md z-20 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Filter by Era</h3>
              <button 
                onClick={handleToggleAllEras} 
                className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
              >
                {activeEras.length === availableEras.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
              {availableEras.map((era) => (
                <label key={era} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeEras.includes(era)}
                    onChange={() => handleEraToggle(era)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span 
                    className="text-sm text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <span 
                      className="h-3 w-3 rounded-full mr-1.5" 
                      style={{ backgroundColor: getNodeColorByEra(era) }}
                    ></span>
                    {era}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
       
        {/* Node Detail Panel */}
        {selectedNode && (
          <NodeDetailPanel
            node={selectedNode}
            onClose={handleClosePanel}
          />
        )}
        
        {/* Analytics Modal */}
        {showAnalytics && (
          <AnalyticsModal
            graphData={filteredGraphData}
            onClose={() => setShowAnalytics(false)}
          />
        )}
        
        {/* Legend */}
        <div className="mt-6">
          <GraphLegend 
            eras={availableEras}
            getNodeColor={getNodeColorByEra}
          />
        </div>
      </div>
    </PageContainer>
  );
};
