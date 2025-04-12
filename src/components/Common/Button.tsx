import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// Base props common to both button and anchor
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

// Props specific to anchor element (when href is present)
type LinkButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps | 'href'> & {
  href: string; // href is required for LinkButtonProps
  type?: never; // Cannot have button type
};

// Props specific to button element (when href is NOT present)
type NativeButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
  href?: never; // href is disallowed for NativeButtonProps
  type?: 'button' | 'submit' | 'reset';
};

// Combined type using discriminated union based on href
type ButtonProps = LinkButtonProps | NativeButtonProps;

/**
 * Button component following Bthecause spacing guide.
 * Implements the 8pt grid system for consistent spacing
 * and aligns with Bthecause's brand identity for educational transformation.
 */
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    as: ComponentProp, // Rename to avoid conflict with component variable
    disabled, // Destructure disabled here
    ...props // All other props (specific to button or anchor)
  }, ref) => {

    // Determine the component type based on whether href is passed
    const Component = ComponentProp || (props.href ? 'a' : 'button');

    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed';

    // Updated variant styles to match Bthecause's color palette
    const variantStyles = {
      primary:
        'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500 border border-transparent',
      secondary:
        'bg-turquoise-500 text-white hover:bg-turquoise-600 focus:ring-turquoise-500 border border-transparent dark:bg-turquoise-400',
      accent:
        'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 border border-transparent',
      outline:
        'border border-purple-500 text-purple-500 bg-transparent hover:bg-purple-50 focus:ring-purple-500 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20',
      ghost:
        'text-purple-500 hover:bg-purple-50 focus:ring-purple-500 dark:text-purple-400 dark:hover:bg-purple-900/20 border border-transparent',
      link:
        'text-purple-500 hover:text-purple-600 focus:outline-none focus:underline dark:text-purple-400 dark:hover:text-purple-300 border border-transparent shadow-none px-0 py-0',
    };

    // Size styles based on 8pt grid system from spacing guide
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm', // Horizontal: 12px, Vertical: 6px
      md: 'px-4 py-2 text-base',  // Horizontal: 16px, Vertical: 8px
      lg: 'px-6 py-3 text-lg',    // Horizontal: 24px, Vertical: 12px
      icon: 'p-2',                // All sides: 8px
    };

    const iconSize = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      icon: 'w-5 h-5',
    };

    const buttonClasses = twMerge(
      clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )
    );

    // Consistent icon spacing following the spacing guide
    const content = (
      <>
        {leftIcon && React.cloneElement(leftIcon, { className: twMerge(clsx("inline-block", iconSize[size], rightIcon ? 'mr-2' : '')) })}
        {(size !== 'icon' || children) && <span className="inline-block">{children}</span>}
        {rightIcon && React.cloneElement(rightIcon, { className: twMerge(clsx("inline-block", iconSize[size], leftIcon ? 'ml-2' : '')) })}
      </>
    );

    if (props.href) {
      // Extract props specifically for the <a> tag, exclude ButtonProps
      const { href, as, ...anchorProps } = props as LinkButtonProps;
      return (
        <Link href={href} passHref legacyBehavior>
          {/* Forward the ref to the underlying <a> tag */}
          <a ref={ref as React.Ref<HTMLAnchorElement>} className={buttonClasses} {...anchorProps}>
            {content}
          </a>
        </Link>
      );
    }

    // Handle rendering as a standard button
    // Extract props specifically for the <button> tag, exclude ButtonProps
    const { as, ...nativeButtonProps } = props as NativeButtonProps;
    return (
      <Component
        ref={ref as React.Ref<HTMLButtonElement>} // Forward ref to button/component
        className={buttonClasses}
        disabled={disabled} // Pass disabled prop explicitly
        type={nativeButtonProps.type || 'button'} // Default type if not provided
        {...nativeButtonProps} // Pass remaining native button props
      >
        {content}
      </Component>
    );
  }
);

// Add display name for easier debugging
Button.displayName = 'Button';

export default Button;
