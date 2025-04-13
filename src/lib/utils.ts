import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string in a human-readable format
 * @param dateString - ISO date string to format
 * @param includeTime - Whether to include the time in the formatted string
 * @returns Formatted date string
 */
export function formatDate(dateString: string, includeTime: boolean = false): string {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  if (includeTime) {
    options.hour = 'numeric';
    options.minute = 'numeric';
  }
  
  return date.toLocaleDateString('en-US', options);
}
