import { SEO } from '@/components/SEO';
import { useTranslation } from '@/hooks/useTranslation';
import { DevAlert } from '@/components/DevAlert';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Github } from 'lucide-react';

export default function SocialNetworks() {
  const { t } = useTranslation();

  const socialPlatforms = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-sky-500' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:text-red-500' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-600' },
    { name: 'GitHub', icon: Github, url: '#', color: 'hover:text-gray-400' },
  ];

  return (
    <>
      <SEO 
        title={t('socialNetworks.title')}
        description={t('socialNetworks.description')}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {t('socialNetworks.title')}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {t('socialNetworks.description')}
          </p>

          {/* Development Alert */}
          <DevAlert />

          <div className="bg-card border border-border rounded-lg p-12 shadow-lg">
            <p className="text-muted-foreground mb-8">
              {t('socialNetworks.comingSoon')}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  className={`flex flex-col items-center gap-3 p-6 rounded-lg border border-border transition-all ${platform.color} hover:scale-105 hover:shadow-md opacity-50 cursor-not-allowed`}
                  aria-disabled="true"
                  onClick={(e) => e.preventDefault()}
                >
                  <platform.icon size={40} />
                  <span className="font-medium">{platform.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
