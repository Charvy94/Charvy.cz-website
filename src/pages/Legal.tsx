import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';

export default function Legal() {
  const { t } = useTranslation();
  const { section } = useParams<{ section: string }>();

  return (
    <>
      <SEO 
        title={`${t('legal.title')} - ${section === 'privacy' ? t('legal.privacy') : section === 'contact' ? t('legal.contact') : t('legal.terms')}`}
        description="Právní informace, podmínky použití a kontaktní údaje pro Charvy.cz"
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-b-4 border-muted pb-6 mb-8">
          <h1 className="text-foreground">{t('legal.title')}</h1>
        </div>

        <div className="bg-card rounded-2xl p-8 min-h-[50vh] shadow-lg border border-border">
          {(section === 'terms' || !section) && (
            <div>
              <h2>{t('legal.termsTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">{t('legal.termsIntro')}</p>
            </div>
          )}

          {section === 'privacy' && (
            <div>
              <h2>{t('legal.privacy')}</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Tyto zásady ochrany osobních údajů popisují, jak zpracováváme vaše osobní údaje při používání tohoto webu.
              </p>
            </div>
          )}

          {section === 'contact' && (
            <div>
              <h2>{t('legal.contact')}</h2>
              <div className="text-muted-foreground leading-relaxed mt-4 space-y-4">
                <p><strong>E-mail:</strong> kontakt@charvy.cz</p>
                <p><strong>Telefon:</strong> +420 123 456 789</p>
                <p><strong>Adresa:</strong> Praha, Česká republika</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
