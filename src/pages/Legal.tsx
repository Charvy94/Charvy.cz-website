import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';

export default function Legal() {
  const { t } = useTranslation();
  const { section } = useParams<{ section: string }>();

  const currentSection = section || 'terms';

  return (
    <>
      <SEO 
        title={`${t('legal.title')} - ${currentSection === 'privacy' ? t('legal.privacy') : currentSection === 'contact' ? t('legal.contact') : t('legal.terms')}`}
        description={t('legal.termsIntro')}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-b-4 border-muted pb-6 mb-8">
          <h1 className="text-4xl font-bold text-foreground">{t('legal.title')}</h1>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border space-y-8">
          {currentSection === 'terms' && (
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('legal.termsTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{t('legal.termsIntro')}</p>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsProvider')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsProviderContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsServices')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsServicesContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsOrders')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsOrdersContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsPayment')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsPaymentContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsDelivery')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsDeliveryContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsCopyright')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsCopyrightContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsLiability')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsLiabilityContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsDisputes')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsDisputesContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.termsChanges')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.termsChangesContent')}</p>
              </section>
            </article>
          )}

          {currentSection === 'privacy' && (
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('legal.privacyTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{t('legal.privacyIntro')}</p>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyController')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyControllerContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyPurpose')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyPurposeContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyLegalBasis')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyLegalBasisContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyData')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyDataContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyRetention')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyRetentionContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyRights')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyRightsContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyCookies')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyCookiesContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyThirdParties')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyThirdPartiesContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacySecurity')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacySecurityContent')}</p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('legal.privacyContact')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('legal.privacyContactContent')}</p>
              </section>
            </article>
          )}

          {currentSection === 'contact' && (
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('legal.contactTitle')}</h2>
              <div className="space-y-4 mt-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t('legal.contactEmail')}</p>
                  <a href="mailto:kontakt@charvy.cz" className="text-primary hover:underline">
                    {t('legal.contactEmailValue')}
                  </a>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t('legal.contactPhone')}</p>
                  <a href="tel:+420123456789" className="text-primary hover:underline">
                    {t('legal.contactPhoneValue')}
                  </a>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t('legal.contactAddress')}</p>
                  <p className="text-muted-foreground">{t('legal.contactAddressValue')}</p>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
    </>
  );
}
