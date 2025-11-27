import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Header } from '@/components/Header';
import { HomePage } from './HomePage';
import { PhotographyPage } from './PhotographyPage';
import { WorkshopPage } from './WorkshopPage';
import { BlogPage } from './BlogPage';
import { TTRPGPage } from './TTRPGPage';
import { LegalPage } from './LegalPage';

function IndexContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { t } = useTranslation();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'photography':
        return <PhotographyPage />;
      case 'workshop':
        return <WorkshopPage />;
      case 'blog':
        return <BlogPage />;
      case 'ttrpg':
        return <TTRPGPage />;
      case 'legal':
        return <LegalPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <footer className="bg-primary text-primary-foreground py-8 text-center mt-12">
        <p>{t('footer.copy')}</p>
      </footer>
    </div>
  );
}

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
