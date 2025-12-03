import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SEO } from '@/components/SEO';
import { User } from 'lucide-react';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          {t('common.loading')}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEO 
        title={t('dashboard.title')}
        description={t('dashboard.description')}
      />
      
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            {t('dashboard.welcome')}, {user?.username}!
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8">
            {t('dashboard.placeholder')}
          </p>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground">
              {t('dashboard.comingSoon')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
