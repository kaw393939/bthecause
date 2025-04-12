'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

// Helper function to add alpha - needed for consistency with graph link colors
const addAlpha = (color: string, opacity: number): string => {
  if (!color || !color.startsWith('#')) {
    console.warn(`Invalid color format for addAlpha: ${color}. Using fallback.`);
    return `rgba(128, 128, 128, ${opacity})`; // Fallback grey
  }
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase().padStart(2, '0');
};

// Helper function to calculate hue from era name (or other string)
const getHueFromString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return (hash % 256) / 256;
};

// Define era order and descriptions for consistency
const eraInfo = {
  'Ancient': { order: 1, desc: 'Classical & Hellenistic (800 BCE - 500 CE)' },
  'Medieval': { order: 2, desc: 'Middle Ages (500 - 1400 CE)' },
  'Renaissance': { order: 3, desc: 'Renaissance (1400 - 1600 CE)' },
  'Enlightenment': { order: 4, desc: 'Age of Reason (1600 - 1800 CE)' },
  'Modern': { order: 5, desc: 'Modern Era (1800 - 1950 CE)' },
  'Contemporary': { order: 6, desc: 'Current Era (1950 - Present)' }
};

interface GraphLegendProps {
  availableEras?: string[];
  activeEras?: string[];
  onToggleEra?: (era: string) => void;
  className?: string; // Allow passing additional classes
  eras?: string[];
  getNodeColor?: (era: string | undefined) => string;
}

const GraphLegend: React.FC<GraphLegendProps> = ({
  availableEras = [],
  activeEras = [],
  onToggleEra,
  className, // Destructure className
  eras = [],
  getNodeColor,
}) => {
  const linkOpacity = 0.6; // Consistent opacity for legend lines

  // Use actual eras if passed via new prop structure
  const displayEras = eras.length > 0 ? eras : availableEras;

  // Helper to determine if an era is active (for backward compatibility)
  const isEraActive = (era: string) => {
    return activeEras.length === 0 || activeEras.includes(era);
  };

  // Get color for an era - use new function if provided
  const getEraColor = (era: string) => {
    if (getNodeColor) {
      return getNodeColor(era);
    }
    
    // Original color logic as fallback
    return `hsl(${Math.floor(getHueFromString(era) * 360)}, 70%, 45%)`;
  };

  // Use hex codes matching EnterprisePhilosopherGraph
  const nodeStates = [
    { label: 'Regular Node', color: '#4B5563', desc: 'Philosopher or thinker node' },
    { label: 'Hovered/Connected', color: '#2563EB', desc: 'Node being explored or a direct connection' },
    { label: 'Selected Node', color: '#B8860B', desc: 'Currently selected philosopher' }
  ];

  return (
    <div className={twMerge("p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700", className)}>
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Graph Legend</h3>
      
      <div className="space-y-4">
        {/* Node States Legend */}
        <div>
          <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">Node States</h4>
          <div className="grid grid-cols-1 gap-2">
            {nodeStates.map((state, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: state.color }}
                ></div>
                <span className="text-xs text-gray-700 dark:text-gray-300 mr-1 font-medium">{state.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400"> — {state.desc}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Eras Legend */}
        <div>
          <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">Philosophical Eras</h4>
          <div className="grid grid-cols-1 gap-1">
            {displayEras
              .sort((a, b) => {
                // Sort by defined order in eraInfo if available
                const orderA = a in eraInfo ? eraInfo[a as keyof typeof eraInfo].order : 99;
                const orderB = b in eraInfo ? eraInfo[b as keyof typeof eraInfo].order : 99;
                return orderA - orderB;
              })
              .map((era) => {
                const eraColor = getEraColor(era);
                const isActive = isEraActive(era);
                const eraDisplay = era in eraInfo ? 
                  `${era} (${eraInfo[era as keyof typeof eraInfo].desc})` : 
                  era;
                
                return (
                  <div 
                    key={era} 
                    className={`flex items-center ${onToggleEra ? 'cursor-pointer' : ''} ${!isActive ? 'opacity-50' : ''}`} 
                    onClick={() => onToggleEra && onToggleEra(era)}
                  >
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: eraColor }}
                    ></div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {eraDisplay}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        
        {/* Connection Types */}
        <div>
          <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">Connection Types</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center">
              <div className="w-8 h-0.5 bg-gray-400 dark:bg-gray-500 mr-2"></div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Influenced by / Studied with</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-0.5 bg-blue-500 dark:bg-blue-400 mr-2"></div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Highlighted connection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphLegend;
