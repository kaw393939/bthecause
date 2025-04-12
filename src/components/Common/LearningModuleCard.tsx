import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Button from './Button';

interface LearningModuleCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

/**
 * LearningModuleCard component following Bthecause spacing guide.
 * Designed specifically for educational content modules with consistent
 * spacing based on the 8pt grid system.
 */
const LearningModuleCard: React.FC<LearningModuleCardProps> = ({
  title,
  description,
  icon,
  ctaText = 'Explore Module',
  ctaHref,
  className,
  variant = 'primary'
}) => {
  // Apply consistent spacing based on 8pt grid system
  // and Bthecause brand colors
  const variantStyles = {
    primary: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/30',
    secondary: 'bg-turquoise-50 dark:bg-turquoise-900/20 border-turquoise-200 dark:border-turquoise-800/30',
    accent: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30',
  };

  const cardClasses = twMerge(
    clsx(
      'flex flex-col',
      'p-6', // 24px padding (following 8pt grid)
      'gap-4', // 16px between elements (following 8pt grid)
      'rounded-lg border',
      variantStyles[variant],
      'shadow-md hover:shadow-lg transition-all duration-200',
      className
    )
  );

  const iconStyles = twMerge(
    clsx(
      'flex items-center justify-center',
      'w-12 h-12', // 48px square (following 8pt grid)
      'mb-4', // 16px margin bottom (following 8pt grid)
      'text-2xl',
      {
        'text-purple-600 dark:text-purple-400': variant === 'primary',
        'text-turquoise-600 dark:text-turquoise-400': variant === 'secondary',
        'text-amber-600 dark:text-amber-400': variant === 'accent',
      }
    )
  );

  return (
    <div className={cardClasses}>
      {icon && <div className={iconStyles}>{icon}</div>}
      
      <Heading level={3} className="text-xl font-semibold mb-2">
        {title}
      </Heading>
      
      <Paragraph className="flex-grow mb-4">
        {description}
      </Paragraph>
      
      {ctaHref && (
        <div className="mt-2">
          <Button 
            variant={variant === 'primary' ? 'primary' : variant === 'secondary' ? 'secondary' : 'accent'} 
            href={ctaHref}
            size="sm"
          >
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LearningModuleCard;
