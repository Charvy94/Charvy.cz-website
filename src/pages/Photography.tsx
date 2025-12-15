import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';
import { PageNavButton } from '@/components/PageNavButton';
import { PageSection } from '@/components/PageSection';
import { Carousel } from '@/components/Carousel';
import { ContactForm } from '@/components/ContactForm';
import { UnderConstruction } from '@/components/UnderConstruction';
import { SEO } from '@/components/SEO';
import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Photography() {
  const { t } = useTranslation();
  const [showGallerySubmenu, setShowGallerySubmenu] = useState(false);
  const [isSubmenuCollapsed, setIsSubmenuCollapsed] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Charvy.cz - Fotografování",
    "description": "Profesionální fotografování - rodinné focení, portréty, produktové foto, svatby",
    "url": "https://charvy.cz/photography",
    "image": "https://charvy.cz/photography-hero.jpg",
    "priceRange": "500 Kč - 15000 Kč",
    "areaServed": "CZ",
    "serviceType": ["Photography", "Portrait Photography", "Wedding Photography", "Product Photography"]
  };

  useEffect(() => {
    const handleScroll = () => {
      const gallerySection = document.getElementById('photography-gallery');
      const aboutSection = document.getElementById('photography-about');
      
      if (gallerySection && aboutSection) {
        const galleryRect = gallerySection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();
        
        const isInGallery = galleryRect.top < 200 && aboutRect.top > 200;
        setShowGallerySubmenu(isInGallery);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const placeholderImages = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1543342384-1f1350e27861?w=800'
  ];

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
        title="Fotografování"
        description="Profesionální fotografování - rodinné focení od 2500 Kč, portréty od 1500 Kč, produktové foto od 500 Kč, svatby od 15000 Kč"
        structuredData={structuredData}
      />
      <StickySubmenu
        visible={true}
        sectionId="photography"
        variant="photo"
        categories={[
          { id: 'gallery', label: t('photography.gallery') },
          { id: 'about', label: t('photography.about') },
          { id: 'contact', label: t('photography.contact') }
        ]}
        forceVisible={showGallerySubmenu}
      />

      {/* Gallery category submenu - shows when scrolling through gallery */}
      {showGallerySubmenu && (
        <div className="fixed top-[120px] left-0 right-0 z-40 bg-card/95 backdrop-blur-md shadow-lg border-b-2 border-photo-secondary">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Toggle button */}
            <div className="flex justify-center mb-2">
              <Button
                onClick={() => setIsSubmenuCollapsed(!isSubmenuCollapsed)}
                variant="ghost"
                size="sm"
                className="text-photo-primary text-xs px-2 py-1 h-auto"
              >
                {isSubmenuCollapsed ? (
                  <>
                    <ChevronDown size={16} className="mr-1" />
                    {t('photography.showCategories')}
                  </>
                ) : (
                  <>
                    <ChevronUp size={16} className="mr-1" />
                    {t('photography.hideCategories')}
                  </>
                )}
              </Button>
            </div>
            
            {/* Categories - collapsible */}
            <div className={`flex gap-3 justify-center flex-wrap ${isSubmenuCollapsed ? 'hidden' : ''}`}>
              {[
                { id: 'family', label: t('photography.family') },
                { id: 'weddings', label: t('photography.weddings') },
                { id: 'portraits', label: t('photography.portraits') },
                { id: 'nature', label: t('photography.nature') },
                { id: 'nightsky', label: t('photography.nightsky') },
                { id: 'products', label: t('photography.products') },
                { id: 'sports', label: t('photography.sports') }
              ].map((item) => (
                <PageNavButton
                  key={item.id}
                  onClick={() => scrollToSection(`photography-gallery-${item.id}`)}
                  variant="photo"
                >
                  {item.label}
                </PageNavButton>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="relative max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-photo-primary via-photo-secondary to-photo-primary/80 p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-photo-light rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h1 className="text-white mb-4">{t('photography.title')}</h1>
            <p className="text-white/90 text-xl max-w-2xl">Zachycuji okamžiky, které vyprávějí příběhy</p>
          </div>
        </div>

        {/* Under Construction Notice */}
        <div className="mb-12">
          <UnderConstruction pageName="Fotografování" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-12 flex-wrap justify-center animate-slide-up">
          <PageNavButton onClick={() => scrollToSection('photography-gallery')} variant="photo">
            {t('photography.gallery')}
          </PageNavButton>
          <PageNavButton onClick={() => scrollToSection('photography-about')} variant="photo">
            {t('photography.about')}
          </PageNavButton>
          <PageNavButton onClick={() => scrollToSection('photography-contact')} variant="photo">
            {t('photography.contact')}
          </PageNavButton>
        </div>

        {/* Gallery Subsection */}
        <PageSection
          id="photography-gallery"
          title={t('photography.gallery')}
          variant="photo"
        >
          <div id="photography-gallery-family" className="mb-8">
            <Carousel
              images={placeholderImages}
              title={t('photography.family')}
              description={t('photography.familyDesc')}
            />
          </div>
          
          <div id="photography-gallery-weddings" className="mb-8">
            <Carousel
              images={placeholderImages}
              title={t('photography.weddings')}
              description={t('photography.weddingsDesc')}
            />
          </div>
          
          <div id="photography-gallery-portraits" className="mb-8">
            <Carousel
              images={placeholderImages}
              title={t('photography.portraits')}
              description={t('photography.portraitsDesc')}
            />
          </div>
          
          <div id="photography-gallery-nature" className="mb-8">
            <Carousel
              images={placeholderImages}
              title={t('photography.nature')}
              description={t('photography.natureDesc')}
            />
          </div>
          
          <div id="photography-gallery-nightsky" className="mb-8">
            <Carousel
              images={placeholderImages}
              title={t('photography.nightsky')}
              description={t('photography.nightskyDesc')}
            />
          </div>
          
          <div id="photography-gallery-products" className="mb-8">
            <Carousel
              images={placeholderImages}
              title={t('photography.products')}
              description={t('photography.productsDesc')}
            />
          </div>
          
          <div id="photography-gallery-sports" className="mb-8">
            <Carousel
              images={placeholderImages}
              title={t('photography.sports')}
              description={t('photography.sportsDesc')}
            />
          </div>
        </PageSection>

        {/* About Subsection */}
        <PageSection
          id="photography-about"
          title={t('photography.aboutTitle')}
          description={t('photography.aboutDesc')}
          variant="photo"
        />

        {/* Contact Subsection */}
        <PageSection
          id="photography-contact"
          title={t('photography.contactTitle')}
          description={t('photography.contactDesc')}
          variant="photo"
        >
          <ContactForm variant="photo" subject="Fotografování - Nová poptávka" />
        </PageSection>
      </main>
    </>
  );
}
