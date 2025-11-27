import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/lib/translations';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const navItems = [
    { id: '/', label: t('nav.home') },
    { id: '/photography', label: t('nav.photography') },
    { id: '/workshop', label: t('nav.workshop') },
    { id: '/blog', label: t('nav.blog') },
    { id: '/ttrpg', label: t('nav.ttrpg') }
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <Link 
          to="/"
          className="text-xl font-bold tracking-widest hover:opacity-80 transition-opacity"
        >
          Charvy.cz
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.id}
                    className={`font-medium pb-2 px-3 border-b-2 transition-all ${
                      location.pathname === item.id
                        ? 'border-primary-foreground'
                        : 'border-transparent hover:border-primary-foreground/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-2 bg-white/10 p-2 rounded-md">
            {(['cs', 'en', 'de'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-12 px-3 py-1 rounded font-semibold transition-all ${
                  language === lang
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-white/20'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/20">
          <nav className="py-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.id}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full text-left px-6 py-3 font-medium transition-all ${
                      location.pathname === item.id
                        ? 'bg-white/20'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-center gap-2 pb-4 px-6">
            {(['cs', 'en', 'de'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-16 px-3 py-2 rounded font-semibold transition-all ${
                  language === lang
                    ? 'bg-primary-foreground text-primary'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
