import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/lib/translations';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginModal from '@/components/LoginModal';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
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
          aria-label="Charvy.cz homepage"
        >
          Charvy.cz
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav aria-label="Main navigation">
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
                    aria-current={location.pathname === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-primary-foreground hover:bg-white/10"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          <div className="flex gap-2 bg-white/10 p-2 rounded-md" role="group" aria-label="Language selection">
            {(['cs', 'en', 'de'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-12 px-3 py-1 rounded font-semibold transition-all ${
                  language === lang
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-white/20'
                }`}
                aria-label={`Switch to ${lang === 'cs' ? 'Czech' : lang === 'en' ? 'English' : 'German'}`}
                aria-pressed={language === lang}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">{user?.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-primary-foreground hover:bg-white/10"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoginModalOpen(true)}
              className="text-primary-foreground hover:bg-white/10 gap-2"
            >
              <User size={18} />
              Login
            </Button>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-primary border-t border-primary-foreground/20">
          <nav aria-label="Mobile navigation" className="py-4">
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
                    aria-current={location.pathname === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-center gap-4 pb-4 px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-primary-foreground hover:bg-white/10"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          <div className="flex gap-2" role="group" aria-label="Language selection">
              {(['cs', 'en', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-16 px-3 py-2 rounded font-semibold transition-all ${
                    language === lang
                      ? 'bg-primary-foreground text-primary'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label={`Switch to ${lang === 'cs' ? 'Czech' : lang === 'en' ? 'English' : 'German'}`}
                  aria-pressed={language === lang}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            
            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={logout}
                className="text-primary-foreground hover:bg-white/10 gap-2 w-full justify-center"
              >
                <LogOut size={18} />
                Logout ({user?.name})
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-primary-foreground hover:bg-white/10 gap-2 w-full justify-center"
              >
                <User size={18} />
                Login
              </Button>
            )}
          </div>
        </div>
      )}

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </header>
  );
}
