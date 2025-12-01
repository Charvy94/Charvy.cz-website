import { useTranslation } from '@/hooks/useTranslation';
import { AlertCircle } from 'lucide-react';

export function DevAlert() {
  const { t } = useTranslation();

  return (
    <div className="mb-8 animate-fade-in" role="status">
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
            {t('home.devNotice')}
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
            {t('home.devNoticeDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}
