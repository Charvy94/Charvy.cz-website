import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

export default function Index() {
  const { t } = useTranslation();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-b-4 border-secondary pb-6 mb-8">
        <h1 className="text-4xl font-bold">{t('home.title')}</h1>
      </div>
      
      <div className="bg-white/80 rounded-lg p-8">
        <p className="text-muted-foreground text-lg mb-8">{t('home.intro')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: '/photography', title: t('home.photoCard'), desc: t('home.photoDesc'), gradient: 'from-photo-secondary to-photo-primary' },
            { id: '/workshop', title: t('home.workshopCard'), desc: t('home.workshopDesc'), gradient: 'from-workshop-secondary to-workshop-primary' },
            { id: '/blog', title: t('home.blogCard'), desc: t('home.blogDesc'), gradient: 'from-blog-accent to-blog-primary' },
            { id: '/ttrpg', title: t('home.ttrpgCard'), desc: t('home.ttrpgDesc'), gradient: 'from-ttrpg-secondary to-ttrpg-primary' }
          ].map((card) => (
            <Link
              key={card.id}
              to={card.id}
              className={`bg-gradient-to-br ${card.gradient} p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 hover:shadow-xl block`}
            >
              <h3 className="text-white text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-white/90">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
