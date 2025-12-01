import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageSectionProps {
  id: string;
  title: string;
  description?: string;
  children?: ReactNode;
  variant?: 'photo' | 'workshop' | 'blog' | 'ttrpg';
  className?: string;
}

export function PageSection({ 
  id, 
  title, 
  description, 
  children, 
  variant = 'photo',
  className 
}: PageSectionProps) {
  return (
    <section 
      id={id} 
      className={cn(
        'rounded-2xl p-8 mb-12 shadow-lg border backdrop-blur-sm animate-fade-in',
        variant === 'photo' && 'bg-photo-light/80 border-photo-secondary/20 dark:bg-photo-primary/10',
        variant === 'workshop' && 'bg-workshop-light/80 border-workshop-primary/20 dark:bg-workshop-primary/10',
        variant === 'blog' && 'bg-blog-light/80 border-blog-accent/20 dark:bg-blog-primary/10',
        variant === 'ttrpg' && 'bg-ttrpg-light/80 border-ttrpg-secondary/20 dark:bg-ttrpg-primary/10',
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
