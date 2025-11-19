import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Products() {
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { spotlightProducts, categories } = useMemo(() => {
    if (!products) {
      return { spotlightProducts: [], categories: [] as string[] };
    }

    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category)),
    ).slice(0, 6);

    return {
      spotlightProducts: products.slice(0, 6),
      categories: uniqueCategories,
    };
  }, [products]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-medium text-muted-foreground">
            Loading curated looks...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold text-foreground">
            We couldn't load products right now.
          </p>
          <p className="text-muted-foreground">
            Please refresh or try again in a few moments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-[0.2em]">
              Curated Drop
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground">
            A Few Pieces We Love
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a rotating selection of outfits from our atelier. Each
            piece is handcrafted in Nairobi and ready to tailor to your story.
          </p>
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="px-3 py-1 text-xs sm:text-sm text-muted-foreground"
                >
                  {category.replace(/-/g, " ")}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {spotlightProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-2xl font-semibold text-foreground">
                No looks to highlight (yet).
              </p>
              <p className="text-muted-foreground">
                Check back soon for fresh drops from the studio.
              </p>
              <Link href="/ready-shop">
                <Button size="lg" className="mt-4">
                  Browse Full Collection
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {spotlightProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center">
                <Link href="/ready-shop">
                  <Button variant="outline" size="lg" className="px-8">
                    Explore Complete Catalog
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

