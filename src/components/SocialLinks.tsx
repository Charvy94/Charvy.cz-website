import { getSocialLinks, AccountType } from '@/config/social';
import { useTranslation } from '@/hooks/useTranslation';

interface SocialLinksProps {
  type: AccountType;
  variant?: 'default' | 'compact';
  className?: string;
}

export function SocialLinks({ type, variant = 'default', className = '' }: SocialLinksProps) {
  const { t } = useTranslation();
  const links = getSocialLinks(type);

  if (links.length === 0) return null;

  const isCompact = variant === 'compact';

  return (
    <div className={`flex ${isCompact ? 'gap-3' : 'gap-4 flex-wrap'} ${className}`}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group flex items-center gap-2 
              ${isCompact ? 'p-2' : 'px-4 py-3'} 
              bg-card hover:bg-accent 
              border border-border hover:border-primary 
              rounded-lg 
              transition-all duration-300 
              hover:scale-105 hover:shadow-md
            `}
            aria-label={link.label}
          >
            <Icon 
              className={`
                ${isCompact ? 'w-5 h-5' : 'w-6 h-6'} 
                text-muted-foreground group-hover:text-primary 
                transition-colors
              `} 
            />
            {!isCompact && (
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {link.label}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
