/**
 * Product categories
 */
export const PRODUCT_CATEGORIES = {
  MINIATURES: 'miniatures',
  BESTSELLERS: 'bestsellers',
  NEW: 'new',
  DEALS: 'deals',
} as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES];

/**
 * CMS types
 */
export const CMS_TYPES = {
  WORDPRESS: 'wordpress',
  JOOMLA: 'joomla',
} as const;

export type CMSType = typeof CMS_TYPES[keyof typeof CMS_TYPES];
