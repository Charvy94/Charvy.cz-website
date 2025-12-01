import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Camera, Wrench, PenTool, Dices, ExternalLink } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-8 mt-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Quick Links */}
          <Link to="/photography" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
            <Camera size={16} />
            {t('nav.photography')}
          </Link>
          <Link to="/workshop" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
            <Wrench size={16} />
            {t('nav.workshop')}
          </Link>
          <Link to="/blog" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
            <PenTool size={16} />
            {t('nav.blog')}
          </Link>
          <Link to="/ttrpg" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
            <Dices size={16} />
            {t('nav.ttrpg')}
          </Link>
          
          {/* Legal Links */}
          <Link to="/legal/terms" className="text-sm hover:text-accent transition-colors">
            {t('legal.terms')}
          </Link>
          <Link to="/legal/privacy" className="text-sm hover:text-accent transition-colors">
            {t('legal.privacy')}
          </Link>
          <Link to="/legal/contact" className="text-sm hover:text-accent transition-colors">
            {t('legal.contact')}
          </Link>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-4 border-t border-primary-foreground/20">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
            <p>© {new Date().getFullYear()} Charvy.cz</p>
            <span className="hidden md:inline">•</span>
            <a 
              href="/links" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-accent transition-colors group"
            >
              <span>Sociální sítě</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
