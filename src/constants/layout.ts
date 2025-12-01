/**
 * Layout constants used throughout the application
 */

export const LAYOUT = {
  HEADER_HEIGHT: 60,
  SCROLL_OFFSET: 120, // Header + sticky submenu
  STICKY_SUBMENU_TOP: 60,
  MAX_CONTENT_WIDTH: '1400px',
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  BASE: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
