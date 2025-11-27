import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { StickySubmenu } from '@/components/StickySubmenu';

export function BlogPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('articles');

  const categories = [
    { id: 'articles', label: t('blog.articles') },
    { id: 'archive', label: t('blog.archive') },
    { id: 'about', label: t('blog.about') }
  ];

  const themeColor = 'hsl(180, 47%, 50%)';

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
        <div className="border-b-4 border-blog-accent pb-6 mb-8">
          <h1 className="text-4xl font-bold text-blog-primary">{t('blog.title')}</h1>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 border-2 border-blog-accent rounded-md font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-blog-accent text-white'
                  : 'text-blog-primary hover:shadow-md'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-white/80 rounded-lg p-8 min-h-[300px]">
          {activeTab === 'articles' && (
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

          {activeTab === 'archive' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('blog.archiveTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('blog.archiveDesc')}</p>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('blog.aboutTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('blog.aboutDesc')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
