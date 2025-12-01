import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowUp } from 'lucide-react';

interface StickySubmenuProps {
  visible: boolean;
  categories: Array<{ id: string; label: string }>;
  themeColor: string;
  sectionId: string;
  forceVisible?: boolean;
}

export function StickySubmenu({
  visible,
  categories,
  themeColor,
  sectionId,
  forceVisible = false
}: StickySubmenuProps) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSubsection = (subsectionId: string) => {
    const element = document.getElementById(`${sectionId}-${subsectionId}`);
    if (element) {
      const headerOffset = 120; // Account for both header and sticky submenu
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!visible || (!isScrolled && !forceVisible)) return null;

  return (
    <div
      className="fixed left-0 right-0 bg-background border-b-2 shadow-md z-40 animate-in slide-in-from-top duration-300"
      style={{ 
        top: '60px',
        borderBottomColor: themeColor 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-3 flex-wrap items-center justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSubsection(cat.id)}
              className="px-4 py-2 rounded border text-sm font-medium transition-all hover:shadow-md"
              style={{
                borderColor: themeColor,
                color: themeColor,
                backgroundColor: 'transparent'
              }}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={scrollToTop}
            className="ml-2 px-4 py-2 rounded border text-sm font-medium transition-all hover:shadow-md flex items-center gap-1"
            style={{
              borderColor: themeColor,
              color: themeColor
            }}
          >
            <ArrowUp size={14} />
            {t('toTop')}
          </button>
        </div>
      </div>
    </div>
  );
}
