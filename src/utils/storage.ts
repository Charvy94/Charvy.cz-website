import { Language } from '@/lib/translations';

/**
 * Safe localStorage operations with validation
 */

const VALID_LANGUAGES: Language[] = ['cs', 'en', 'de'];
const VALID_THEMES = ['light', 'dark'] as const;

type Theme = typeof VALID_THEMES[number];

export const storage = {
  getLanguage: (): Language => {
    try {
      const saved = localStorage.getItem('language');
      if (saved && VALID_LANGUAGES.includes(saved as Language)) {
        return saved as Language;
      }
    } catch (error) {
      console.warn('Failed to read language from localStorage:', error);
    }
    return 'cs'; // default
  },

  setLanguage: (lang: Language): void => {
    try {
      if (VALID_LANGUAGES.includes(lang)) {
        localStorage.setItem('language', lang);
      }
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  },

  getTheme: (): Theme => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored && VALID_THEMES.includes(stored as Theme)) {
        return stored as Theme;
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }

    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  },

  setTheme: (theme: Theme): void => {
    try {
      if (VALID_THEMES.includes(theme)) {
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  },
};
