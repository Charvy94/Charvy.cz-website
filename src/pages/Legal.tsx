import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'react-router-dom';

export default function Legal() {
  const { t } = useTranslation();
  const { section } = useParams<{ section: string }>();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-b-4 pb-6 mb-8" style={{ borderColor: 'hsl(0, 0%, 40%)' }}>
        <h1 className="text-4xl font-bold" style={{ color: 'hsl(0, 0%, 40%)' }}>{t('legal.title')}</h1>
      </div>

      <div className="bg-white/80 rounded-lg p-8 min-h-[50vh]">
        {(section === 'terms' || !section) && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{t('legal.termsTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('legal.termsIntro')}</p>
          </div>
        )}

        {section === 'privacy' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy')}</h2>
            <p className="text-muted-foreground leading-relaxed">Privacy policy content...</p>
          </div>
        )}

        {section === 'contact' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{t('legal.contact')}</h2>
            <p className="text-muted-foreground leading-relaxed">Contact information...</p>
          </div>
        )}
      </div>
    </main>
  );
}
