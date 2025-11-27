import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';

export default function Workshop() {
  const { t } = useTranslation();

  return (
    <>
      <StickySubmenu 
        visible={true}
        sectionId="workshop"
        categories={[
          { id: 'products', label: t('workshop.products') },
          { id: 'bestsellers', label: t('workshop.bestsellers') },
          { id: 'order', label: t('workshop.order') }
        ]}
        themeColor="hsl(24, 95%, 53%)"
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-b-4 border-workshop-secondary pb-6 mb-8">
          <h1 className="text-4xl font-bold text-workshop-primary">{t('workshop.title')}</h1>
        </div>

        {/* Products Subsection */}
        <div id="workshop-products" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('workshop.productsTitle')}</h2>
          <p className="text-muted-foreground mb-6">{t('workshop.productsDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: t('workshop.miniatures'), desc: t('workshop.miniaturesDesc') },
              { title: t('workshop.bestsellingModels'), desc: t('workshop.bestsellingModelsDesc') },
              { title: t('workshop.new'), desc: t('workshop.newDesc') }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bestsellers Subsection */}
        <div id="workshop-bestsellers" className="bg-white/80 rounded-lg p-8 mb-12">
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

        {/* Order Subsection */}
        <div id="workshop-order" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('workshop.orderTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{t('workshop.orderDesc')}</p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-muted-foreground">{t('workshop.orderEmail')}</p>
          </div>
        </div>
      </main>
    </>
  );
}
