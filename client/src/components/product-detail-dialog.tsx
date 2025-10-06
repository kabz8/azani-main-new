import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import { useCurrency } from "@/hooks/use-currency";
import { convertKESToUSD, formatPrice } from "@/lib/currency";
import { getProductImage } from "@/lib/product-images";
import type { Product } from "@shared/schema";

interface ProductDetailDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  const { currency } = useCurrency();
  const price = currency === 'USD' ? convertKESToUSD(product.priceKES) : product.priceKES;
  const formattedPrice = formatPrice(price, currency);

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ordering: ${product.name}\nPrice: ${formattedPrice}`
    );
    window.open(`https://wa.me/254755537861?text=${message}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden rounded-xl">
              <img
                src={getProductImage(product.images[0])}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={getProductImage(image)}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {formattedPrice}
              </div>
              {product.type === 'custom' && (
                <div className="text-sm text-muted-foreground">Starting from</div>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.availableSizes && product.availableSizes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <span
                      key={size}
                      className="px-4 py-2 bg-muted text-foreground text-sm rounded-lg font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.type === 'ready' && (
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  (product.inStock || 0) > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-muted-foreground">
                  {(product.inStock || 0) > 0 ? `${product.inStock} in stock` : 'Out of stock'}
                </span>
              </div>
            )}

            <div className="pt-4 space-y-3">
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 text-lg font-semibold"
                data-testid={`button-whatsapp-order-${product.id}`}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Click to message us on WhatsApp at +254 755 537 861
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
