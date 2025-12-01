import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Wrench, PenTool, Dices } from 'lucide-react';

export default function Index() {
  const { t } = useTranslation();

  const cards = [
    { 
      id: '/photography', 
      title: t('home.photoCard'), 
      desc: t('home.photoDesc'), 
      icon: Camera,
      color: 'photo-primary'
    },
    { 
      id: '/workshop', 
      title: t('home.workshopCard'), 
      desc: t('home.workshopDesc'), 
      icon: Wrench,
      color: 'workshop-primary'
    },
    { 
      id: '/blog', 
      title: t('home.blogCard'), 
      desc: t('home.blogDesc'), 
      icon: PenTool,
      color: 'blog-primary'
    },
    { 
      id: '/ttrpg', 
      title: t('home.ttrpgCard'), 
      desc: t('home.ttrpgDesc'), 
      icon: Dices,
      color: 'ttrpg-primary'
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{t('home.title')}</h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {t('home.intro')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              to={card.id}
              className="group block"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${card.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 text-${card.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {card.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    {t('home.explore')}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
