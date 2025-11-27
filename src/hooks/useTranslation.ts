import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return { t, language };
}
