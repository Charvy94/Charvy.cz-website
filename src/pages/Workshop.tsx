import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';
import { PageNavButton } from '@/components/PageNavButton';
import { PageSection } from '@/components/PageSection';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { ContactForm } from '@/components/ContactForm';
import { SEO } from '@/components/SEO';
import { DevAlert } from '@/components/DevAlert';
import { sampleProducts } from '@/data/products';
import { Product } from '@/types/product';
import { useState } from 'react';

export default function Workshop() {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Charvy.cz - 3D Tisk Workshop",
    "description": "Ručně vytvořené 3D modely a miniaturky pro stolní hry",
    "url": "https://charvy.cz/workshop",
    "image": "https://charvy.cz/workshop-hero.jpg",
    "offers": sampleProducts.map(product => ({
      "@type": "Offer",
      "name": product.name,
      "description": product.shortDescription,
      "price": product.price,
      "priceCurrency": "CZK",
      "availability": "https://schema.org/InStock",
      "url": `https://charvy.cz/workshop#${product.id}`
    }))
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
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
        title="3D Tisk Workshop"
        description="Ručně vytvořené 3D modely, miniaturky pro D&D a další stolní hry. Vysoce kvalitní 3D tisk na zakázku."
        type="product"
        structuredData={structuredData}
      />
      <StickySubmenu
        visible={true}
        sectionId="workshop"
        variant="workshop"
        categories={[
          { id: 'products', label: t('workshop.products') },
          { id: 'bestsellers', label: t('workshop.bestsellers') },
          { id: 'order', label: t('workshop.order') }
        ]}
      />

      <main className="relative max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        {/* Hero Section with gradient background */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-workshop-primary via-workshop-secondary to-workshop-primary/80 p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-workshop-light rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h1 className="text-white mb-4">{t('workshop.title')}</h1>
            <p className="text-white/90 text-xl max-w-2xl">Ruční výroba miniatur a doplňků pro vaše herní dobrodružství</p>
          </div>
        </div>

        {/* Development Alert */}
        <DevAlert />

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-12 flex-wrap justify-center animate-slide-up">
          <PageNavButton onClick={() => scrollToSection('workshop-products')} variant="workshop">
            {t('workshop.products')}
          </PageNavButton>
          <PageNavButton onClick={() => scrollToSection('workshop-bestsellers')} variant="workshop">
            {t('workshop.bestsellers')}
          </PageNavButton>
          <PageNavButton onClick={() => scrollToSection('workshop-order')} variant="workshop">
            {t('workshop.order')}
          </PageNavButton>
        </div>

        {/* Products Subsection */}
        <PageSection
          id="workshop-products"
          title={t('workshop.productsTitle')}
          description={t('workshop.productsDesc')}
          variant="workshop"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </PageSection>

        {/* Bestsellers Subsection */}
        <PageSection
          id="workshop-bestsellers"
          title={t('workshop.bestsellersTitle')}
          description={t('workshop.bestsellersDesc')}
          variant="workshop"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.filter(p => p.category === 'bestsellers').map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </PageSection>

        {/* Order Subsection */}
        <PageSection
          id="workshop-order"
          title={t('workshop.orderTitle')}
          description={t('workshop.orderDesc')}
          variant="workshop"
        >
          <ContactForm variant="workshop" subject="Workshop - Objednávka nebo poptávka" />
        </PageSection>
      </main>

      <ProductModal 
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
