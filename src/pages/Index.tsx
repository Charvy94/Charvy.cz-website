import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

export default function Index() {
  const { t } = useTranslation();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">{t('home.title')}</h1>
        <p className="text-muted-foreground text-xl max-w-3xl mx-auto">{t('home.intro')}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { 
            id: '/photography', 
            title: t('home.photoCard'), 
            desc: t('home.photoDesc'), 
            gradient: 'from-photo-secondary via-photo-primary to-photo-secondary',
            icon: '📸'
          },
          { 
            id: '/workshop', 
            title: t('home.workshopCard'), 
            desc: t('home.workshopDesc'), 
            gradient: 'from-workshop-secondary via-workshop-primary to-workshop-secondary',
            icon: '🔨'
          },
          { 
            id: '/blog', 
            title: t('home.blogCard'), 
            desc: t('home.blogDesc'), 
            gradient: 'from-blog-accent via-blog-primary to-blog-accent',
            icon: '✍️'
          },
          { 
            id: '/ttrpg', 
            title: t('home.ttrpgCard'), 
            desc: t('home.ttrpgDesc'), 
            gradient: 'from-ttrpg-secondary via-ttrpg-primary to-ttrpg-secondary',
            icon: '🎲'
          }
        ].map((card) => (
          <Link
            key={card.id}
            to={card.id}
            className={`relative bg-gradient-to-br ${card.gradient} p-10 rounded-2xl shadow-xl cursor-pointer transition-all hover:scale-105 hover:shadow-2xl block group overflow-hidden min-h-[280px] flex flex-col justify-between`}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">{card.icon}</div>
              <h3 className="text-white text-3xl font-bold mb-3">{card.title}</h3>
              <p className="text-white/95 text-lg leading-relaxed">{card.desc}</p>
            </div>
            <div className="relative z-10 mt-6 text-white/80 font-semibold flex items-center gap-2">
              {t('home.explore')} →
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
