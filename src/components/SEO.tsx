import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
}

export function SEO({ title, description, image, type = 'website', structuredData }: SEOProps) {
  const location = useLocation();
  const { language } = useLanguage();
  
  const baseUrl = window.location.origin;
  const currentUrl = `${baseUrl}${location.pathname}`;
  const defaultImage = `${baseUrl}/og-image.jpg`;
  
  const pageTitle = title ? `${title} | Charvy.cz` : 'Charvy.cz - Fotografování, 3D Tisk Workshop, Články';
  const pageDescription = description || 'Profesionální fotografování, 3D tisk workshop s ručně vytvořenými modely, články o kreativitě a D&D TTRPG server. Objevte svět Charvy.cz.';
  const pageImage = image || defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content="Charvy.cz" />
      <meta property="og:locale" content={language === 'cs' ? 'cs_CZ' : language === 'de' ? 'de_DE' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
