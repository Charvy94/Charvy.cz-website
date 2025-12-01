import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface PageNavButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'photo' | 'workshop' | 'blog' | 'ttrpg';
}

export function PageNavButton({ onClick, children, variant = 'photo' }: PageNavButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size="lg"
      className="font-semibold"
    >
      {children}
    </Button>
  );
}
