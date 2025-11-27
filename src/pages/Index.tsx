import { LanguageProvider } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Header } from '@/components/Header';
import { StickySubmenu } from '@/components/StickySubmenu';
import { Carousel } from '@/components/Carousel';

function IndexContent() {
  const { t } = useTranslation();

  // Placeholder images for carousels
  const placeholderImages = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1543342384-1f1350e27861?w=800'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Photography Submenu */}
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

      {/* Workshop Submenu */}
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

      {/* Blog Submenu */}
      <StickySubmenu 
        visible={true}
        sectionId="blog"
        categories={[
          { id: 'articles', label: t('blog.articles') },
          { id: 'archive', label: t('blog.archive') },
          { id: 'about', label: t('blog.about') }
        ]}
        themeColor="hsl(180, 47%, 50%)"
      />

      {/* TTRPG Submenu */}
      <StickySubmenu 
        visible={true}
        sectionId="ttrpg"
        categories={[
          { id: 'server', label: t('ttrpg.server') },
          { id: 'login', label: t('ttrpg.login') },
          { id: 'characters', label: t('ttrpg.characters') }
        ]}
        themeColor="hsl(0, 84%, 51%)"
      />

      {/* Legal Submenu */}
      <StickySubmenu 
        visible={true}
        sectionId="legal"
        categories={[
          { id: 'terms', label: t('legal.terms') },
          { id: 'privacy', label: t('legal.privacy') },
          { id: 'contact', label: t('legal.contact') }
        ]}
        themeColor="hsl(0, 0%, 40%)"
      />

      <main className="max-w-7xl mx-auto px-4">
        {/* HOME SECTION */}
        <section id="home" className="min-h-screen py-16">
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
                <button
                  key={card.id}
                  onClick={() => {
                    const element = document.getElementById(card.id);
                    if (element) {
                      const headerOffset = 60;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className={`bg-gradient-to-br ${card.gradient} p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 hover:shadow-xl text-left`}
                >
                  <h3 className="text-white text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-white/90">{card.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PHOTOGRAPHY SECTION */}
        <section id="photography" className="min-h-screen py-16">
          <div className="border-b-4 border-photo-secondary pb-6 mb-8">
            <h1 className="text-4xl font-bold text-photo-primary">{t('photography.title')}</h1>
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
        </section>

        {/* WORKSHOP SECTION */}
        <section id="workshop" className="min-h-screen py-16">
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
        </section>

        {/* BLOG SECTION */}
        <section id="blog" className="min-h-screen py-16">
          <div className="border-b-4 border-blog-accent pb-6 mb-8">
            <h1 className="text-4xl font-bold text-blog-primary">{t('blog.title')}</h1>
          </div>

          {/* Articles Subsection */}
          <div id="blog-articles" className="bg-white/80 rounded-lg p-8 mb-12">
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

          {/* Archive Subsection */}
          <div id="blog-archive" className="bg-white/80 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('blog.archiveTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('blog.archiveDesc')}</p>
          </div>

          {/* About Subsection */}
          <div id="blog-about" className="bg-white/80 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('blog.aboutTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('blog.aboutDesc')}</p>
          </div>
        </section>

        {/* TTRPG SECTION */}
        <section id="ttrpg" className="min-h-screen py-16">
          <div className="border-b-4 border-ttrpg-secondary pb-6 mb-8">
            <h1 className="text-4xl font-bold text-ttrpg-primary">{t('ttrpg.title')}</h1>
          </div>

          {/* Server Subsection */}
          <div id="ttrpg-server" className="bg-white/80 rounded-lg p-8 mb-12">
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

          {/* Login Subsection */}
          <div id="ttrpg-login" className="bg-white/80 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('ttrpg.loginTitle')}</h2>
            <p className="text-muted-foreground mb-4">{t('ttrpg.loginDesc')}</p>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-muted-foreground">{t('ttrpg.loginForm')}</p>
            </div>
          </div>

          {/* Characters Subsection */}
          <div id="ttrpg-characters" className="bg-white/80 rounded-lg p-8 mb-12">
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
        </section>

        {/* LEGAL SECTION */}
        <section id="legal" className="min-h-screen py-16">
          <div className="border-b-4 pb-6 mb-8" style={{ borderColor: 'hsl(0, 0%, 40%)' }}>
            <h1 className="text-4xl font-bold" style={{ color: 'hsl(0, 0%, 40%)' }}>{t('legal.title')}</h1>
          </div>

          {/* Terms Subsection */}
          <div id="legal-terms" className="bg-white/80 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.termsTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('legal.termsIntro')}</p>
          </div>

          {/* Privacy Subsection */}
          <div id="legal-privacy" className="bg-white/80 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy')}</h2>
            <p className="text-muted-foreground leading-relaxed">Privacy policy content...</p>
          </div>

          {/* Contact Subsection */}
          <div id="legal-contact" className="bg-white/80 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('legal.contact')}</h2>
            <p className="text-muted-foreground leading-relaxed">Contact information...</p>
          </div>
        </section>
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
