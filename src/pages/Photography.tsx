import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';
import { Carousel } from '@/components/Carousel';

export default function Photography() {
  const { t } = useTranslation();

  const placeholderImages = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1543342384-1f1350e27861?w=800'
  ];

  return (
    <>
      <StickySubmenu 
        visible={true}
        sectionId="photography"
        categories={[
          { id: 'gallery', label: t('photography.gallery') },
          { id: 'about', label: t('photography.about') },
          { id: 'contact', label: t('photography.contact') }
        ]}
        themeColor="hsl(180, 47%, 50%)"
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-b-4 border-photo-secondary pb-6 mb-8">
          <h1 className="text-4xl font-bold text-photo-primary">{t('photography.title')}</h1>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button
            onClick={() => {
              const element = document.getElementById('photography-gallery');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-photo-secondary rounded-md font-semibold transition-all hover:bg-photo-secondary hover:text-white"
            style={{ color: 'hsl(180, 47%, 50%)' }}
          >
            {t('photography.gallery')}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('photography-about');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-photo-secondary rounded-md font-semibold transition-all hover:bg-photo-secondary hover:text-white"
            style={{ color: 'hsl(180, 47%, 50%)' }}
          >
            {t('photography.about')}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('photography-contact');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-photo-secondary rounded-md font-semibold transition-all hover:bg-photo-secondary hover:text-white"
            style={{ color: 'hsl(180, 47%, 50%)' }}
          >
            {t('photography.contact')}
          </button>
        </div>

        {/* Gallery Subsection */}
        <div id="photography-gallery" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t('photography.gallery')}</h2>
          
          <Carousel
            images={placeholderImages}
            title={t('photography.family')}
            description={t('photography.familyDesc')}
          />
          
          <Carousel
            images={placeholderImages}
            title={t('photography.portraits')}
            description={t('photography.portraitsDesc')}
          />
          
          <Carousel
            images={placeholderImages}
            title={t('photography.products')}
            description={t('photography.productsDesc')}
          />
          
          <Carousel
            images={placeholderImages}
            title={t('photography.weddings')}
            description={t('photography.weddingsDesc')}
          />
        </div>

        {/* About Subsection */}
        <div id="photography-about" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('photography.aboutTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('photography.aboutDesc')}</p>
        </div>

        {/* Contact Subsection */}
        <div id="photography-contact" className="bg-white/80 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('photography.contactTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('photography.contactDesc')}</p>
        </div>
      </main>
    </>
  );
}
