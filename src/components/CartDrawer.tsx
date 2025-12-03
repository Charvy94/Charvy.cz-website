import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { CheckoutModal } from './CheckoutModal';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

export function CartDrawer({ open, onOpenChange, products }: CartDrawerProps) {
  const { items, isLoading, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const getProduct = (productId: string) => products.find(p => p.id === productId);
  const total = getCartTotal(products);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Košík
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingBag className="h-16 w-16 mb-4 opacity-50" />
                <p>Váš košík je prázdný</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{product.name}</h4>
                        <p className="text-workshop-primary font-semibold mt-1">
                          {product.price} Kč
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={isLoading}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive ml-auto"
                            onClick={() => removeFromCart(item.productId)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Celkem:</span>
                <span className="text-workshop-primary">{total} Kč</span>
              </div>
              <Button
                className="w-full bg-workshop-primary hover:bg-workshop-secondary"
                size="lg"
                onClick={() => {
                  onOpenChange(false);
                  setCheckoutOpen(true);
                }}
                disabled={isLoading}
              >
                Pokračovat k objednávce
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        products={products}
      />
    </>
  );
}
