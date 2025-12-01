import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Camera, Wrench, PenTool, Dices } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-12 mt-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3 tracking-wider">Charvy.cz</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {t('footer.copy')}
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/photography" className="flex items-center justify-center gap-2 text-sm hover:text-accent transition-colors">
                <Camera size={16} />
                {t('nav.photography')}
              </Link>
              <Link to="/workshop" className="flex items-center justify-center gap-2 text-sm hover:text-accent transition-colors">
                <Wrench size={16} />
                {t('nav.workshop')}
              </Link>
              <Link to="/blog" className="flex items-center justify-center gap-2 text-sm hover:text-accent transition-colors">
                <PenTool size={16} />
                {t('nav.blog')}
              </Link>
              <Link to="/ttrpg" className="flex items-center justify-center gap-2 text-sm hover:text-accent transition-colors">
                <Dices size={16} />
                {t('nav.ttrpg')}
              </Link>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/legal/terms" className="text-sm hover:text-accent transition-colors">
                {t('legal.terms')}
              </Link>
              <Link to="/legal/privacy" className="text-sm hover:text-accent transition-colors">
                {t('legal.privacy')}
              </Link>
              <Link to="/legal/contact" className="text-sm hover:text-accent transition-colors">
                {t('legal.contact')}
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Charvy.cz • Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
