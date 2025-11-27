import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';

export function LegalPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('terms');

  const categories = [
    { id: 'terms', label: t('legal.terms') },
    { id: 'privacy', label: t('legal.privacy') },
    { id: 'contact', label: t('legal.contact') }
  ];

  const themeColor = 'hsl(0, 0%, 40%)';

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
        <div className="border-b-4 pb-6 mb-8" style={{ borderColor: themeColor }}>
          <h1 className="text-4xl font-bold" style={{ color: themeColor }}>{t('legal.title')}</h1>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 border-2 rounded-md font-semibold transition-all ${
                activeTab === cat.id ? 'text-white' : 'hover:shadow-md'
              }`}
              style={{
                borderColor: themeColor,
                backgroundColor: activeTab === cat.id ? themeColor : 'transparent',
                color: activeTab === cat.id ? 'white' : themeColor
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
          {activeTab === 'terms' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.termsTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('legal.termsIntro')}</p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy')}</h2>
              <p className="text-muted-foreground leading-relaxed">Privacy policy content...</p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.contact')}</h2>
              <p className="text-muted-foreground leading-relaxed">Contact information...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
