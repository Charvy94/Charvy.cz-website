import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Header } from '@/components/Header';
import { StickySubmenu } from '@/components/StickySubmenu';
import { Carousel } from '@/components/Carousel';

type PageType = 'home' | 'photography' | 'workshop' | 'blog' | 'ttrpg' | 'legal';

function IndexContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [photoTab, setPhotoTab] = useState('gallery');
  const [workshopTab, setWorkshopTab] = useState('products');
  const [blogTab, setBlogTab] = useState('articles');
  const [ttrpgTab, setTtrpgTab] = useState('server');
  const [legalTab, setLegalTab] = useState('terms');
  
  const { t } = useTranslation();

  // Placeholder images for carousels - in real use, these would be actual image URLs
  const placeholderImages = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1543342384-1f1350e27861?w=800'
  ];

  const getSubmenuConfig = () => {
    switch (currentPage) {
      case 'photography':
        return {
          visible: true,
          categories: [
            { id: 'gallery', label: t('photography.gallery') },
            { id: 'about', label: t('photography.about') },
            { id: 'contact', label: t('photography.contact') }
          ],
          activeCategory: photoTab,
          onCategoryChange: setPhotoTab,
          themeColor: 'hsl(180, 47%, 50%)'
        };
      case 'workshop':
        return {
          visible: true,
          categories: [
            { id: 'products', label: t('workshop.products') },
            { id: 'bestsellers', label: t('workshop.bestsellers') },
            { id: 'order', label: t('workshop.order') }
          ],
          activeCategory: workshopTab,
          onCategoryChange: setWorkshopTab,
          themeColor: 'hsl(24, 95%, 53%)'
        };
      case 'blog':
        return {
          visible: true,
          categories: [
            { id: 'articles', label: t('blog.articles') },
            { id: 'archive', label: t('blog.archive') },
            { id: 'about', label: t('blog.about') }
          ],
          activeCategory: blogTab,
          onCategoryChange: setBlogTab,
          themeColor: 'hsl(180, 47%, 50%)'
        };
      case 'ttrpg':
        return {
          visible: true,
          categories: [
            { id: 'server', label: t('ttrpg.server') },
            { id: 'login', label: t('ttrpg.login') },
            { id: 'characters', label: t('ttrpg.characters') }
          ],
          activeCategory: ttrpgTab,
          onCategoryChange: setTtrpgTab,
          themeColor: 'hsl(0, 84%, 51%)'
        };
      case 'legal':
        return {
          visible: true,
          categories: [
            { id: 'terms', label: t('legal.terms') },
            { id: 'privacy', label: t('legal.privacy') },
            { id: 'contact', label: t('legal.contact') }
          ],
          activeCategory: legalTab,
          onCategoryChange: setLegalTab,
          themeColor: 'hsl(0, 0%, 40%)'
        };
      default:
        return { visible: false, categories: [], activeCategory: '', onCategoryChange: () => {}, themeColor: '' };
    }
  };

  const submenuConfig = getSubmenuConfig();

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage as (page: string) => void} />
      
      <StickySubmenu {...submenuConfig} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="min-h-[70vh] animate-in fade-in duration-300">
            <div className="border-b-4 border-secondary pb-6 mb-8">
              <h1 className="text-4xl font-bold">{t('home.title')}</h1>
            </div>
            
            <div className="bg-white/80 rounded-lg p-8">
              <p className="text-muted-foreground text-lg mb-8">{t('home.intro')}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'photography', title: t('home.photoCard'), desc: t('home.photoDesc'), gradient: 'from-photo-secondary to-photo-primary' },
                  { id: 'workshop', title: t('home.workshopCard'), desc: t('home.workshopDesc'), gradient: 'from-workshop-secondary to-workshop-primary' },
                  { id: 'blog', title: t('home.blogCard'), desc: t('home.blogDesc'), gradient: 'from-blog-accent to-blog-primary' },
                  { id: 'ttrpg', title: t('home.ttrpgCard'), desc: t('home.ttrpgDesc'), gradient: 'from-ttrpg-secondary to-ttrpg-primary' }
                ].map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setCurrentPage(card.id as PageType)}
                    className={`bg-gradient-to-br ${card.gradient} p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 hover:shadow-xl`}
                  >
                    <h3 className="text-white text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-white/90">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY PAGE */}
        {currentPage === 'photography' && (
          <div className="min-h-[70vh] animate-in fade-in duration-300">
            <div className="border-b-4 border-photo-secondary pb-6 mb-8">
              <h1 className="text-4xl font-bold text-photo-primary">{t('photography.title')}</h1>
            </div>

            <div className="flex gap-4 mb-8 flex-wrap">
              {submenuConfig.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPhotoTab(cat.id)}
                  className={`px-6 py-3 border-2 border-photo-secondary rounded-md font-semibold transition-all ${
                    photoTab === cat.id ? 'bg-photo-secondary text-white' : 'text-photo-primary hover:shadow-md'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
              {photoTab === 'gallery' && (
                <div>
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
              )}

              {photoTab === 'about' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('photography.aboutTitle')}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t('photography.aboutDesc')}</p>
                </div>
              )}

              {photoTab === 'contact' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('photography.contactTitle')}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t('photography.contactDesc')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* WORKSHOP PAGE */}
        {currentPage === 'workshop' && (
          <div className="min-h-[70vh] animate-in fade-in duration-300">
            <div className="border-b-4 border-workshop-secondary pb-6 mb-8">
              <h1 className="text-4xl font-bold text-workshop-primary">{t('workshop.title')}</h1>
            </div>

            <div className="flex gap-4 mb-8 flex-wrap">
              {submenuConfig.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setWorkshopTab(cat.id)}
                  className={`px-6 py-3 border-2 border-workshop-secondary rounded-md font-semibold transition-all ${
                    workshopTab === cat.id ? 'bg-workshop-secondary text-white' : 'text-workshop-primary hover:shadow-md'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
              {workshopTab === 'products' && (
                <div>
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
              )}

              {workshopTab === 'bestsellers' && (
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

              {workshopTab === 'order' && (
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
        )}

        {/* BLOG PAGE */}
        {currentPage === 'blog' && (
          <div className="min-h-[70vh] animate-in fade-in duration-300">
            <div className="border-b-4 border-blog-accent pb-6 mb-8">
              <h1 className="text-4xl font-bold text-blog-primary">{t('blog.title')}</h1>
            </div>

            <div className="flex gap-4 mb-8 flex-wrap">
              {submenuConfig.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setBlogTab(cat.id)}
                  className={`px-6 py-3 border-2 border-blog-accent rounded-md font-semibold transition-all ${
                    blogTab === cat.id ? 'bg-blog-accent text-white' : 'text-blog-primary hover:shadow-md'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
              {blogTab === 'articles' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('blog.articlesTitle')}</h2>
                  <p className="text-muted-foreground mb-6">{t('blog.articlesDesc')}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: t('blog.article1'), desc: t('blog.article1Desc') },
                      { title: t('blog.article2'), desc: t('blog.article2Desc') },
                      { title: t('blog.article3'), desc: t('blog.article3Desc') }
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {blogTab === 'archive' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('blog.archiveTitle')}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t('blog.archiveDesc')}</p>
                </div>
              )}

              {blogTab === 'about' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('blog.aboutTitle')}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t('blog.aboutDesc')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TTRPG PAGE */}
        {currentPage === 'ttrpg' && (
          <div className="min-h-[70vh] animate-in fade-in duration-300">
            <div className="border-b-4 border-ttrpg-secondary pb-6 mb-8">
              <h1 className="text-4xl font-bold text-ttrpg-primary">{t('ttrpg.title')}</h1>
            </div>

            <div className="flex gap-4 mb-8 flex-wrap">
              {submenuConfig.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTtrpgTab(cat.id)}
                  className={`px-6 py-3 border-2 border-ttrpg-secondary rounded-md font-semibold transition-all ${
                    ttrpgTab === cat.id ? 'bg-ttrpg-secondary text-white' : 'text-ttrpg-primary hover:shadow-md'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
              {ttrpgTab === 'server' && (
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

              {ttrpgTab === 'login' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('ttrpg.loginTitle')}</h2>
                  <p className="text-muted-foreground mb-4">{t('ttrpg.loginDesc')}</p>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <p className="text-muted-foreground">{t('ttrpg.loginForm')}</p>
                  </div>
                </div>
              )}

              {ttrpgTab === 'characters' && (
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
        )}

        {/* LEGAL PAGE */}
        {currentPage === 'legal' && (
          <div className="min-h-[70vh] animate-in fade-in duration-300">
            <div className="border-b-4 pb-6 mb-8" style={{ borderColor: 'hsl(0, 0%, 40%)' }}>
              <h1 className="text-4xl font-bold" style={{ color: 'hsl(0, 0%, 40%)' }}>{t('legal.title')}</h1>
            </div>

            <div className="flex gap-4 mb-8 flex-wrap">
              {submenuConfig.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setLegalTab(cat.id)}
                  className="px-6 py-3 border-2 rounded-md font-semibold transition-all"
                  style={{
                    borderColor: 'hsl(0, 0%, 40%)',
                    backgroundColor: legalTab === cat.id ? 'hsl(0, 0%, 40%)' : 'transparent',
                    color: legalTab === cat.id ? 'white' : 'hsl(0, 0%, 40%)'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
              {legalTab === 'terms' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('legal.termsTitle')}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t('legal.termsIntro')}</p>
                </div>
              )}

              {legalTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy')}</h2>
                  <p className="text-muted-foreground leading-relaxed">Privacy policy content...</p>
                </div>
              )}

              {legalTab === 'contact' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('legal.contact')}</h2>
                  <p className="text-muted-foreground leading-relaxed">Contact information...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground py-8 text-center mt-12">
        <p>{t('footer.copy')}</p>
      </footer>
    </div>
  );
}

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
