import { useTranslation } from '@/hooks/useTranslation';
import { SEO } from '@/components/SEO';
import { socialAccounts } from '@/config/social';
import { Camera, Wrench, User } from 'lucide-react';

const accountTypeIcons = {
  personal: User,
  photography: Camera,
  workshop: Wrench
};

const accountTypeColors = {
  personal: 'from-primary to-primary/80',
  photography: 'from-photo-primary to-photo-secondary',
  workshop: 'from-workshop-primary to-workshop-secondary'
};

export default function Links() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title="Sociální sítě a kontakty - Charvy.cz"
        description="Všechny moje sociální sítě a kontakty na jednom místě. Sledujte mě na Facebooku, Instagramu a dalších platformách."
      />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
              <span className="text-4xl font-bold text-primary-foreground">C</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Charvy.cz</h1>
            <p className="text-muted-foreground text-lg">
              Všechny moje sociální sítě na jednom místě
            </p>
          </div>

          {/* Social Accounts by Type */}
          <div className="space-y-8">
            {socialAccounts.map((account, index) => {
              const TypeIcon = accountTypeIcons[account.type];
              const gradientColor = accountTypeColors[account.type];
              
              return (
                <div 
                  key={account.type}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${gradientColor}`}>
                      <TypeIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold capitalize">
                      {account.type === 'personal' && 'Osobní účty'}
                      {account.type === 'photography' && 'Fotografování'}
                      {account.type === 'workshop' && '3D Tisk Workshop'}
                    </h2>
                  </div>

                  {/* Links */}
                  <div className="space-y-3">
                    {account.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            group block w-full p-5
                            bg-card hover:bg-accent
                            border-2 border-border hover:border-primary
                            rounded-2xl
                            transition-all duration-300
                            hover:scale-[1.02] hover:shadow-lg
                          "
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-muted group-hover:bg-primary/10 rounded-xl transition-colors">
                              <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {link.label}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {link.platform === 'email' ? link.url.replace('mailto:', '') : `@${account.type}`}
                              </p>
                            </div>
                            <svg 
                              className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p>Sledujte mě a buďte v kontaktu! 🚀</p>
          </div>
        </div>
      </main>
    </>
  );
}
