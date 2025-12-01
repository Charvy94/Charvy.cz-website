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
      bgColor: 'bg-photo-light',
      iconColor: 'text-photo-primary'
    },
    { 
      id: '/workshop', 
      title: t('home.workshopCard'), 
      desc: t('home.workshopDesc'), 
      icon: Wrench,
      bgColor: 'bg-workshop-light',
      iconColor: 'text-workshop-primary'
    },
    { 
      id: '/blog', 
      title: t('home.blogCard'), 
      desc: t('home.blogDesc'), 
      icon: PenTool,
      bgColor: 'bg-blog-light',
      iconColor: 'text-blog-primary'
    },
    { 
      id: '/ttrpg', 
      title: t('home.ttrpgCard'), 
      desc: t('home.ttrpgDesc'), 
      icon: Dices,
      bgColor: 'bg-ttrpg-light',
      iconColor: 'text-ttrpg-primary'
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          {t('home.title')}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {t('home.intro')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              to={card.id}
              className="group block animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-muted/30">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl ${card.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 leading-relaxed">
                    {card.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-4 transition-all">
                    {t('home.explore')}
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
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
