import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-workshop-primary">{product.price} Kč</span>
          <button className="px-4 py-2 bg-workshop-primary text-white rounded-md hover:bg-workshop-secondary transition-colors text-sm">
            Zobrazit
          </button>
        </div>
      </div>
    </div>
  );
}
