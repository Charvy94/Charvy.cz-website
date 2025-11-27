import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">{t('footer.copy')}</p>
          <nav className="flex gap-6">
            <Link to="/legal/terms" className="hover:opacity-80 transition-opacity">
              {t('legal.terms')}
            </Link>
            <Link to="/legal/privacy" className="hover:opacity-80 transition-opacity">
              {t('legal.privacy')}
            </Link>
            <Link to="/legal/contact" className="hover:opacity-80 transition-opacity">
              {t('legal.contact')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
