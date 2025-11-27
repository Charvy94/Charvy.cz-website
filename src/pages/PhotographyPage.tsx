import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';

export function PhotographyPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('gallery');

  const categories = [
    { id: 'gallery', label: t('photography.gallery') },
    { id: 'about', label: t('photography.about') },
    { id: 'contact', label: t('photography.contact') }
  ];

  const themeColor = 'hsl(180, 47%, 50%)';

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
        <div className="border-b-4 border-photo-secondary pb-6 mb-8">
          <h1 className="text-4xl font-bold text-photo-primary">{t('photography.title')}</h1>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 border-2 border-photo-secondary rounded-md font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-photo-secondary text-white'
                  : 'text-photo-primary hover:shadow-md'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('photography.gallery')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: t('photography.family'), desc: t('photography.familyDesc') },
                  { title: t('photography.portraits'), desc: t('photography.portraitsDesc') },
                  { title: t('photography.products'), desc: t('photography.productsDesc') },
                  { title: t('photography.weddings'), desc: t('photography.weddingsDesc') }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('photography.aboutTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('photography.aboutDesc')}</p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('photography.contactTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('photography.contactDesc')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
