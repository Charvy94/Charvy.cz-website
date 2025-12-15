import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { logoutUser } from '@/services/authApi';
import { Language, mainLanguages, otherLanguages, languageNames } from '@/lib/translations';
import { Menu, X, Moon, Sun, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate('/');
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

        <div className="hidden lg:flex items-center gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex gap-6">
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
            {mainLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-12 px-3 py-1 rounded font-semibold transition-all ${
                  language === lang
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-white/20'
                }`}
                aria-label={`Switch to ${languageNames[lang]}`}
                aria-pressed={language === lang}
              >
                {lang.toUpperCase()}
              </button>
            ))}
            
            {/* Others dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded font-semibold transition-all ${
                    otherLanguages.includes(language)
                      ? 'bg-primary-foreground text-primary'
                      : 'hover:bg-white/20'
                  }`}
                  aria-label="Other languages"
                >
                  {otherLanguages.includes(language) ? language.toUpperCase() : '...'}
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border border-border z-50">
                {otherLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`cursor-pointer ${language === lang ? 'bg-accent' : ''}`}
                  >
                    {languageNames[lang]} ({lang.toUpperCase()})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-all"
              >
                <User size={18} />
                <span className="font-medium">{user?.username}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-white/10"
              >
                <LogOut size={18} className="mr-1" />
                {t('auth.logout')}
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <LogIn size={18} className="mr-1" />
                {t('auth.login')}
              </Button>
            </Link>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-primary border-t border-primary-foreground/20">
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
          <div className="flex flex-col gap-4 pb-4 px-6">
            <div className="flex justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-primary-foreground hover:bg-white/10"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
              <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Language selection">
                {mainLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-14 px-3 py-2 rounded font-semibold transition-all ${
                      language === lang
                        ? 'bg-primary-foreground text-primary'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    aria-label={`Switch to ${languageNames[lang]}`}
                    aria-pressed={language === lang}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
                
                {/* Others dropdown for mobile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded font-semibold transition-all ${
                        otherLanguages.includes(language)
                          ? 'bg-primary-foreground text-primary'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      aria-label="Other languages"
                    >
                      {otherLanguages.includes(language) ? language.toUpperCase() : '...'}
                      <ChevronDown size={14} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-card border border-border z-50">
                    {otherLanguages.map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`cursor-pointer ${language === lang ? 'bg-accent' : ''}`}
                      >
                        {languageNames[lang]} ({lang.toUpperCase()})
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {isAuthenticated ? (
              <div className="flex justify-center gap-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-all"
                >
                  <User size={18} />
                  <span className="font-medium">{user?.username}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <LogOut size={18} className="mr-1" />
                  {t('auth.logout')}
                </Button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="flex justify-center">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                  <LogIn size={18} className="mr-1" />
                  {t('auth.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
