import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@shared/schema";

export default function Shop() {
  const [, params] = useRoute("/shop/:gender/:category");
  const [, ankaraBagsRoute] = useRoute("/shop/ankara-bags");
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const getCategoryTitle = () => {
    if (ankaraBagsRoute) {
      return "Ankara Bags";
    }
    if (!params) return "Shop All";
    
    const { gender, category } = params;
    const genderMap: Record<string, string> = {
      'womens': "Women's",
      'mens': "Men's",
      'kids': "Kids"
    };
    
    const categoryMap: Record<string, string> = {
      'tops': 'Tops',
      'blazers': 'Blazers',
      'skirts': 'Skirts',
      'short-dresses': 'Short Dresses',
      'maxi-dresses': 'Maxi Dresses',
      'shirts': 'Shirts',
      'bomber-jackets': 'Bomber Jackets',
      'boys': 'Boys',
      'girls': 'Girls'
    };
    
    return `${genderMap[gender] || gender} ${categoryMap[category] || category}`;
  };

  const filteredProducts = products?.filter(product => {
    if (ankaraBagsRoute) {
      return product.category === 'ankara-bags';
    }
    if (!params) return true;
    
    const { gender, category } = params;
    return product.category === `${gender}-${category}`;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (ankaraBagsRoute) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-20 bg-gradient-to-b from-muted to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-6" data-testid="text-shop-title">
              Ankara Bags
            </h1>
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-full text-primary font-semibold mb-6">
              Coming Soon
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-shop-description">
              We're working on bringing you beautiful Ankara bags that combine traditional African prints with modern design. Stay tuned!
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 bg-gradient-to-b from-muted to-background" data-testid="section-shop-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6" data-testid="text-shop-title">
            {getCategoryTitle()}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-shop-description">
            Carefully curated pieces available for immediate purchase and shipping. Each item represents our commitment to exceptional quality and authentic African style.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-foreground mb-4">No products found</h3>
              <p className="text-muted-foreground">Check back soon for new arrivals in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
