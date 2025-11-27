import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowUp } from 'lucide-react';

interface StickySubmenuProps {
  visible: boolean;
  categories: Array<{ id: string; label: string }>;
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  themeColor: string;
}

export function StickySubmenu({
  visible,
  categories,
  activeCategory,
  onCategoryChange,
  themeColor
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

  if (!visible || !isScrolled) return null;

  return (
    <div
      className="fixed left-0 right-0 bg-background border-b-2 shadow-md z-40 animate-in slide-in-from-top duration-300"
      style={{ 
        top: '60px',
        borderBottomColor: themeColor 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex gap-2 flex-wrap items-center justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded border text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'text-white'
                  : 'bg-transparent hover:shadow-md'
              }`}
              style={{
                borderColor: themeColor,
                color: activeCategory === cat.id ? 'white' : themeColor,
                backgroundColor: activeCategory === cat.id ? themeColor : 'transparent'
              }}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={scrollToTop}
            className="ml-2 px-3 py-1.5 rounded border text-sm font-medium transition-all hover:shadow-md flex items-center gap-1"
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
