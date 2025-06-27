import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the correct base URL for redirects based on environment
 * Uses NEXT_PUBLIC_APP_URL environment variable or falls back to defaults
 */
export function getBaseUrl(): string {
  // Use environment variable if set
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Server-side fallback
  if (typeof window === 'undefined') {
    return process.env.NODE_ENV === 'production'
      ? 'https://launch-kit.vercel.app' // Your production URL as fallback
      : 'http://localhost:3000';
  }

  // Client-side fallback
  return window.location.origin;
}
