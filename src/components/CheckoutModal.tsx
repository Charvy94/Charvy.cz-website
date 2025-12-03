import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { orderApi } from '@/services/cartApi';
import { toast } from 'sonner';
import { z } from 'zod';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

const checkoutSchema = z.object({
  email: z.string().trim().email('Neplatný email').max(255),
  phone: z.string().trim().min(9, 'Telefon je povinný').max(20),
  shippingAddress: z.string().trim().min(10, 'Zadejte úplnou adresu').max(500),
  notes: z.string().max(1000).optional(),
});

export function CheckoutModal({ open, onOpenChange, products }: CheckoutModalProps) {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    shippingAddress: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = getCartTotal(products);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!user) {
      toast.error('Pro vytvoření objednávky se musíte přihlásit');
      return;
    }

    setIsSubmitting(true);
    try {
      await orderApi.createOrder({
        userId: user.userID,
        email: result.data.email,
        phone: result.data.phone,
        shippingAddress: result.data.shippingAddress,
        notes: result.data.notes,
      });

      await clearCart();
      toast.success('Objednávka byla úspěšně vytvořena!');
      onOpenChange(false);
      setFormData({ email: '', phone: '', shippingAddress: '', notes: '' });
    } catch (error) {
      console.error('Order creation failed:', error);
      toast.error('Nepodařilo se vytvořit objednávku. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProduct = (productId: string) => products.find(p => p.id === productId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dokončit objednávku</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold">Souhrn objednávky</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>{product.name} × {item.quantity}</span>
                    <span>{product.price * item.quantity} Kč</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Celkem:</span>
              <span className="text-workshop-primary">{total} Kč</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vas@email.cz"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+420 123 456 789"
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="shippingAddress">Doručovací adresa *</Label>
              <Textarea
                id="shippingAddress"
                value={formData.shippingAddress}
                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                placeholder="Ulice, číslo popisné, město, PSČ"
                rows={3}
                className={errors.shippingAddress ? 'border-destructive' : ''}
              />
              {errors.shippingAddress && <p className="text-destructive text-sm mt-1">{errors.shippingAddress}</p>}
            </div>

            <div>
              <Label htmlFor="notes">Poznámky k objednávce</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Volitelné poznámky..."
                rows={2}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-workshop-primary hover:bg-workshop-secondary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Odesílání...' : 'Odeslat objednávku'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
