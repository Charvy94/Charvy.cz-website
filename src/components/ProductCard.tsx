import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-border animate-scale-in group"
    >
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-workshop-primary transition-colors">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{product.shortDescription}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-workshop-primary">{product.price} Kč</span>
          <button className="px-5 py-2 bg-workshop-primary text-white rounded-lg hover:bg-workshop-secondary transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg">
            Zobrazit
          </button>
        </div>
      </div>
    </div>
  );
}
