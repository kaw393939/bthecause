'use client';

import React, { useState, useCallback, useMemo } from 'react';
import ForceGraph2D, { NodeObject, LinkObject } from 'react-force-graph-2d';
import { GraphNode, GraphLink, PhilosopherData } from '@/types/graph';

// Function to add alpha channel to hex color
const addAlpha = (color: string, opacity: number): string => {
  if (!color || !color.startsWith('#')) {
    return `rgba(128, 128, 128, ${opacity})`; // Fallback grey
  }
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase().padStart(2, '0');
};

// Function to paint the highlight effect behind a selected node
const paintSelectedHighlight = (node: NodeObject, ctx: CanvasRenderingContext2D, color: string, baseRadius: number = 5) => {
  if (!node.x || !node.y) return;

  const highlightRadius = baseRadius * 1.8;
  ctx.beginPath();
  ctx.arc(node.x, node.y, highlightRadius, 0, 2 * Math.PI, false);
  ctx.fillStyle = addAlpha(color, 0.4);
  ctx.fill();
};

// Default node painting function
const paintNode = (node: NodeObject, ctx: CanvasRenderingContext2D, fillColor: string) => {
  if (!node.x || !node.y) return;
  
  const graphNode = node as GraphNode;
  const radius = graphNode.size || 5;
  
  // Fill the node
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = fillColor;
  ctx.fill();
  
  // Add outline if this is a highlighted node
  if (graphNode.highlighted) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  }
};

// Function to paint the invisible pointer interaction area for a node
const paintNodePointerArea = (node: NodeObject, color: string, ctx: CanvasRenderingContext2D) => {
  const radius = ((node as GraphNode).size || 5) * 1.5; 
  const nodeX = node.x ?? 0;
  const nodeY = node.y ?? 0;

  ctx.fillStyle = color; 
  ctx.beginPath();
  ctx.arc(nodeX, nodeY, radius, 0, 2 * Math.PI, false);
  ctx.fill();
};

interface PhilosopherGraphComponentProps {
  graphData: PhilosopherData;
  width: number;
  height: number;
  physicsEnabled?: boolean;
  selectedLayout?: string;
  getNodeColor: (era: string | undefined) => string;
  onNodeClick?: (node: GraphNode) => void;
}

const PhilosopherGraphComponent = ({
  graphData,
  width,
  height,
  physicsEnabled = true,
  selectedLayout = 'force',
  getNodeColor,
  onNodeClick
}: PhilosopherGraphComponentProps) => {
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const highlightNodes = useMemo(() => new Set<string>(), []);
  const highlightLinks = useMemo(() => new Set<string>(), []);

  // Process nodes to add size based on their connections
  const processedData = useMemo(() => {
    if (!graphData || !graphData.nodes || !graphData.links) {
      return { nodes: [], links: [] };
    }

    // Count connections for each node
    const connectionCount: Record<string, number> = {};
    graphData.links.forEach(link => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
      
      connectionCount[sourceId] = (connectionCount[sourceId] || 0) + 1;
      connectionCount[targetId] = (connectionCount[targetId] || 0) + 1;
    });

    // Get min and max connection counts for sizing
    const counts = Object.values(connectionCount);
    const minCount = counts.length > 0 ? Math.min(...counts) : 0;
    const maxCount = counts.length > 0 ? Math.max(...counts) : 1;
    const range = maxCount - minCount || 1; // Avoid division by zero

    // Add size property to nodes based on connection count
    const processedNodes = graphData.nodes.map(node => ({
      ...node,
      size: 4 + ((connectionCount[node.id] || 0) - minCount) / range * 8,
      color: getNodeColor(node.era)
    }));

    return {
      nodes: processedNodes,
      links: graphData.links
    };
  }, [graphData, getNodeColor]);

  // Handle node hover
  const handleNodeHover = useCallback((node: NodeObject | null) => {
    if (!node) {
      highlightNodes.clear();
      highlightLinks.clear();
      setHoverNode(null);
      return;
    }

    setHoverNode(node);
    
    // Highlight connected nodes and links
    highlightNodes.clear();
    highlightLinks.clear();
    
    const nodeId = node.id;
    highlightNodes.add(nodeId as string);
    
    // Add connected nodes and links to highlights
    if (processedData.links) {
      processedData.links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
        const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
        
        if (sourceId === nodeId || targetId === nodeId) {
          highlightNodes.add(sourceId as string);
          highlightNodes.add(targetId as string);
          highlightLinks.add(`${sourceId}-${targetId}`);
        }
      });
    }
  }, [processedData.links, highlightLinks, highlightNodes]);

  // Handle node click
  const handleNodeClick = useCallback((node: NodeObject) => {
    const graphNode = node as GraphNode;
    if (onNodeClick) {
      onNodeClick(graphNode);
    }
    setSelectedNode(prevNode => 
      prevNode && prevNode.id === graphNode.id ? null : graphNode
    );
  }, [onNodeClick]);

  // Node color calculation based on hover state
  const nodeColor = useCallback((node: NodeObject) => {
    const graphNode = node as GraphNode;
    
    // If this node is selected or connected to the hovered node
    if (selectedNode && selectedNode.id === graphNode.id) {
      return '#E9D8FD'; // Light purple
    }
    
    // If this node is hovered or connected to the hovered node
    if (hoverNode && highlightNodes.has(graphNode.id as string)) {
      return graphNode.color || '#9F7AEA'; // Purple if no color specified
    }
    
    // Default node color based on era
    return graphNode.color || getNodeColor(graphNode.era);
  }, [hoverNode, selectedNode, getNodeColor, highlightNodes]);

  // Link color calculation based on hover state
  const linkColor = useCallback((link: LinkObject) => {
    const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
    const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
    const linkId = `${sourceId}-${targetId}`;
    
    if (highlightLinks.has(linkId)) {
      return '#9F7AEA'; // Purple for highlighted links
    }
    
    return '#E2E8F0'; // Light grey for regular links
  }, [highlightLinks]);

  // Link width calculation based on hover state
  const linkWidth = useCallback((link: LinkObject) => {
    const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
    const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
    const linkId = `${sourceId}-${targetId}`;
    
    if (highlightLinks.has(linkId)) {
      return 2;
    }
    
    return 1;
  }, [highlightLinks]);

  // Custom node Canvas rendering
  const paintNodeCanvas = useCallback((node: NodeObject, ctx: CanvasRenderingContext2D) => {
    const fillColor = nodeColor(node);
    paintNode(node, ctx, fillColor);
  }, [nodeColor]);

  // Conditional rendering to handle SSR
  if (typeof window === 'undefined') {
    return <div style={{ width, height }} className="graph-loading">Loading graph...</div>;
  }

  return (
    <div style={{ width, height }} className="graph-container">
      <ForceGraph2D
        graphData={processedData}
        width={width}
        height={height}
        nodeLabel={(node: NodeObject) => (node as GraphNode).name || ''}
        nodeRelSize={6}
        nodeVal={(node) => (node as GraphNode).size || 5}
        nodeColor={nodeColor}
        linkColor={linkColor}
        linkWidth={linkWidth}
        linkDirectionalParticles={3}
        linkDirectionalParticleColor={linkColor}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        warmupTicks={physicsEnabled ? 100 : 0}
        cooldownTime={physicsEnabled ? 2000 : 0}
        cooldownTicks={physicsEnabled ? 100 : 0}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        nodeCanvasObject={paintNodeCanvas}
        nodePointerAreaPaint={(node, color, ctx) => 
          paintNodePointerArea(node, 'rgba(0,0,0,0)', ctx)
        }
        d3AlphaDecay={physicsEnabled ? 0.01 : 1}
        d3VelocityDecay={physicsEnabled ? 0.3 : 0}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />
    </div>
  );
};

export default PhilosopherGraphComponent;
