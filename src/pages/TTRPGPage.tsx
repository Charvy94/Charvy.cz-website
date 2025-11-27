import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';

export function TTRPGPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('server');

  const categories = [
    { id: 'server', label: t('ttrpg.server') },
    { id: 'login', label: t('ttrpg.login') },
    { id: 'characters', label: t('ttrpg.characters') }
  ];

  const themeColor = 'hsl(0, 84%, 51%)';

  return (
    <>
      <StickySubmenu
        visible={true}
        categories={categories}
        activeCategory={activeTab}
        onCategoryChange={setActiveTab}
        themeColor={themeColor}
      />
      
      <div className="min-h-[70vh]">
        <div className="border-b-4 border-ttrpg-secondary pb-6 mb-8">
          <h1 className="text-4xl font-bold text-ttrpg-primary">{t('ttrpg.title')}</h1>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 border-2 border-ttrpg-secondary rounded-md font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-ttrpg-secondary text-white'
                  : 'text-ttrpg-primary hover:shadow-md'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
          {activeTab === 'server' && (
            <div>
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
          )}

          {activeTab === 'login' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('ttrpg.loginTitle')}</h2>
              <p className="text-muted-foreground mb-4">{t('ttrpg.loginDesc')}</p>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-muted-foreground">{t('ttrpg.loginForm')}</p>
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div>
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
          )}
        </div>
      </div>
    </>
  );
}
