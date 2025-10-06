import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useCurrency } from "@/hooks/use-currency";
import { convertKESToUSD, formatPrice } from "@/lib/currency";
import { getProductImage } from "@/lib/product-images";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { currency } = useCurrency();

  const price = currency === 'USD' ? convertKESToUSD(product.priceKES) : product.priceKES;
  const formattedPrice = formatPrice(price, currency);

  return (
    <div className="group relative" data-testid={`card-product-${product.id}`}>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/30 to-muted/60 backdrop-blur-sm">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={getProductImage(product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            data-testid={`img-product-${product.id}`}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            data-testid={`button-favorite-${product.id}`}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>
          
          {/* Featured Badge */}
          {product.featured === 'true' && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              <Star className="w-3 h-3 inline mr-1 fill-current" />
              Featured
            </div>
          )}
          
          {/* Quick View Button - Appears on Hover */}
          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
            <button className="w-full bg-white text-foreground py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm">
              Quick View
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-6 space-y-4 bg-white/80 backdrop-blur-sm">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-foreground group-hover:text-primary transition-colors" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed" data-testid={`text-product-description-${product.id}`}>
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground" data-testid={`text-product-price-${product.id}`}>
                {formattedPrice}
              </div>
              {product.type === 'custom' && (
                <div className="text-xs text-muted-foreground">Starting from</div>
              )}
            </div>
            
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.availableSizes?.slice(0, 3).map((size) => (
                  <span
                    key={size}
                    className="px-2 py-1 bg-muted/60 text-muted-foreground text-xs rounded-lg font-medium"
                    data-testid={`text-product-size-${product.id}-${size}`}
                  >
                    {size}
                  </span>
                ))}
                {product.availableSizes && product.availableSizes.length > 3 && (
                  <span className="px-2 py-1 bg-muted/60 text-muted-foreground text-xs rounded-lg font-medium">
                    +{product.availableSizes.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Stock Status */}
          {product.type === 'ready' && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  (product.inStock || 0) > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-muted-foreground">
                  {(product.inStock || 0) > 0 ? `${product.inStock} in stock` : 'Out of stock'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground capitalize">
                {product.category.replace('-', ' ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}