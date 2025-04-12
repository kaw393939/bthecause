// Type declarations for custom components
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ForceGraphMethods } from 'react-force-graph-2d';
import { GraphNode, PhilosopherData } from './graph';

// Type declaration for the EducationalPhilosopherGraph component
declare module '@/components/Graph/EducationalPhilosopherGraph' {
  export interface EducationalPhilosopherGraphProps {
    graphData: PhilosopherData;
    width: number;
    height: number;
    getNodeColor: (era: string | undefined) => string;
    onNodeClick?: (node: GraphNode) => void;
    physicsEnabled?: boolean;
    selectedLayout?: string;
  }

  // Define the component type with ForwardRef
  const EducationalPhilosopherGraph: ForwardRefExoticComponent<
    EducationalPhilosopherGraphProps & RefAttributes<ForceGraphMethods | null>
  >;

  export default EducationalPhilosopherGraph;
}
