import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface EducationalCardProps {
  children: React.ReactNode;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

/**
 * EducationalCard component following Bthecause spacing guide.
 * Designed for learning content with appropriate spacing for educational contexts.
 */
const EducationalCard: React.FC<EducationalCardProps> = ({ 
  children, 
  className, 
  layout = 'vertical',
  padding = 'md',
  variant = 'neutral'
}) => {
  // Spacing based on 8pt grid system from spacing guide
  const paddingStyles = {
    sm: 'p-4', // 16px
    md: 'p-6', // 24px
    lg: 'p-8', // 32px
  };
  
  // Color variants based on formal educational brand identity
  const variantStyles = {
    primary: 'bg-white dark:bg-neutral-900 border-primary/20 dark:border-primary/30',
    secondary: 'bg-white dark:bg-neutral-900 border-secondary/20 dark:border-secondary/30',
    accent: 'bg-white dark:bg-neutral-900 border-accent/20 dark:border-accent/30',
    neutral: 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700',
  };

  // Combine base styles with any additional classes passed via props using clsx and twMerge
  const cardClasses = twMerge(
    clsx(
      'flex', 
      { 
        'flex-col': layout === 'vertical', 
        'flex-row items-start gap-6': layout === 'horizontal' 
      },
      'rounded-lg',
      variantStyles[variant],
      paddingStyles[padding],
      'border',
      'shadow-sm hover:shadow-md transition-shadow duration-200', 
      className
    )
  );

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default EducationalCard;
