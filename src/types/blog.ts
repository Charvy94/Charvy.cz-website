export type CMSType = 'wordpress' | 'joomla';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  featuredImage?: string;
  categories: string[];
  tags: string[];
  slug: string;
}

export interface CMSConfig {
  type: CMSType;
  apiUrl: string;
  enabled: boolean;
}

export const DEFAULT_CMS_CONFIG: CMSConfig = {
  type: 'wordpress',
  apiUrl: '',
  enabled: false,
};
