import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';
import { PageNavButton } from '@/components/PageNavButton';
import { PageSection } from '@/components/PageSection';
import { SEO } from '@/components/SEO';
import { UnderConstruction } from '@/components/UnderConstruction';

export default function TTRPG() {
  const { t } = useTranslation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Charvy.cz - TTRPG D&D Server",
    "description": "D&D 5E server s vlastními pravidly pro nadšence do stolních RPG her",
    "url": "https://charvy.cz/ttrpg"
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO 
        title="TTRPG - D&D Server"
        description="D&D 5E server s vlastními pravidly. Přidej se k 35+ hráčům a zahraj si epická dobrodružství v fantasy světě."
        structuredData={structuredData}
      />
      <StickySubmenu
        visible={true}
        sectionId="ttrpg"
        variant="ttrpg"
        categories={[
          { id: 'server', label: t('ttrpg.server') },
          { id: 'login', label: t('ttrpg.login') },
          { id: 'characters', label: t('ttrpg.characters') }
        ]}
      />

      <main className="relative max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-ttrpg-primary via-ttrpg-secondary to-ttrpg-primary/80 p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-ttrpg-light rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h1 className="text-white mb-4">{t('ttrpg.title')}</h1>
            <p className="text-white/90 text-xl max-w-2xl">Vstupte do světa fantasy a dobrodružství</p>
          </div>
        </div>

        {/* Under Construction Notice */}
        <div className="mb-12">
          <UnderConstruction pageName="TTRPG" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-12 flex-wrap justify-center animate-slide-up">
          <PageNavButton onClick={() => scrollToSection('ttrpg-server')} variant="ttrpg">
            {t('ttrpg.server')}
          </PageNavButton>
          <PageNavButton onClick={() => scrollToSection('ttrpg-login')} variant="ttrpg">
            {t('ttrpg.login')}
          </PageNavButton>
          <PageNavButton onClick={() => scrollToSection('ttrpg-characters')} variant="ttrpg">
            {t('ttrpg.characters')}
          </PageNavButton>
        </div>

        {/* Server Subsection */}
        <PageSection
          id="ttrpg-server"
          title={t('ttrpg.serverTitle')}
          description={t('ttrpg.serverDesc')}
          variant="ttrpg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: t('ttrpg.rules'), desc: t('ttrpg.rulesDesc') },
              { title: t('ttrpg.players'), desc: t('ttrpg.playersDesc') },
              { title: t('ttrpg.last'), desc: t('ttrpg.lastDesc') }
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-ttrpg-secondary/20">
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* Login Subsection */}
        <PageSection
          id="ttrpg-login"
          title={t('ttrpg.loginTitle')}
          description={t('ttrpg.loginDesc')}
          variant="ttrpg"
        >
          <div className="bg-card p-8 rounded-xl border-2 border-ttrpg-secondary/30 shadow-lg">
            <p className="text-muted-foreground text-lg">{t('ttrpg.loginForm')}</p>
          </div>
        </PageSection>

        {/* Characters Subsection */}
        <PageSection
          id="ttrpg-characters"
          title={t('ttrpg.charactersTitle')}
          description={t('ttrpg.charactersDesc')}
          variant="ttrpg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: t('ttrpg.char1'), desc: t('ttrpg.char1Desc') },
              { title: t('ttrpg.char2'), desc: t('ttrpg.char2Desc') }
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-ttrpg-secondary/20">
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </main>
    </>
  );
}
