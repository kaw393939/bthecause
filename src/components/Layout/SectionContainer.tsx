import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string; // Allow passing additional classes (e.g., background)
  py?: string; // Allow overriding default padding (e.g., py-12, py-16, py-24)
  variant?: 'default' | 'primary' | 'secondary' | 'accent'; // Add variant for background colors
}

/**
 * SectionContainer component following Bthecause spacing guide.
 * Provides consistent vertical spacing between major content sections
 * based on the 8pt grid system.
 */
const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children, 
  id, 
  className = '', 
  py = 'py-12 md:py-16', // Responsive padding based on 8pt grid - smaller on mobile, larger on desktop
  variant = 'default'
}) => {
  // Background colors based on Bthecause brand identity
  const variantClasses = {
    default: '',
    primary: 'bg-primary-lightest dark:bg-primary/10',
    secondary: 'bg-turquoise-50 dark:bg-turquoise-900/20',
    accent: 'bg-amber-50 dark:bg-amber-900/20'
  };

  return (
    <section 
      id={id} 
      className={cn(
        py, 
        variantClasses[variant],
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
