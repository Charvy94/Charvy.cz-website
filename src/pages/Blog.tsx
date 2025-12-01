import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';
import { PageNavButton } from '@/components/PageNavButton';
import { PageSection } from '@/components/PageSection';
import { BlogPostCard } from '@/components/BlogPostCard';
import { SEO } from '@/components/SEO';
import { DevAlert } from '@/components/DevAlert';
import { useCMSPosts } from '@/hooks/useCMSPosts';
import { CMS_CONFIG } from '@/config/cms';

export default function Blog() {
  const { t } = useTranslation();
  const { posts, loading, error } = useCMSPosts(CMS_CONFIG);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Charvy.cz - Články",
    "description": "Články, tipy a tutoriály o 3D tisku, fotografování a kreativitě",
    "url": "https://charvy.cz/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Charvy.cz"
    }
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
        title="Články"
        description="Články, tipy a tutoriály o 3D tisku, fotografování, kreativitě a D&D. Objevte užitečné rady a inspiraci."
        type="article"
        structuredData={structuredData}
      />
      <StickySubmenu
        visible={true}
        sectionId="blog"
        variant="blog"
        categories={[
          { id: 'articles', label: t('blog.articles') },
          { id: 'archive', label: t('blog.archive') },
          { id: 'about', label: t('blog.about') }
        ]}
      />

      <main className="relative max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-blog-primary via-blog-accent to-blog-primary/80 p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blog-light rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h1 className="text-white mb-4">{t('blog.title')}</h1>
            <p className="text-white/90 text-xl max-w-2xl">Myšlenky, nápady a příběhy ze světa kreativity</p>
          </div>
        </div>

        {/* Development Alert */}
        <DevAlert />

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-12 flex-wrap justify-center animate-slide-up">
          <PageNavButton onClick={() => scrollToSection('blog-articles')} variant="blog">
            {t('blog.articles')}
          </PageNavButton>
          <PageNavButton onClick={() => scrollToSection('blog-archive')} variant="blog">
            {t('blog.archive')}
          </PageNavButton>
          <PageNavButton onClick={() => scrollToSection('blog-about')} variant="blog">
            {t('blog.about')}
          </PageNavButton>
        </div>

        {/* Articles Subsection */}
        <PageSection
          id="blog-articles"
          title={t('blog.articlesTitle')}
          description={t('blog.articlesDesc')}
          variant="blog"
        >
          {loading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-destructive">Error: {error}</p>
            </div>
          )}

          {!CMS_CONFIG.enabled && !loading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-6">
                Click the settings icon to configure your CMS integration
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: t('blog.article1'), desc: t('blog.article1Desc') },
                  { title: t('blog.article2'), desc: t('blog.article2Desc') },
                  { title: t('blog.article3'), desc: t('blog.article3Desc') }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blog-accent/20">
                    <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {CMS_CONFIG.enabled && !loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {CMS_CONFIG.enabled && !loading && posts.length === 0 && !error && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts found</p>
            </div>
          )}
        </PageSection>

        {/* Archive Subsection */}
        <PageSection
          id="blog-archive"
          title={t('blog.archiveTitle')}
          description={t('blog.archiveDesc')}
          variant="blog"
        />

        {/* About Subsection */}
        <PageSection
          id="blog-about"
          title={t('blog.aboutTitle')}
          description={t('blog.aboutDesc')}
          variant="blog"
        />
      </main>
    </>
  );
}
