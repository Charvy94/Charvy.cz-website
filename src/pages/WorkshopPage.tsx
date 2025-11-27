import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';

export function WorkshopPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('products');

  const categories = [
    { id: 'products', label: t('workshop.products') },
    { id: 'bestsellers', label: t('workshop.bestsellers') },
    { id: 'order', label: t('workshop.order') }
  ];

  const themeColor = 'hsl(24, 95%, 53%)';

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
        <div className="border-b-4 border-workshop-secondary pb-6 mb-8">
          <h1 className="text-4xl font-bold text-workshop-primary">{t('workshop.title')}</h1>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 border-2 border-workshop-secondary rounded-md font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-workshop-secondary text-white'
                  : 'text-workshop-primary hover:shadow-md'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
          {activeTab === 'products' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('workshop.productsTitle')}</h2>
              <p className="text-muted-foreground mb-6">{t('workshop.productsDesc')}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: t('workshop.miniatures'), desc: t('workshop.miniaturesDesc') },
                  { title: t('workshop.bestsellers'), desc: t('workshop.bestsellersDesc') },
                  { title: t('workshop.new'), desc: t('workshop.newDesc') }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bestsellers' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('workshop.bestsellersTitle')}</h2>
              <p className="text-muted-foreground mb-6">{t('workshop.bestsellersDesc')}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: t('workshop.bestsellingModels'), desc: t('workshop.bestsellingModelsDesc') },
                  { title: t('workshop.new'), desc: t('workshop.newDesc') },
                  { title: t('workshop.deals'), desc: t('workshop.dealsDesc') }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'order' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('workshop.orderTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('workshop.orderDesc')}</p>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-muted-foreground">{t('workshop.orderEmail')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
