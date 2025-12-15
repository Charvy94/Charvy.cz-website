import { Construction } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface UnderConstructionProps {
  pageName?: string;
}

export function UnderConstruction({ pageName }: UnderConstructionProps) {
  return (
    <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Construction className="h-16 w-16 text-primary mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {pageName ? `${pageName} - ` : ''}Stránka ve výstavbě
        </h2>
        <p className="text-muted-foreground max-w-md">
          Pracujeme na tom! Tato sekce bude brzy dostupná s novým obsahem.
        </p>
      </CardContent>
    </Card>
  );
}
