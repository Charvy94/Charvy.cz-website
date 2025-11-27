import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';

export default function TTRPG() {
  const { t } = useTranslation();

  return (
    <>
      <StickySubmenu 
        visible={true}
        sectionId="ttrpg"
        categories={[
          { id: 'server', label: t('ttrpg.server') },
          { id: 'login', label: t('ttrpg.login') },
          { id: 'characters', label: t('ttrpg.characters') }
        ]}
        themeColor="hsl(0, 84%, 51%)"
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-b-4 border-ttrpg-secondary pb-6 mb-8">
          <h1 className="text-4xl font-bold text-ttrpg-primary">{t('ttrpg.title')}</h1>
        </div>

        {/* Server Subsection */}
        <div id="ttrpg-server" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('ttrpg.serverTitle')}</h2>
          <p className="text-muted-foreground mb-6">{t('ttrpg.serverDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: t('ttrpg.rules'), desc: t('ttrpg.rulesDesc') },
              { title: t('ttrpg.players'), desc: t('ttrpg.playersDesc') },
              { title: t('ttrpg.last'), desc: t('ttrpg.lastDesc') }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Login Subsection */}
        <div id="ttrpg-login" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('ttrpg.loginTitle')}</h2>
          <p className="text-muted-foreground mb-4">{t('ttrpg.loginDesc')}</p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-muted-foreground">{t('ttrpg.loginForm')}</p>
          </div>
        </div>

        {/* Characters Subsection */}
        <div id="ttrpg-characters" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('ttrpg.charactersTitle')}</h2>
          <p className="text-muted-foreground mb-6">{t('ttrpg.charactersDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: t('ttrpg.char1'), desc: t('ttrpg.char1Desc') },
              { title: t('ttrpg.char2'), desc: t('ttrpg.char2Desc') }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
