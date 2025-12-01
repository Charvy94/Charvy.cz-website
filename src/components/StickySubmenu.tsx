import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StickySubmenuProps {
  visible: boolean;
  categories: Array<{ id: string; label: string }>;
  variant: 'photo' | 'workshop' | 'blog' | 'ttrpg';
  sectionId: string;
  forceVisible?: boolean;
}

export function StickySubmenu({
  visible,
  categories,
  variant,
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
      className={cn(
        "fixed left-0 right-0 bg-card/95 backdrop-blur-md border-b-2 shadow-lg z-40 animate-in slide-in-from-top duration-300 top-[60px]",
        variant === 'photo' && 'border-photo-secondary',
        variant === 'workshop' && 'border-workshop-primary',
        variant === 'blog' && 'border-blog-accent',
        variant === 'ttrpg' && 'border-ttrpg-secondary'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-3 flex-wrap items-center justify-center">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => scrollToSubsection(cat.id)}
              variant={variant}
              size="sm"
            >
              {cat.label}
            </Button>
          ))}
          <Button
            onClick={scrollToTop}
            variant={variant}
            size="sm"
            className="ml-2"
          >
            <ArrowUp size={14} />
            {t('toTop')}
          </Button>
        </div>
      </div>
    </div>
  );
}
