import { Product } from '@/types/product';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.images[currentImageIndex]} 
              alt={`${product.name} - obrázek ${currentImageIndex + 1} z ${product.images.length}`}
              loading="lazy"
              className="w-full h-full object-contain"
            />
            
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Předchozí obrázek"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Další obrázek"
                >
                  <ChevronRight size={24} />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Indikátory obrázků">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      role="tab"
                      aria-label={`Zobrazit obrázek ${index + 1}`}
                      aria-selected={index === currentImageIndex}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto" role="list" aria-label="Náhledy obrázků">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  role="listitem"
                  aria-label={`Zobrazit obrázek ${index + 1}`}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? 'border-workshop-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`Náhled ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cena</p>
              <p className="text-3xl font-bold text-workshop-primary">{product.price} Kč</p>
            </div>
            <button className="px-6 py-3 bg-workshop-primary text-white rounded-md hover:bg-workshop-secondary transition-colors font-semibold">
              Objednat
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Popis produktu</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.fullDescription}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
