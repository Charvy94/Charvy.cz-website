import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';

export default function Blog() {
  const { t } = useTranslation();

  return (
    <>
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-b-4 border-blog-accent pb-6 mb-8">
          <h1 className="text-4xl font-bold text-blog-primary">{t('blog.title')}</h1>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button
            onClick={() => {
              const element = document.getElementById('blog-articles');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-blog-accent rounded-md font-semibold transition-all hover:bg-blog-accent hover:text-white"
            style={{ color: 'hsl(180, 47%, 50%)' }}
          >
            {t('blog.articles')}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('blog-archive');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-blog-accent rounded-md font-semibold transition-all hover:bg-blog-accent hover:text-white"
            style={{ color: 'hsl(180, 47%, 50%)' }}
          >
            {t('blog.archive')}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('blog-about');
              if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-blog-accent rounded-md font-semibold transition-all hover:bg-blog-accent hover:text-white"
            style={{ color: 'hsl(180, 47%, 50%)' }}
          >
            {t('blog.about')}
          </button>
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
      </main>
    </>
  );
}
