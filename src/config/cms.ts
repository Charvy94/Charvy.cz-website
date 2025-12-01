import { CMSConfig } from '@/types/blog';

/**
 * CMS Configuration
 * 
 * To connect your WordPress or Joomla site:
 * 1. Set 'enabled' to true
 * 2. Choose your CMS type: 'wordpress' or 'joomla'
 * 3. Enter your site URL (without /wp-json or /api)
 * 
 * WordPress example: { type: 'wordpress', apiUrl: 'https://your-site.com', enabled: true }
 * Joomla example: { type: 'joomla', apiUrl: 'https://your-joomla-site.com', enabled: true }
 */
export const CMS_CONFIG: CMSConfig = {
  type: 'wordpress',
  apiUrl: '', // Add your CMS URL here
  enabled: false, // Set to true to enable CMS integration
};
