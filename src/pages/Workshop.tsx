import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { sampleProducts } from '@/data/products';
import { Product } from '@/types/product';
import { useState } from 'react';

export default function Workshop() {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const miniaturesProducts = sampleProducts.filter(p => p.category === 'miniatures');
  const bestsellersProducts = sampleProducts.filter(p => p.category === 'bestsellers');
  const newProducts = sampleProducts.filter(p => p.category === 'new');

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

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button
            onClick={() => {
              const element = document.getElementById('workshop-products');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-workshop-secondary rounded-md font-semibold transition-all hover:bg-workshop-secondary hover:text-white"
            style={{ color: 'hsl(24, 95%, 53%)' }}
          >
            {t('workshop.products')}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('workshop-bestsellers');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-workshop-secondary rounded-md font-semibold transition-all hover:bg-workshop-secondary hover:text-white"
            style={{ color: 'hsl(24, 95%, 53%)' }}
          >
            {t('workshop.bestsellers')}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('workshop-order');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-workshop-secondary rounded-md font-semibold transition-all hover:bg-workshop-secondary hover:text-white"
            style={{ color: 'hsl(24, 95%, 53%)' }}
          >
            {t('workshop.order')}
          </button>
        </div>

        {/* Products Subsection */}
        <div id="workshop-products" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('workshop.productsTitle')}</h2>
          <p className="text-muted-foreground mb-6">{t('workshop.productsDesc')}</p>
          
          <div className="space-y-8">
            {/* Miniatures */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('workshop.miniatures')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {miniaturesProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </div>

            {/* New Products */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('workshop.new')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bestsellers Subsection */}
        <div id="workshop-bestsellers" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('workshop.bestsellersTitle')}</h2>
          <p className="text-muted-foreground mb-6">{t('workshop.bestsellersDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestsellersProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => handleProductClick(product)}
              />
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

      <ProductModal 
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
